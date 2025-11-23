// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  manusCoins: number;
  createdAt: Date;
  updatedAt: Date;
}

// Post Types
export interface Post {
  id: string;
  userId: string;
  title: string;
  description: string;
  imageUrl?: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

// Transaction Types
export enum TransactionType {
  POST_CREATED = "post_created",
  POST_LIKED = "post_liked",
  MISSION_COMPLETED = "mission_completed",
  ASSET_SOLD = "asset_sold",
  REFERRAL = "referral",
  DAILY_BONUS = "daily_bonus",
  PURCHASE = "purchase",
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: TransactionType;
  description: string;
  timestamp: Date;
}

// Marketplace Asset Types
export interface MarketplaceAsset {
  id: string;
  sellerId: string;
  title: string;
  description?: string;
  price: number;
  imageUrl?: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

// Auth Types
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Sync Types
export interface SyncData {
  lastSyncTime: number;
  pendingChanges: any[];
  isOnline: boolean;
}

