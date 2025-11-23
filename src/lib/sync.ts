import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { useAppStore } from "./store";
import { User, Post, Transaction, MarketplaceAsset } from "@/types";

/**
 * Sincronização em tempo real com Firestore
 * Mantém dados sincronizados entre web e app Flutter
 * Funciona offline com IndexedDB persistence
 */

// ============ USER SYNC ============
export async function syncUserData(userId: string): Promise<User | null> {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data() as User;
      useAppStore.setState({ user: userData });
      return userData;
    }
  } catch (error) {
    console.error("Error syncing user data:", error);
  }
  return null;
}

export function subscribeToUser(userId: string) {
  const userRef = doc(db, "users", userId);
  
  return onSnapshot(userRef, (doc) => {
    if (doc.exists()) {
      const userData = doc.data() as User;
      useAppStore.setState({ user: userData });
    }
  });
}

export async function updateUserData(userId: string, data: Partial<User>) {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
}

// ============ POSTS SYNC ============
export function subscribeToUserPosts(userId: string) {
  const postsRef = collection(db, "posts");
  const q = query(postsRef, where("userId", "==", userId));

  return onSnapshot(q, (snapshot) => {
    const posts: Post[] = [];
    snapshot.forEach((doc) => {
      posts.push(doc.data() as Post);
    });
    useAppStore.setState({ posts });
  });
}

export async function createPost(userId: string, post: Omit<Post, "id" | "createdAt" | "updatedAt">) {
  try {
    const postsRef = collection(db, "posts");
    const newPostRef = doc(postsRef);

    const newPost: Post = {
      ...post,
      userId,
      id: newPostRef.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(newPostRef, {
      ...newPost,
      createdAt: Timestamp.fromDate(newPost.createdAt),
      updatedAt: Timestamp.fromDate(newPost.updatedAt),
    });

    useAppStore.getState().addPost(newPost);
    return newPost;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

export async function likePost(postId: string) {
  try {
    const postRef = doc(db, "posts", postId);
    const postSnap = await getDoc(postRef);

    if (postSnap.exists()) {
      const currentLikes = postSnap.data().likes || 0;
      await updateDoc(postRef, {
        likes: currentLikes + 1,
        updatedAt: Timestamp.now(),
      });
    }
  } catch (error) {
    console.error("Error liking post:", error);
    throw error;
  }
}

// ============ TRANSACTIONS SYNC ============
export function subscribeToUserTransactions(userId: string) {
  const transactionsRef = collection(db, "transactions");
  const q = query(transactionsRef, where("userId", "==", userId));

  return onSnapshot(q, (snapshot) => {
    const transactions: Transaction[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      transactions.push({
        ...data,
        timestamp: data.timestamp?.toDate?.() || new Date(),
      } as Transaction);
    });
    useAppStore.setState({ transactions: transactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()) });
  });
}

export async function recordTransaction(
  userId: string,
  transaction: Omit<Transaction, "id" | "timestamp">
) {
  try {
    const transactionsRef = collection(db, "transactions");
    const newTransactionRef = doc(transactionsRef);

    const newTransaction: Transaction = {
      ...transaction,
      id: newTransactionRef.id,
      timestamp: new Date(),
    };

    await setDoc(newTransactionRef, {
      ...newTransaction,
      timestamp: Timestamp.fromDate(newTransaction.timestamp),
    });

    useAppStore.getState().addTransaction(newTransaction);

    // Update user's ManusCoins
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const currentCoins = userSnap.data().manusCoins || 0;
      await updateDoc(userRef, {
        manusCoins: currentCoins + transaction.amount,
        updatedAt: Timestamp.now(),
      });
    }

    return newTransaction;
  } catch (error) {
    console.error("Error recording transaction:", error);
    throw error;
  }
}

// ============ MARKETPLACE SYNC ============
export function subscribeToMarketplaceAssets() {
  const assetsRef = collection(db, "marketplace");

  return onSnapshot(assetsRef, (snapshot) => {
    const assets: MarketplaceAsset[] = [];
    snapshot.forEach((doc) => {
      assets.push(doc.data() as MarketplaceAsset);
    });
    useAppStore.setState({ marketplaceAssets: assets });
  });
}

export async function createMarketplaceAsset(
  sellerId: string,
  asset: Omit<MarketplaceAsset, "id" | "sellerId" | "createdAt" | "updatedAt">
) {
  try {
    const assetsRef = collection(db, "marketplace");
    const newAssetRef = doc(assetsRef);

    const newAsset: MarketplaceAsset = {
      ...asset,
      id: newAssetRef.id,
      sellerId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(newAssetRef, {
      ...newAsset,
      createdAt: Timestamp.fromDate(newAsset.createdAt),
      updatedAt: Timestamp.fromDate(newAsset.updatedAt),
    });

    return newAsset;
  } catch (error) {
    console.error("Error creating marketplace asset:", error);
    throw error;
  }
}

// ============ OFFLINE SYNC ============
export function setupOfflineSync() {
  // Listen for online/offline changes
  window.addEventListener("online", () => {
    useAppStore.setState({
      syncData: {
        ...useAppStore.getState().syncData,
        isOnline: true,
      },
    });
    console.log("App is online - syncing data");
  });

  window.addEventListener("offline", () => {
    useAppStore.setState({
      syncData: {
        ...useAppStore.getState().syncData,
        isOnline: false,
      },
    });
    console.log("App is offline - using cached data");
  });
}

// ============ BACKUP & RESTORE ============
export async function backupUserData(userId: string) {
  try {
    const store = useAppStore.getState();
    const backup = {
      user: store.user,
      posts: store.posts,
      transactions: store.transactions,
      marketplaceAssets: store.marketplaceAssets,
      timestamp: new Date().toISOString(),
    };

    // Save to localStorage as backup
    localStorage.setItem(`manus-lux-backup-${userId}`, JSON.stringify(backup));

    // Also save to Firestore for cloud backup
    const backupRef = doc(db, "backups", userId);
    await setDoc(
      backupRef,
      {
        ...backup,
        timestamp: Timestamp.now(),
      },
      { merge: true }
    );

    return backup;
  } catch (error) {
    console.error("Error backing up user data:", error);
    throw error;
  }
}

export async function restoreUserData(userId: string) {
  try {
    // Try to restore from Firestore first
    const backupRef = doc(db, "backups", userId);
    const backupSnap = await getDoc(backupRef);

    if (backupSnap.exists()) {
      const backup = backupSnap.data();
      useAppStore.setState({
        user: backup.user,
        posts: backup.posts,
        transactions: backup.transactions,
        marketplaceAssets: backup.marketplaceAssets,
      });
      return backup;
    }

    // Fallback to localStorage
    const localBackup = localStorage.getItem(`manus-lux-backup-${userId}`);
    if (localBackup) {
      const backup = JSON.parse(localBackup);
      useAppStore.setState({
        user: backup.user,
        posts: backup.posts,
        transactions: backup.transactions,
        marketplaceAssets: backup.marketplaceAssets,
      });
      return backup;
    }
  } catch (error) {
    console.error("Error restoring user data:", error);
    throw error;
  }
  return null;
}
