import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  Creator, 
  CreatorStats, 
  CreatorUpload, 
  CreatorNotification,
  UploadProgress,
  SubscriptionTier,
  Payout
} from '@/types/creator';
import { 
  currentCreator, 
  creatorStats, 
  creatorUploads, 
  creatorNotifications,
  subscriptionTiers,
  payouts
} from '@/data/creatorMockData';

// Creator Auth Store
interface CreatorAuthStore {
  creator: Creator | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  updateProfile: (updates: Partial<Creator>) => void;
}

interface RegisterData {
  name: string;
  artistName: string;
  email: string;
  password: string;
  creatorType: 'artist' | 'podcaster' | 'label';
}

export const useCreatorAuthStore = create<CreatorAuthStore>()(
  persist(
    (set) => ({
      creator: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (email && password.length >= 6) {
          set({ 
            creator: currentCreator, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } else {
          set({ 
            error: 'Invalid credentials', 
            isLoading: false 
          });
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const newCreator: Creator = {
          ...currentCreator,
          id: `creator-${Date.now()}`,
          name: data.name,
          artistName: data.artistName,
          email: data.email,
          creatorType: data.creatorType,
          isVerified: false,
          createdAt: new Date().toISOString(),
        };
        
        set({ 
          creator: newCreator, 
          isAuthenticated: true, 
          isLoading: false 
        });
      },

      logout: () => {
        set({ 
          creator: null, 
          isAuthenticated: false, 
          error: null 
        });
      },

      clearError: () => set({ error: null }),

      updateProfile: (updates) => {
        set((state) => ({
          creator: state.creator ? { ...state.creator, ...updates } : null
        }));
      },
    }),
    {
      name: 'creator-auth-storage',
      partialize: (state) => ({ 
        creator: state.creator, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

// Creator Dashboard Store
interface CreatorDashboardStore {
  stats: CreatorStats;
  uploads: CreatorUpload[];
  notifications: CreatorNotification[];
  unreadNotifications: number;
  subscriptionTiers: SubscriptionTier[];
  payouts: Payout[];
  uploadProgress: UploadProgress[];
  isLoading: boolean;
  activeTab: 'overview' | 'uploads' | 'analytics' | 'subscribers' | 'earnings' | 'merchandise' | 'events' | 'canvas' | 'live' | 'notes' | 'collaborations' | 'settings';
  setActiveTab: (tab: CreatorDashboardStore['activeTab']) => void;
  addUpload: (upload: CreatorUpload) => void;
  updateUpload: (id: string, updates: Partial<CreatorUpload>) => void;
  deleteUpload: (id: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addUploadProgress: (progress: UploadProgress) => void;
  updateUploadProgress: (fileName: string, updates: Partial<UploadProgress>) => void;
  removeUploadProgress: (fileName: string) => void;
  requestPayout: (amount: number, method: string) => Promise<void>;
  addSubscriptionTier: (tier: SubscriptionTier) => void;
  updateSubscriptionTier: (id: string, updates: Partial<SubscriptionTier>) => void;
}

export const useCreatorDashboardStore = create<CreatorDashboardStore>()((set) => ({
  stats: creatorStats,
  uploads: creatorUploads,
  notifications: creatorNotifications,
  unreadNotifications: creatorNotifications.filter(n => !n.read).length,
  subscriptionTiers: subscriptionTiers,
  payouts: payouts,
  uploadProgress: [],
  isLoading: false,
  activeTab: 'overview',

  setActiveTab: (tab) => set({ activeTab: tab }),

  addUpload: (upload) => {
    set((state) => ({
      uploads: [upload, ...state.uploads],
      stats: {
        ...state.stats,
        totalSongs: upload.type === 'song' 
          ? state.stats.totalSongs + 1 
          : state.stats.totalSongs,
        totalPodcasts: upload.type === 'podcast'
          ? state.stats.totalPodcasts + 1
          : state.stats.totalPodcasts,
      }
    }));
  },

  updateUpload: (id, updates) => {
    set((state) => ({
      uploads: state.uploads.map(u => 
        u.id === id ? { ...u, ...updates } : u
      )
    }));
  },

  deleteUpload: (id) => {
    set((state) => ({
      uploads: state.uploads.filter(u => u.id !== id)
    }));
  },

  markNotificationRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map(n =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadNotifications: Math.max(0, state.unreadNotifications - 1)
    }));
  },

  markAllNotificationsRead: () => {
    set((state) => ({
      notifications: state.notifications.map(n => ({ ...n, read: true })),
      unreadNotifications: 0
    }));
  },

  addUploadProgress: (progress) => {
    set((state) => ({
      uploadProgress: [...state.uploadProgress, progress]
    }));
  },

  updateUploadProgress: (fileName, updates) => {
    set((state) => ({
      uploadProgress: state.uploadProgress.map(p =>
        p.fileName === fileName ? { ...p, ...updates } : p
      )
    }));
  },

  removeUploadProgress: (fileName) => {
    set((state) => ({
      uploadProgress: state.uploadProgress.filter(p => p.fileName !== fileName)
    }));
  },

  requestPayout: async (amount, method) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newPayout: Payout = {
      id: `payout-${Date.now()}`,
      amount,
      currency: 'USD',
      status: 'pending',
      requestedAt: new Date().toISOString(),
      method: method as 'bank' | 'mpesa' | 'paypal',
    };
    
    set((state) => ({
      payouts: [newPayout, ...state.payouts],
      isLoading: false
    }));
  },

  addSubscriptionTier: (tier) => {
    set((state) => ({
      subscriptionTiers: [...state.subscriptionTiers, tier]
    }));
  },

  updateSubscriptionTier: (id, updates) => {
    set((state) => ({
      subscriptionTiers: state.subscriptionTiers.map(t =>
        t.id === id ? { ...t, ...updates } : t
      )
    }));
  },
}));
