import { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db, logEvent } from "./firebase";
import { useAppStore } from "./store";
import { User } from "@/types";
import {
  syncUserData,
  subscribeToUser,
  subscribeToUserPosts,
  subscribeToUserTransactions,
  subscribeToMarketplaceAssets,
  setupOfflineSync,
  restoreUserData,
} from "./sync";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, setUser, setIsAuthenticated } = useAppStore();

  // Initialize auth state and setup listeners
  useEffect(() => {
    // Setup offline sync
    setupOfflineSync();

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // User is signed in
          const userData = await syncUserData(firebaseUser.uid);

          if (userData) {
            setUser(userData);
            setIsAuthenticated(true);

            // Subscribe to real-time updates
            const unsubscribeUser = subscribeToUser(firebaseUser.uid);
            const unsubscribePosts = subscribeToUserPosts(firebaseUser.uid);
            const unsubscribeTransactions = subscribeToUserTransactions(firebaseUser.uid);
            const unsubscribeMarketplace = subscribeToMarketplaceAssets();

            // Cleanup subscriptions on unmount
            return () => {
              unsubscribeUser();
              unsubscribePosts();
              unsubscribeTransactions();
              unsubscribeMarketplace();
            };
          }
        } else {
          // User is signed out
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Auth state change error:", err);
        setError(err instanceof Error ? err.message : "Authentication error");
      } finally {
        setIsLoading(false);
      }
      return undefined;
    });

    return unsubscribe;
  }, [setUser, setIsAuthenticated]);

  // Sign up with email and password
  const signUp = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Create Firebase auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Create user document in Firestore
      const newUser: User = {
        id: firebaseUser.uid,
        email,
        name,
        manusCoins: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const userRef = doc(db, "users", firebaseUser.uid);
      await setDoc(userRef, {
        ...newUser,
        createdAt: Timestamp.fromDate(newUser.createdAt),
        updatedAt: Timestamp.fromDate(newUser.updatedAt),
      });

      setUser(newUser);
      setIsAuthenticated(true);
      logEvent("sign_up_success", { method: "email_password" });

      return newUser;
    } catch (err) {
      const errorCode = (err as any).code;
      const errorMessage = getAuthErrorMessage(errorCode);
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Sync user data and restore from backup if needed
      const userData = await syncUserData(firebaseUser.uid);

      if (!userData) {
        // Try to restore from backup
        await restoreUserData(firebaseUser.uid);
      }

      setIsAuthenticated(true);
      logEvent("login_success", { method: "email_password" });

      return userData;
    } catch (err) {
      const errorCode = (err as any).code;
      const errorMessage = getAuthErrorMessage(errorCode);
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out
  const logout = async () => {
    try {
      setIsLoading(true);
      setError(null);

      await signOut(auth);
      useAppStore.getState().clearAll();
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Sign out failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    error,
    setError,
    isAuthenticated: useAppStore((state) => state.isAuthenticated),
    signUp,
    signIn,
    logout,
  };
}

// Helper function to map Firebase error codes to user-friendly messages
function getAuthErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "Este e-mail já está em uso. Tente fazer login ou use outro e-mail.";
    case "auth/invalid-email":
      return "O formato do e-mail é inválido.";
    case "auth/weak-password":
      return "A senha deve ter pelo menos 6 caracteres.";
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "E-mail ou senha incorretos.";
    case "auth/operation-not-allowed":
      return "O login por e-mail/senha não está ativado no Firebase.";
    default:
      return "Ocorreu um erro na autenticação. Tente novamente.";
  }
}

