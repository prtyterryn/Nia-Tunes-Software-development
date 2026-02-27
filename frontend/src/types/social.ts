// Social Features Types for NiaTunes

// ==================== MERCHANDISE ====================
export interface Merchandise {
  id: string;
  creatorId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  category: 'clothing' | 'accessories' | 'digital' | 'physical' | 'tickets';
  sizes?: string[];
  colors?: string[];
  stock: number;
  sold: number;
  isAvailable: boolean;
  createdAt: string;
  shippingInfo?: {
    weight: number;
    dimensions: string;
    shippingCost: number;
  };
}

export interface MerchandiseOrder {
  id: string;
  merchandiseId: string;
  buyerId: string;
  buyerName: string;
  quantity: number;
  totalAmount: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress?: {
    name: string;
    phone: string;
    address: string;
    city: string;
    country: string;
  };
  createdAt: string;
}

// ==================== EVENTS & ANNOUNCEMENTS ====================
export interface Event {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  type: 'concert' | 'tour' | 'release' | 'meet_greet' | 'live_stream';
  coverImage: string;
  startDate: string;
  endDate?: string;
  location?: {
    venue: string;
    address: string;
    city: string;
    country: string;
    coordinates?: { lat: number; lng: number };
  };
  ticketInfo?: {
    price: number;
    currency: string;
    availableTickets: number;
    soldTickets: number;
    ticketLink?: string;
  };
  isVirtual: boolean;
  virtualLink?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  attendees: number;
  createdAt: string;
}

export interface Announcement {
  id: string;
  creatorId: string;
  title: string;
  content: string;
  type: 'general' | 'album_drop' | 'single_release' | 'collaboration' | 'milestone';
  attachments: string[];
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
}

// ==================== CANVAS VIDEOS ====================
export interface CanvasVideo {
  id: string;
  songId: string;
  creatorId: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: number; // Max 30 seconds
  status: 'processing' | 'active' | 'rejected';
  views: number;
  createdAt: string;
}

// ==================== MESSAGING ====================
export interface Conversation {
  id: string;
  participants: ChatParticipant[];
  lastMessage: Message;
  unreadCount: number;
  isGroup: boolean;
  groupName?: string;
  groupAvatar?: string;
  createdAt: string;
}

export interface ChatParticipant {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  type: 'text' | 'image' | 'audio' | 'song' | 'video' | 'reaction';
  content: string;
  mediaUrl?: string;
  songInfo?: {
    songId: string;
    title: string;
    artist: string;
    cover: string;
  };
  replyTo?: string;
  isRead: boolean;
  createdAt: string;
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  phoneNumber?: string;
  isOnNiaTunes: boolean;
  isFriend: boolean;
  mutualFriends: number;
}

// ==================== COMMENTS & REVIEWS ====================
export interface Comment {
  id: string;
  songId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  type: 'text' | 'video_reaction';
  videoUrl?: string;
  likes: number;
  replies: Comment[];
  isPinned: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  songId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number; // 1-5 stars
  review: string;
  videoReaction?: string;
  likes: number;
  isVerifiedPurchase: boolean;
  createdAt: string;
}

// ==================== ARTIST NOTES/PREVIEWS ====================
export interface ArtistNote {
  id: string;
  creatorId: string;
  songId?: string;
  albumId?: string;
  title: string;
  content: string;
  attachments: string[]; // Multiple photos
  isPinned: boolean;
  likes: number;
  createdAt: string;
}

// ==================== COLLABORATION POSTS ====================
export interface CollaborationPost {
  id: string;
  primaryCreatorId: string;
  collaborators: CollaborationPartner[];
  songId: string;
  title: string;
  description: string;
  coverImage: string;
  isPostedOnAll: boolean;
  individualPosts: IndividualCollaborationPost[];
  totalEngagement: {
    likes: number;
    comments: number;
    shares: number;
    streams: number;
  };
  createdAt: string;
}

export interface CollaborationPartner {
  creatorId: string;
  name: string;
  avatar: string;
  hasApproved: boolean;
  postedAt?: string;
}

export interface IndividualCollaborationPost {
  creatorId: string;
  postId: string;
  isPosted: boolean;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
}

// ==================== LIVE STREAMING ====================
export interface LiveStream {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  title: string;
  thumbnailUrl: string;
  status: 'scheduled' | 'live' | 'ended';
  scheduledAt?: string;
  startedAt?: string;
  endedAt?: string;
  viewers: number;
  peakViewers: number;
  totalViews: number;
  duration: number;
  tips: Tip[];
  totalTips: number;
  comments: LiveComment[];
  isRecording: boolean;
  recordingUrl?: string;
}

export interface LiveComment {
  id: string;
  streamId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  message: string;
  isVIP: boolean;
  createdAt: string;
}

export interface Tip {
  id: string;
  streamId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  amount: number;
  currency: string;
  message?: string;
  giftType?: string;
  createdAt: string;
}

// Tip Gift Types (like TikTok)
export interface TipGift {
  id: string;
  name: string;
  icon: string;
  price: number;
  currency: string;
  animation: string;
}

// ==================== SOCIAL LINKS ====================
export interface SongSocialLinks {
  songId: string;
  youtubeUrl?: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  soundcloudUrl?: string;
  audiomackUrl?: string;
  boomplayUrl?: string;
  tiktokUrl?: string;
  instagramReelUrl?: string;
}

// ==================== NOTIFICATIONS ====================
export interface SocialNotification {
  id: string;
  type: 
    | 'new_follower' 
    | 'new_message' 
    | 'song_shared' 
    | 'comment_reply' 
    | 'live_started'
    | 'collaboration_invite'
    | 'tip_received'
    | 'mention';
  title: string;
  message: string;
  senderId?: string;
  senderName?: string;
  senderAvatar?: string;
  targetId?: string; // songId, messageId, etc.
  read: boolean;
  createdAt: string;
}
