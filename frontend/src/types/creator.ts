// Creator Types for NiaTunes Creator Portal

export type CreatorType = 'artist' | 'podcaster' | 'label';

export interface Creator {
  id: string;
  email: string;
  name: string;
  artistName: string;
  avatar: string;
  coverImage: string;
  bio: string;
  creatorType: CreatorType;
  genres: string[];
  isVerified: boolean;
  isPremium: boolean;
  socialLinks: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
    website?: string;
  };
  createdAt: string;
  bankDetails?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    mpesaNumber?: string;
  };
}

export interface CreatorStats {
  totalStreams: number;
  monthlyStreams: number;
  totalSubscribers: number;
  newSubscribersThisMonth: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalSongs: number;
  totalPodcasts: number;
  averageStreamDuration: number;
  topPerformingSong: string;
  topPerformingSongId: string;
}

export interface CreatorUpload {
  id: string;
  title: string;
  type: 'song' | 'podcast';
  cover: string;
  audioUrl: string;
  duration: number;
  status: 'draft' | 'processing' | 'published' | 'rejected';
  genre: string;
  description: string;
  tags: string[];
  releaseDate: string;
  uploadedAt: string;
  streams: number;
  likes: number;
  comments: number;
  revenue: number;
  isExplicit: boolean;
  lyrics?: string;
}

export interface StreamAnalytics {
  date: string;
  streams: number;
  uniqueListeners: number;
  revenue: number;
  avgListenTime: number;
}

export interface DemographicData {
  country: string;
  percentage: number;
  streams: number;
}

export interface DeviceData {
  device: string;
  percentage: number;
}

export interface AgeGroupData {
  ageGroup: string;
  percentage: number;
}

export interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  benefits: string[];
  subscriberCount: number;
  isActive: boolean;
}

export interface Subscriber {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  tierId: string;
  tierName: string;
  subscribedAt: string;
  amount: number;
  status: 'active' | 'cancelled' | 'paused';
}

export interface Payout {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  requestedAt: string;
  processedAt?: string;
  method: 'bank' | 'mpesa' | 'paypal';
}

export interface ChartPosition {
  position: number;
  previousPosition: number;
  songId: string;
  songTitle: string;
  artistName: string;
  cover: string;
  streams: number;
  trend: 'up' | 'down' | 'same';
}

export interface CreatorNotification {
  id: string;
  type: 'milestone' | 'new_subscriber' | 'payout' | 'upload_approved' | 'feedback';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface UploadProgress {
  fileName: string;
  progress: number;
  status: 'uploading' | 'processing' | 'complete' | 'error';
  errorMessage?: string;
}

export interface CreatorAuthState {
  creator: Creator | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
