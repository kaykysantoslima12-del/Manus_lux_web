import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, Post, Transaction, MarketplaceAsset, SyncData } from "@/types";

interface AppStore {
  // User state
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Auth state
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  
  // Posts state
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  updatePost: (id: string, post: Partial<Post>) => void;
  
  // Transactions state
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Transaction) => void;
  
  // Marketplace state
  marketplaceAssets: MarketplaceAsset[];
  setMarketplaceAssets: (assets: MarketplaceAsset[]) => void;
  
  // Sync state
  syncData: SyncData;
  setSyncData: (data: Partial<SyncData>) => void;
  
  // UI state
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  
  // Clear all data
  clearAll: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      // User state
      user: null,
      setUser: (user) => set({ user }),
      
      // Auth state
      isAuthenticated: false,
      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
      
      // Posts state
      posts: [],
      setPosts: (posts) => set({ posts }),
      addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
      updatePost: (id, post) =>
        set((state) => ({
          posts: state.posts.map((p) => (p.id === id ? { ...p, ...post } : p)),
        })),
      
      // Transactions state
      transactions: [],
      setTransactions: (transactions) => set({ transactions }),
      addTransaction: (transaction) =>
        set((state) => ({ transactions: [transaction, ...state.transactions] })),
      
      // Marketplace state
      marketplaceAssets: [],
      setMarketplaceAssets: (assets) => set({ marketplaceAssets: assets }),
      
      // Sync state
      syncData: {
        lastSyncTime: 0,
        pendingChanges: [],
        isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
      },
      setSyncData: (data) =>
        set((state) => ({
          syncData: { ...state.syncData, ...data },
        })),
      
      // UI state
      isLoading: false,
      setIsLoading: (value) => set({ isLoading: value }),
      error: null,
      setError: (error) => set({ error }),
      
      // Clear all data
      clearAll: () =>
        set({
          user: null,
          isAuthenticated: false,
          posts: [],
          transactions: [],
          marketplaceAssets: [],
          error: null,
        }),
    }),
    {
      name: "manus-lux-store",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        posts: state.posts,
        transactions: state.transactions,
        marketplaceAssets: state.marketplaceAssets,
        syncData: state.syncData,
      }),
    }
  )
);

