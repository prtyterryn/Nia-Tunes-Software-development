import type { 
  Merchandise, 
  Event, 
  Announcement, 
  CanvasVideo, 
  Conversation, 
  Contact,
  Comment,
  Review,
  ArtistNote,
  CollaborationPost,
  LiveStream,
  TipGift,
  SongSocialLinks
} from '@/types/social';

// ==================== TEREMI KING - NEW ARTIST ====================
export const teremiKing = {
  id: 'creator-teremi',
  email: 'teremi@niatunes.com',
  name: 'Teremi King',
  artistName: 'Teremi King',
  avatar: '/teremi-king.jpg',
  coverImage: '/artist-header.jpg',
  bio: 'Rising Afro-fusion artist from Kenya. Bringing fresh vibes to the East African music scene.',
  creatorType: 'artist' as const,
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

// ==================== MERCHANDISE ====================
export const merchandise: Merchandise[] = [
  {
    id: 'merch-1',
    creatorId: 'creator-1',
    name: 'Alex K Official T-Shirt',
    description: 'Premium cotton t-shirt with Alex K logo. Available in multiple colors.',
    price: 25,
    currency: 'USD',
    images: ['/playlist-1.jpg', '/playlist-2.jpg'],
    category: 'clothing',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Red'],
    stock: 150,
    sold: 47,
    isAvailable: true,
    createdAt: '2024-01-15',
    shippingInfo: {
      weight: 0.3,
      dimensions: '30x20x5 cm',
      shippingCost: 5,
    },
  },
  {
    id: 'merch-2',
    creatorId: 'creator-1',
    name: 'Nakupenda Album Vinyl',
    description: 'Limited edition vinyl of the hit album Nakupenda. Signed by Alex K.',
    price: 45,
    currency: 'USD',
    images: ['/album-2.jpg'],
    category: 'physical',
    stock: 100,
    sold: 23,
    isAvailable: true,
    createdAt: '2024-02-01',
    shippingInfo: {
      weight: 0.5,
      dimensions: '32x32x1 cm',
      shippingCost: 8,
    },
  },
  {
    id: 'merch-3',
    creatorId: 'creator-teremi',
    name: 'Teremi King Hoodie',
    description: 'Stay warm with this premium Teremi King hoodie. Perfect for any season.',
    price: 55,
    currency: 'USD',
    images: ['/teremi-king.jpg'],
    category: 'clothing',
    sizes: ['M', 'L', 'XL'],
    colors: ['Black', 'Green'],
    stock: 80,
    sold: 32,
    isAvailable: true,
    createdAt: '2024-02-20',
    shippingInfo: {
      weight: 0.8,
      dimensions: '40x30x10 cm',
      shippingCost: 10,
    },
  },
  {
    id: 'merch-4',
    creatorId: 'creator-1',
    name: 'Concert Tickets - Nairobi',
    description: 'VIP tickets to the upcoming Nairobi concert. Meet & greet included!',
    price: 80,
    currency: 'USD',
    images: ['/trending-hero.jpg'],
    category: 'tickets',
    stock: 200,
    sold: 156,
    isAvailable: true,
    createdAt: '2024-03-01',
  },
  {
    id: 'merch-5',
    creatorId: 'creator-1',
    name: 'Digital Download Pack',
    description: 'Get all Alex K songs in high-quality FLAC format. Includes bonus tracks.',
    price: 15,
    currency: 'USD',
    images: ['/album-art.jpg'],
    category: 'digital',
    stock: 999999,
    sold: 312,
    isAvailable: true,
    createdAt: '2024-01-10',
  },
];

// ==================== EVENTS ====================
export const events: Event[] = [
  {
    id: 'event-1',
    creatorId: 'creator-1',
    title: 'Alex K Live in Nairobi',
    description: 'An unforgettable night of Afrobeat music! Join Alex K for his biggest concert yet.',
    type: 'concert',
    coverImage: '/trending-hero.jpg',
    startDate: '2024-04-15T19:00:00',
    endDate: '2024-04-15T23:00:00',
    location: {
      venue: 'KICC Grounds',
      address: 'Harambee Avenue',
      city: 'Nairobi',
      country: 'Kenya',
    },
    ticketInfo: {
      price: 50,
      currency: 'USD',
      availableTickets: 500,
      soldTickets: 345,
      ticketLink: 'https://tickets.niatunes.com/alex-k-nairobi',
    },
    isVirtual: false,
    status: 'upcoming',
    attendees: 345,
    createdAt: '2024-02-15',
  },
  {
    id: 'event-2',
    creatorId: 'creator-1',
    title: 'East African Tour 2024',
    description: 'Alex K is going on tour! Catch him in Nairobi, Kampala, Dar es Salaam, and Kigali.',
    type: 'tour',
    coverImage: '/artist-header.jpg',
    startDate: '2024-05-01',
    endDate: '2024-05-30',
    isVirtual: false,
    status: 'upcoming',
    attendees: 1200,
    createdAt: '2024-03-01',
  },
  {
    id: 'event-3',
    creatorId: 'creator-teremi',
    title: 'Teremi King Album Drop Party',
    description: 'Celebrate the release of Teremi King\'s debut album with an exclusive listening party.',
    type: 'release',
    coverImage: '/teremi-king.jpg',
    startDate: '2024-03-25T18:00:00',
    location: {
      venue: 'The Alchemist',
      address: 'Parklands Road',
      city: 'Nairobi',
      country: 'Kenya',
    },
    isVirtual: false,
    status: 'upcoming',
    attendees: 89,
    createdAt: '2024-03-10',
  },
  {
    id: 'event-4',
    creatorId: 'creator-1',
    title: 'Virtual Meet & Greet',
    description: 'Join Alex K for an exclusive virtual meet and greet. Limited spots available!',
    type: 'meet_greet',
    coverImage: '/artist-4.jpg',
    startDate: '2024-03-30T15:00:00',
    isVirtual: true,
    virtualLink: 'https://meet.niatunes.com/alex-k-meet-greet',
    ticketInfo: {
      price: 20,
      currency: 'USD',
      availableTickets: 100,
      soldTickets: 67,
    },
    status: 'upcoming',
    attendees: 67,
    createdAt: '2024-03-15',
  },
];

// ==================== ANNOUNCEMENTS ====================
export const announcements: Announcement[] = [
  {
    id: 'announce-1',
    creatorId: 'creator-1',
    title: 'New Single Dropping Soon!',
    content: 'I\'ve been working on something special. My new single "Mambo Vipi" drops next Friday! Pre-save link in bio. 🎵🔥',
    type: 'single_release',
    attachments: ['/album-1.jpg'],
    likes: 2340,
    comments: 456,
    shares: 189,
    createdAt: '2024-03-20T10:00:00',
  },
  {
    id: 'announce-2',
    creatorId: 'creator-teremi',
    title: 'Just Hit 100K Streams!',
    content: 'Thank you to all my fans! We just hit 100,000 streams on NiaTunes. This is just the beginning! 🙏❤️',
    type: 'milestone',
    attachments: ['/teremi-king.jpg'],
    likes: 1567,
    comments: 234,
    shares: 89,
    createdAt: '2024-03-18T14:30:00',
  },
  {
    id: 'announce-3',
    creatorId: 'creator-1',
    title: 'Collaboration with Zahara!',
    content: 'Excited to announce my upcoming collaboration with the amazing Zahara! Stay tuned for "Nakupenda Remix" dropping next month! 🎤✨',
    type: 'collaboration',
    attachments: ['/artist-1.jpg', '/artist-4.jpg'],
    likes: 5678,
    comments: 892,
    shares: 1234,
    createdAt: '2024-03-15T09:00:00',
  },
];

// ==================== CANVAS VIDEOS ====================
export const canvasVideos: CanvasVideo[] = [
  {
    id: 'canvas-1',
    songId: 'song-1',
    creatorId: 'creator-1',
    videoUrl: '/canvas/nakupenda-canvas.mp4',
    thumbnailUrl: '/album-2.jpg',
    duration: 15,
    status: 'active',
    views: 125000,
    createdAt: '2024-01-15',
  },
  {
    id: 'canvas-2',
    songId: 'song-2',
    creatorId: 'creator-1',
    videoUrl: '/canvas/lala-salama-canvas.mp4',
    thumbnailUrl: '/album-2.jpg',
    duration: 12,
    status: 'active',
    views: 89000,
    createdAt: '2024-02-20',
  },
  {
    id: 'canvas-3',
    songId: 'upload-3',
    creatorId: 'creator-teremi',
    videoUrl: '/canvas/teremi-canvas.mp4',
    thumbnailUrl: '/teremi-king.jpg',
    duration: 18,
    status: 'active',
    views: 45000,
    createdAt: '2024-03-10',
  },
];

// ==================== CONVERSATIONS & MESSAGES ====================
export const conversations: Conversation[] = [
  {
    id: 'conv-1',
    participants: [
      {
        id: 'user-1',
        name: 'Jane Wanjiku',
        avatar: '/artist-1.jpg',
        isOnline: true,
        lastSeen: '2024-03-20T10:30:00',
      },
      {
        id: 'current-user',
        name: 'Alex K',
        avatar: '/artist-4.jpg',
        isOnline: true,
      },
    ],
    lastMessage: {
      id: 'msg-3',
      conversationId: 'conv-1',
      senderId: 'user-1',
      type: 'song',
      content: 'Check out this new song!',
      songInfo: {
        songId: 'song-1',
        title: 'Nakupenda',
        artist: 'Alex K',
        cover: '/album-2.jpg',
      },
      isRead: false,
      createdAt: '2024-03-20T10:30:00',
    },
    unreadCount: 2,
    isGroup: false,
    createdAt: '2024-01-15',
  },
  {
    id: 'conv-2',
    participants: [
      {
        id: 'user-2',
        name: 'Music Lovers Group',
        avatar: '/playlist-1.jpg',
        isOnline: false,
        lastSeen: '2024-03-19T18:00:00',
      },
    ],
    lastMessage: {
      id: 'msg-5',
      conversationId: 'conv-2',
      senderId: 'user-3',
      type: 'text',
      content: 'Who\'s going to the concert next week?',
      isRead: true,
      createdAt: '2024-03-19T18:00:00',
    },
    unreadCount: 0,
    isGroup: true,
    groupName: 'Music Lovers',
    groupAvatar: '/playlist-1.jpg',
    createdAt: '2024-02-01',
  },
];

export const contacts: Contact[] = [
  {
    id: 'contact-1',
    name: 'Jane Wanjiku',
    avatar: '/artist-1.jpg',
    phoneNumber: '+254712345678',
    isOnNiaTunes: true,
    isFriend: true,
    mutualFriends: 12,
  },
  {
    id: 'contact-2',
    name: 'John Ochieng',
    avatar: '/artist-2.jpg',
    phoneNumber: '+254723456789',
    isOnNiaTunes: true,
    isFriend: false,
    mutualFriends: 5,
  },
  {
    id: 'contact-3',
    name: 'Mary Atieno',
    avatar: '/artist-3.jpg',
    phoneNumber: '+254734567890',
    isOnNiaTunes: false,
    isFriend: false,
    mutualFriends: 0,
  },
];

// ==================== COMMENTS ====================
export const comments: Comment[] = [
  {
    id: 'comment-1',
    songId: 'song-1',
    userId: 'user-1',
    userName: 'Jane Wanjiku',
    userAvatar: '/artist-1.jpg',
    content: 'This song is fire! 🔥 Can\'t stop listening to it!',
    type: 'text',
    likes: 234,
    replies: [
      {
        id: 'reply-1',
        songId: 'song-1',
        userId: 'creator-1',
        userName: 'Alex K',
        userAvatar: '/artist-4.jpg',
        content: 'Thank you! Glad you love it! 🙏',
        type: 'text',
        likes: 89,
        replies: [],
        isPinned: false,
        createdAt: '2024-01-16T10:00:00',
      },
    ],
    isPinned: true,
    createdAt: '2024-01-15T14:30:00',
  },
  {
    id: 'comment-2',
    songId: 'song-1',
    userId: 'user-2',
    userName: 'John Ochieng',
    userAvatar: '/artist-2.jpg',
    content: 'Video reaction',
    type: 'video_reaction',
    videoUrl: '/reactions/reaction-1.mp4',
    likes: 567,
    replies: [],
    isPinned: false,
    createdAt: '2024-01-18T16:45:00',
  },
];

// ==================== REVIEWS ====================
export const reviews: Review[] = [
  {
    id: 'review-1',
    songId: 'song-1',
    userId: 'user-1',
    userName: 'Jane Wanjiku',
    userAvatar: '/artist-1.jpg',
    rating: 5,
    review: 'Absolute masterpiece! The production quality is incredible and the lyrics are so meaningful. Alex K never disappoints!',
    likes: 123,
    isVerifiedPurchase: true,
    createdAt: '2024-01-20',
  },
  {
    id: 'review-2',
    songId: 'song-1',
    userId: 'user-3',
    userName: 'Mary Atieno',
    userAvatar: '/artist-3.jpg',
    rating: 4,
    review: 'Great song! Love the Afrobeat vibes. Would love to hear more collaborations like this.',
    likes: 67,
    isVerifiedPurchase: false,
    createdAt: '2024-01-22',
  },
];

// ==================== ARTIST NOTES ====================
export const artistNotes: ArtistNote[] = [
  {
    id: 'note-1',
    creatorId: 'creator-1',
    songId: 'song-1',
    title: 'The Story Behind Nakupenda',
    content: 'I wrote this song during a rainy night in Nairobi. It was inspired by a special someone who showed me what true love means. Every lyric comes from the heart. I hope this song resonates with anyone who has ever been in love.',
    attachments: ['/album-2.jpg', '/artist-4.jpg'],
    isPinned: true,
    likes: 3456,
    createdAt: '2024-01-16',
  },
  {
    id: 'note-2',
    creatorId: 'creator-teremi',
    songId: 'upload-3',
    title: 'My Journey to This Moment',
    content: 'This song represents years of hard work, sacrifices, and believing in myself. From performing in small clubs to now having my music on NiaTunes - it\'s been an incredible journey. Thank you to everyone who supported me along the way.',
    attachments: ['/teremi-king.jpg'],
    isPinned: false,
    likes: 1890,
    createdAt: '2024-03-12',
  },
];

// ==================== COLLABORATION POSTS ====================
export const collaborationPosts: CollaborationPost[] = [
  {
    id: 'collab-1',
    primaryCreatorId: 'creator-1',
    collaborators: [
      {
        creatorId: 'creator-1',
        name: 'Alex K',
        avatar: '/artist-4.jpg',
        hasApproved: true,
        postedAt: '2024-03-15T10:00:00',
      },
      {
        creatorId: 'artist-1',
        name: 'Zahara',
        avatar: '/artist-1.jpg',
        hasApproved: true,
        postedAt: '2024-03-15T10:05:00',
      },
    ],
    songId: 'song-1',
    title: 'Nakupenda Remix Out Now!',
    description: 'Two voices, one heart. The Nakupenda Remix featuring the incredible Zahara is now live on NiaTunes! Stream it now and let us know what you think! 🎵❤️',
    coverImage: '/album-2.jpg',
    isPostedOnAll: true,
    individualPosts: [
      {
        creatorId: 'creator-1',
        postId: 'post-1',
        isPosted: true,
        engagement: { likes: 5678, comments: 892, shares: 1234 },
      },
      {
        creatorId: 'artist-1',
        postId: 'post-2',
        isPosted: true,
        engagement: { likes: 8901, comments: 1234, shares: 2345 },
      },
    ],
    totalEngagement: {
      likes: 14579,
      comments: 2126,
      shares: 3579,
      streams: 125000,
    },
    createdAt: '2024-03-15',
  },
];

// ==================== LIVE STREAMS ====================
export const liveStreams: LiveStream[] = [
  {
    id: 'live-1',
    creatorId: 'creator-1',
    creatorName: 'Alex K',
    creatorAvatar: '/artist-4.jpg',
    title: 'Live Studio Session - Creating New Music!',
    thumbnailUrl: '/artist-header.jpg',
    status: 'ended',
    startedAt: '2024-03-18T20:00:00',
    endedAt: '2024-03-18T22:30:00',
    viewers: 0,
    peakViewers: 3456,
    totalViews: 12500,
    duration: 9000,
    tips: [
      {
        id: 'tip-1',
        streamId: 'live-1',
        senderId: 'user-1',
        senderName: 'Jane Wanjiku',
        senderAvatar: '/artist-1.jpg',
        amount: 50,
        currency: 'USD',
        message: 'Love your music! Keep creating! 🎵',
        giftType: 'rose',
        createdAt: '2024-03-18T20:15:00',
      },
      {
        id: 'tip-2',
        streamId: 'live-1',
        senderId: 'user-2',
        senderName: 'John Ochieng',
        senderAvatar: '/artist-2.jpg',
        amount: 100,
        currency: 'USD',
        message: 'This is amazing! Can\'t wait for the new album!',
        giftType: 'diamond',
        createdAt: '2024-03-18T20:30:00',
      },
    ],
    totalTips: 450,
    comments: [],
    isRecording: true,
    recordingUrl: '/recordings/live-1-recording.mp4',
  },
  {
    id: 'live-2',
    creatorId: 'creator-teremi',
    creatorName: 'Teremi King',
    creatorAvatar: '/teremi-king.jpg',
    title: 'Q&A with Teremi King - Ask Me Anything!',
    thumbnailUrl: '/teremi-king.jpg',
    status: 'scheduled',
    scheduledAt: '2024-03-25T19:00:00',
    viewers: 0,
    peakViewers: 0,
    totalViews: 0,
    duration: 0,
    tips: [],
    totalTips: 0,
    comments: [],
    isRecording: false,
  },
];

// ==================== TIP GIFTS ====================
export const tipGifts: TipGift[] = [
  { id: 'gift-1', name: 'Rose', icon: '🌹', price: 1, currency: 'USD', animation: 'float' },
  { id: 'gift-2', name: 'Heart', icon: '❤️', price: 5, currency: 'USD', animation: 'pulse' },
  { id: 'gift-3', name: 'Star', icon: '⭐', price: 10, currency: 'USD', animation: 'sparkle' },
  { id: 'gift-4', name: 'Diamond', icon: '💎', price: 50, currency: 'USD', animation: 'shine' },
  { id: 'gift-5', name: 'Crown', icon: '👑', price: 100, currency: 'USD', animation: 'royal' },
  { id: 'gift-6', name: 'Rocket', icon: '🚀', price: 500, currency: 'USD', animation: 'fly' },
];

// ==================== SOCIAL LINKS ====================
export const songSocialLinks: SongSocialLinks[] = [
  {
    songId: 'song-1',
    youtubeUrl: 'https://youtube.com/watch?v=nakupenda',
    spotifyUrl: 'https://open.spotify.com/track/nakupenda',
    appleMusicUrl: 'https://music.apple.com/song/nakupenda',
    tiktokUrl: 'https://tiktok.com/music/nakupenda',
    instagramReelUrl: 'https://instagram.com/reel/nakupenda',
  },
  {
    songId: 'upload-3',
    youtubeUrl: 'https://youtube.com/watch?v=teremi-debut',
    audiomackUrl: 'https://audiomack.com/teremiking/song/debut',
    boomplayUrl: 'https://boomplay.com/song/teremi-debut',
  },
];

// ==================== HELPER FUNCTIONS ====================
export const formatRelativeTime = (date: string): string => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return past.toLocaleDateString();
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};
