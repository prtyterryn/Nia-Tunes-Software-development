import type { 
  Creator, 
  CreatorStats, 
  CreatorUpload, 
  StreamAnalytics, 
  DemographicData,
  DeviceData,
  AgeGroupData,
  SubscriptionTier,
  Subscriber,
  Payout,
  ChartPosition,
  CreatorNotification
} from '@/types/creator';

// Teremi King - Featured Artist
export const teremiKingCreator: Creator = {
  id: 'creator-teremi',
  email: 'teremi@niatunes.com',
  name: 'Teremi King',
  artistName: 'Teremi King',
  avatar: '/teremi-king.jpg',
  coverImage: '/teremi-king.jpg',
  bio: 'Rising Afro-fusion artist from Kenya. Bringing fresh vibes to the East African music scene with unique sounds and authentic storytelling.',
  creatorType: 'artist',
  genres: ['Afrobeat', 'Gengetone', 'Benga'],
  isVerified: true,
  isPremium: true,
  socialLinks: {
    instagram: '@teremiking',
    twitter: '@teremi_king',
    youtube: 'TeremiKingOfficial',
    website: 'www.teremiking.com',
  },
  createdAt: '2023-06-15',
  bankDetails: {
    accountName: 'Teremi King',
    accountNumber: '9876543210',
    bankName: 'Equity Bank',
    mpesaNumber: '+254798765432',
  },
};

// All Creators
export const allCreators: Creator[] = [
  teremiKingCreator,
];

// Current Creator (Logged in)
export const currentCreator: Creator = {
  id: 'creator-1',
  email: 'artist@niatunes.com',
  name: 'Alex Kimani',
  artistName: 'Alex K',
  avatar: '/artist-4.jpg',
  coverImage: '/artist-header.jpg',
  bio: 'Afrobeat artist from Nairobi, Kenya. Creating music that moves the soul.',
  creatorType: 'artist',
  genres: ['Afrobeat', 'Pop', 'R&B'],
  isVerified: true,
  isPremium: true,
  socialLinks: {
    instagram: '@alexkmusic',
    twitter: '@alexk_official',
    youtube: 'AlexKMusic',
    website: 'www.alexkmusic.com',
  },
  createdAt: '2023-01-15',
  bankDetails: {
    accountName: 'Alex Kimani',
    accountNumber: '1234567890',
    bankName: 'KCB Bank',
    mpesaNumber: '+254712345678',
  },
};

// Creator Stats
export const creatorStats: CreatorStats = {
  totalStreams: 2450000,
  monthlyStreams: 156000,
  totalSubscribers: 12500,
  newSubscribersThisMonth: 850,
  totalRevenue: 48500,
  monthlyRevenue: 3200,
  totalSongs: 24,
  totalPodcasts: 0,
  averageStreamDuration: 184,
  topPerformingSong: 'Nakupenda',
  topPerformingSongId: 'song-1',
};

// Creator Uploads
export const creatorUploads: CreatorUpload[] = [
  {
    id: 'upload-1',
    title: 'Nakupenda',
    type: 'song',
    cover: '/album-2.jpg',
    audioUrl: '/audio/song1.mp3',
    duration: 214,
    status: 'published',
    genre: 'Afrobeat',
    description: 'A love song dedicated to my fans',
    tags: ['afrobeat', 'love', 'kenya'],
    releaseDate: '2024-01-15',
    uploadedAt: '2024-01-10',
    streams: 520000,
    likes: 45000,
    comments: 2300,
    revenue: 2600,
    isExplicit: false,
    lyrics: 'Nakupenda, nakupenda...',
  },
  {
    id: 'upload-2',
    title: 'Lala Salama',
    type: 'song',
    cover: '/album-2.jpg',
    audioUrl: '/audio/song2.mp3',
    duration: 192,
    status: 'published',
    genre: 'Afrobeat',
    description: 'Sleep peacefully my love',
    tags: ['afrobeat', 'ballad'],
    releaseDate: '2024-02-20',
    uploadedAt: '2024-02-15',
    streams: 320000,
    likes: 28000,
    comments: 1500,
    revenue: 1600,
    isExplicit: false,
  },
  {
    id: 'upload-3',
    title: 'Behind the Music - Episode 1',
    type: 'podcast',
    cover: '/playlist-3.jpg',
    audioUrl: '/audio/podcast1.mp3',
    duration: 1800,
    status: 'published',
    genre: 'Talk',
    description: 'My journey in the music industry',
    tags: ['podcast', 'interview', 'story'],
    releaseDate: '2024-03-01',
    uploadedAt: '2024-02-28',
    streams: 45000,
    likes: 5200,
    comments: 890,
    revenue: 450,
    isExplicit: false,
  },
  {
    id: 'upload-4',
    title: 'New Single (Unreleased)',
    type: 'song',
    cover: '/album-1.jpg',
    audioUrl: '',
    duration: 0,
    status: 'draft',
    genre: 'Afrobeat',
    description: 'Coming soon...',
    tags: ['afrobeat', 'new'],
    releaseDate: '',
    uploadedAt: '2024-03-10',
    streams: 0,
    likes: 0,
    comments: 0,
    revenue: 0,
    isExplicit: false,
  },
  {
    id: 'upload-5',
    title: 'Summer Vibes',
    type: 'song',
    cover: '/album-3.jpg',
    audioUrl: '/audio/song3.mp3',
    duration: 201,
    status: 'processing',
    genre: 'Pop',
    description: 'Feel good summer track',
    tags: ['pop', 'summer', 'dance'],
    releaseDate: '2024-03-20',
    uploadedAt: '2024-03-15',
    streams: 0,
    likes: 0,
    comments: 0,
    revenue: 0,
    isExplicit: false,
  },
];

// Stream Analytics (Last 30 days)
export const streamAnalytics: StreamAnalytics[] = [
  { date: '2024-03-01', streams: 4200, uniqueListeners: 3800, revenue: 84, avgListenTime: 165 },
  { date: '2024-03-02', streams: 5100, uniqueListeners: 4500, revenue: 102, avgListenTime: 172 },
  { date: '2024-03-03', streams: 4800, uniqueListeners: 4200, revenue: 96, avgListenTime: 168 },
  { date: '2024-03-04', streams: 5500, uniqueListeners: 4900, revenue: 110, avgListenTime: 180 },
  { date: '2024-03-05', streams: 6200, uniqueListeners: 5400, revenue: 124, avgListenTime: 185 },
  { date: '2024-03-06', streams: 5800, uniqueListeners: 5100, revenue: 116, avgListenTime: 178 },
  { date: '2024-03-07', streams: 6500, uniqueListeners: 5800, revenue: 130, avgListenTime: 190 },
  { date: '2024-03-08', streams: 7200, uniqueListeners: 6400, revenue: 144, avgListenTime: 195 },
  { date: '2024-03-09', streams: 6800, uniqueListeners: 6000, revenue: 136, avgListenTime: 188 },
  { date: '2024-03-10', streams: 7500, uniqueListeners: 6700, revenue: 150, avgListenTime: 192 },
  { date: '2024-03-11', streams: 8100, uniqueListeners: 7200, revenue: 162, avgListenTime: 198 },
  { date: '2024-03-12', streams: 7900, uniqueListeners: 7000, revenue: 158, avgListenTime: 194 },
  { date: '2024-03-13', streams: 8500, uniqueListeners: 7600, revenue: 170, avgListenTime: 200 },
  { date: '2024-03-14', streams: 9200, uniqueListeners: 8200, revenue: 184, avgListenTime: 205 },
  { date: '2024-03-15', streams: 8800, uniqueListeners: 7900, revenue: 176, avgListenTime: 202 },
];

// Demographics
export const demographicData: DemographicData[] = [
  { country: 'Kenya', percentage: 45, streams: 1102500 },
  { country: 'Nigeria', percentage: 18, streams: 441000 },
  { country: 'Tanzania', percentage: 12, streams: 294000 },
  { country: 'Uganda', percentage: 10, streams: 245000 },
  { country: 'South Africa', percentage: 8, streams: 196000 },
  { country: 'Others', percentage: 7, streams: 171500 },
];

export const deviceData: DeviceData[] = [
  { device: 'Mobile', percentage: 72 },
  { device: 'Desktop', percentage: 18 },
  { device: 'Tablet', percentage: 7 },
  { device: 'Smart Speaker', percentage: 3 },
];

export const ageGroupData: AgeGroupData[] = [
  { ageGroup: '18-24', percentage: 35 },
  { ageGroup: '25-34', percentage: 32 },
  { ageGroup: '35-44', percentage: 18 },
  { ageGroup: '45-54', percentage: 10 },
  { ageGroup: '55+', percentage: 5 },
];

// Subscription Tiers
export const subscriptionTiers: SubscriptionTier[] = [
  {
    id: 'tier-1',
    name: 'Fan Club',
    price: 2.99,
    currency: 'USD',
    description: 'Support your favorite artist',
    benefits: [
      'Exclusive updates',
      'Early access to new releases',
      'Fan badge on profile',
    ],
    subscriberCount: 8500,
    isActive: true,
  },
  {
    id: 'tier-2',
    name: 'Super Fan',
    price: 5.99,
    currency: 'USD',
    description: 'Get closer to the music',
    benefits: [
      'All Fan Club benefits',
      'Behind-the-scenes content',
      'Monthly live Q&A',
      'Exclusive merchandise discounts',
    ],
    subscriberCount: 3200,
    isActive: true,
  },
  {
    id: 'tier-3',
    name: 'VIP',
    price: 12.99,
    currency: 'USD',
    description: 'The ultimate fan experience',
    benefits: [
      'All Super Fan benefits',
      '1-on-1 video call monthly',
      'Free concert tickets',
      'Signed merchandise',
      'Name in album credits',
    ],
    subscriberCount: 800,
    isActive: true,
  },
];

// Subscribers
export const subscribers: Subscriber[] = [
  {
    id: 'sub-1',
    userId: 'user-1',
    name: 'Jane Wanjiku',
    avatar: '/artist-1.jpg',
    tierId: 'tier-2',
    tierName: 'Super Fan',
    subscribedAt: '2024-02-15',
    amount: 5.99,
    status: 'active',
  },
  {
    id: 'sub-2',
    userId: 'user-2',
    name: 'John Ochieng',
    avatar: '/artist-2.jpg',
    tierId: 'tier-1',
    tierName: 'Fan Club',
    subscribedAt: '2024-03-01',
    amount: 2.99,
    status: 'active',
  },
  {
    id: 'sub-3',
    userId: 'user-3',
    name: 'Mary Atieno',
    avatar: '/artist-3.jpg',
    tierId: 'tier-3',
    tierName: 'VIP',
    subscribedAt: '2024-01-20',
    amount: 12.99,
    status: 'active',
  },
];

// Payouts
export const payouts: Payout[] = [
  {
    id: 'payout-1',
    amount: 2800,
    currency: 'USD',
    status: 'completed',
    requestedAt: '2024-02-28',
    processedAt: '2024-03-01',
    method: 'mpesa',
  },
  {
    id: 'payout-2',
    amount: 3200,
    currency: 'USD',
    status: 'completed',
    requestedAt: '2024-01-31',
    processedAt: '2024-02-02',
    method: 'bank',
  },
  {
    id: 'payout-3',
    amount: 3500,
    currency: 'USD',
    status: 'processing',
    requestedAt: '2024-03-28',
    method: 'mpesa',
  },
];

// Chart Positions (Top 100 Kenya)
export const chartPositions: ChartPosition[] = [
  {
    position: 3,
    previousPosition: 5,
    songId: 'upload-1',
    songTitle: 'Nakupenda',
    artistName: 'Alex K',
    cover: '/album-2.jpg',
    streams: 520000,
    trend: 'up',
  },
  {
    position: 12,
    previousPosition: 10,
    songId: 'upload-2',
    songTitle: 'Lala Salama',
    artistName: 'Alex K',
    cover: '/album-2.jpg',
    streams: 320000,
    trend: 'down',
  },
  {
    position: 28,
    previousPosition: 28,
    songId: 'upload-3',
    songTitle: 'Behind the Music - Episode 1',
    artistName: 'Alex K',
    cover: '/playlist-3.jpg',
    streams: 45000,
    trend: 'same',
  },
];

// Notifications
export const creatorNotifications: CreatorNotification[] = [
  {
    id: 'notif-1',
    type: 'milestone',
    title: '2 Million Streams!',
    message: 'Congratulations! You have reached 2 million total streams on NiaTunes.',
    read: false,
    createdAt: '2024-03-15T10:30:00',
  },
  {
    id: 'notif-2',
    type: 'new_subscriber',
    title: 'New VIP Subscriber',
    message: 'Mary Atieno just subscribed to your VIP tier!',
    read: false,
    createdAt: '2024-03-14T16:45:00',
  },
  {
    id: 'notif-3',
    type: 'payout',
    title: 'Payout Processed',
    message: 'Your payout of $3,200 has been processed to your bank account.',
    read: true,
    createdAt: '2024-03-01T09:00:00',
  },
  {
    id: 'notif-4',
    type: 'upload_approved',
    title: 'Song Published',
    message: 'Your song "Lala Salama" has been published successfully.',
    read: true,
    createdAt: '2024-02-20T14:20:00',
  },
];

// Helper functions
export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumberCompact = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
