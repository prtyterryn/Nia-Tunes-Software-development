import { create } from 'zustand';
import type { 
  Merchandise, 
  Event, 
  Announcement, 
  CanvasVideo,
  Conversation,
  Message,
  Contact,
  Comment,
  Review,
  ArtistNote,
  CollaborationPost,
  LiveStream,
  Tip,
  TipGift
} from '@/types/social';
import { 
  merchandise, 
  events, 
  announcements, 
  canvasVideos,
  conversations,
  contacts,
  comments,
  reviews,
  artistNotes,
  collaborationPosts,
  liveStreams,
  tipGifts
} from '@/data/socialMockData';

// ==================== MERCHANDISE STORE ====================
interface MerchandiseStore {
  items: Merchandise[];
  addMerchandise: (item: Merchandise) => void;
  updateMerchandise: (id: string, updates: Partial<Merchandise>) => void;
  deleteMerchandise: (id: string) => void;
  getCreatorMerchandise: (creatorId: string) => Merchandise[];
}

export const useMerchandiseStore = create<MerchandiseStore>()((set, get) => ({
  items: merchandise,
  addMerchandise: (item) => set((state) => ({ items: [...state.items, item] })),
  updateMerchandise: (id, updates) => set((state) => ({
    items: state.items.map(i => i.id === id ? { ...i, ...updates } : i)
  })),
  deleteMerchandise: (id) => set((state) => ({ 
    items: state.items.filter(i => i.id !== id) 
  })),
  getCreatorMerchandise: (creatorId) => get().items.filter(i => i.creatorId === creatorId),
}));

// ==================== EVENTS STORE ====================
interface EventsStore {
  events: Event[];
  announcements: Announcement[];
  addEvent: (event: Event) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  addAnnouncement: (announcement: Announcement) => void;
  deleteAnnouncement: (id: string) => void;
  getCreatorEvents: (creatorId: string) => Event[];
  getCreatorAnnouncements: (creatorId: string) => Announcement[];
}

export const useEventsStore = create<EventsStore>()((set, get) => ({
  events: events,
  announcements: announcements,
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  updateEvent: (id, updates) => set((state) => ({
    events: state.events.map(e => e.id === id ? { ...e, ...updates } : e)
  })),
  deleteEvent: (id) => set((state) => ({ events: state.events.filter(e => e.id !== id) })),
  addAnnouncement: (announcement) => set((state) => ({ 
    announcements: [announcement, ...state.announcements] 
  })),
  deleteAnnouncement: (id) => set((state) => ({ 
    announcements: state.announcements.filter(a => a.id !== id) 
  })),
  getCreatorEvents: (creatorId) => get().events.filter(e => e.creatorId === creatorId),
  getCreatorAnnouncements: (creatorId) => get().announcements.filter(a => a.creatorId === creatorId),
}));

// ==================== CANVAS STORE ====================
interface CanvasStore {
  videos: CanvasVideo[];
  addCanvas: (video: CanvasVideo) => void;
  updateCanvas: (id: string, updates: Partial<CanvasVideo>) => void;
  deleteCanvas: (id: string) => void;
  getSongCanvas: (songId: string) => CanvasVideo | undefined;
  getCreatorCanvasVideos: (creatorId: string) => CanvasVideo[];
}

export const useCanvasStore = create<CanvasStore>()((set, get) => ({
  videos: canvasVideos,
  addCanvas: (video) => set((state) => ({ videos: [...state.videos, video] })),
  updateCanvas: (id, updates) => set((state) => ({
    videos: state.videos.map(v => v.id === id ? { ...v, ...updates } : v)
  })),
  deleteCanvas: (id) => set((state) => ({ videos: state.videos.filter(v => v.id !== id) })),
  getSongCanvas: (songId) => get().videos.find(v => v.songId === songId),
  getCreatorCanvasVideos: (creatorId) => get().videos.filter(v => v.creatorId === creatorId),
}));

// ==================== MESSAGING STORE ====================
interface MessagingStore {
  conversations: Conversation[];
  contacts: Contact[];
  activeConversation: string | null;
  addConversation: (conversation: Conversation) => void;
  addMessage: (conversationId: string, message: Message) => void;
  markAsRead: (conversationId: string) => void;
  setActiveConversation: (id: string | null) => void;
  addContact: (contact: Contact) => void;
  syncContacts: () => Promise<void>;
}

export const useMessagingStore = create<MessagingStore>()((set) => ({
  conversations: conversations,
  contacts: contacts,
  activeConversation: null,
  addConversation: (conversation) => set((state) => ({ 
    conversations: [conversation, ...state.conversations] 
  })),
  addMessage: (conversationId, message) => set((state) => ({
    conversations: state.conversations.map(c => 
      c.id === conversationId 
        ? { ...c, lastMessage: message, unreadCount: c.unreadCount + 1 }
        : c
    )
  })),
  markAsRead: (conversationId) => set((state) => ({
    conversations: state.conversations.map(c => 
      c.id === conversationId ? { ...c, unreadCount: 0 } : c
    )
  })),
  setActiveConversation: (id) => set({ activeConversation: id }),
  addContact: (contact) => set((state) => ({ 
    contacts: [...state.contacts, contact] 
  })),
  syncContacts: async () => {
    // Simulate syncing phone contacts
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Would integrate with device contacts API in real app
  },
}));

// ==================== COMMENTS & REVIEWS STORE ====================
interface CommentsStore {
  comments: Comment[];
  reviews: Review[];
  addComment: (comment: Comment) => void;
  addReply: (parentId: string, reply: Comment) => void;
  likeComment: (commentId: string) => void;
  deleteComment: (commentId: string) => void;
  addReview: (review: Review) => void;
  likeReview: (reviewId: string) => void;
  getSongComments: (songId: string) => Comment[];
  getSongReviews: (songId: string) => Review[];
}

export const useCommentsStore = create<CommentsStore>()((set, get) => ({
  comments: comments,
  reviews: reviews,
  addComment: (comment) => set((state) => ({ 
    comments: [comment, ...state.comments] 
  })),
  addReply: (parentId, reply) => set((state) => ({
    comments: state.comments.map(c => 
      c.id === parentId 
        ? { ...c, replies: [...c.replies, reply] }
        : c
    )
  })),
  likeComment: (commentId) => set((state) => ({
    comments: state.comments.map(c => 
      c.id === commentId ? { ...c, likes: c.likes + 1 } : c
    )
  })),
  deleteComment: (commentId) => set((state) => ({
    comments: state.comments.filter(c => c.id !== commentId)
  })),
  addReview: (review) => set((state) => ({ reviews: [review, ...state.reviews] })),
  likeReview: (reviewId) => set((state) => ({
    reviews: state.reviews.map(r => 
      r.id === reviewId ? { ...r, likes: r.likes + 1 } : r
    )
  })),
  getSongComments: (songId) => get().comments.filter(c => c.songId === songId),
  getSongReviews: (songId) => get().reviews.filter(r => r.songId === songId),
}));

// ==================== ARTIST NOTES STORE ====================
interface ArtistNotesStore {
  notes: ArtistNote[];
  addNote: (note: ArtistNote) => void;
  updateNote: (id: string, updates: Partial<ArtistNote>) => void;
  deleteNote: (id: string) => void;
  pinNote: (id: string) => void;
  getSongNotes: (songId: string) => ArtistNote[];
  getCreatorNotes: (creatorId: string) => ArtistNote[];
}

export const useArtistNotesStore = create<ArtistNotesStore>()((set, get) => ({
  notes: artistNotes,
  addNote: (note) => set((state) => ({ notes: [note, ...state.notes] })),
  updateNote: (id, updates) => set((state) => ({
    notes: state.notes.map(n => n.id === id ? { ...n, ...updates } : n)
  })),
  deleteNote: (id) => set((state) => ({ notes: state.notes.filter(n => n.id !== id) })),
  pinNote: (id) => set((state) => ({
    notes: state.notes.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n)
  })),
  getSongNotes: (songId) => get().notes.filter(n => n.songId === songId),
  getCreatorNotes: (creatorId) => get().notes.filter(n => n.creatorId === creatorId),
}));

// ==================== COLLABORATION STORE ====================
interface CollaborationStore {
  posts: CollaborationPost[];
  createCollaboration: (post: CollaborationPost) => void;
  approveCollaboration: (postId: string, creatorId: string) => void;
  postCollaboration: (postId: string, creatorId: string, postId2: string) => void;
  getPendingCollaborations: (creatorId: string) => CollaborationPost[];
  getCreatorCollaborations: (creatorId: string) => CollaborationPost[];
}

export const useCollaborationStore = create<CollaborationStore>()((set, get) => ({
  posts: collaborationPosts,
  createCollaboration: (post) => set((state) => ({ posts: [...state.posts, post] })),
  approveCollaboration: (postId, creatorId) => set((state) => ({
    posts: state.posts.map(p => 
      p.id === postId 
        ? { 
            ...p, 
            collaborators: p.collaborators.map(c => 
              c.creatorId === creatorId ? { ...c, hasApproved: true } : c
            )
          }
        : p
    )
  })),
  postCollaboration: (postId, creatorId, postId2) => set((state) => ({
    posts: state.posts.map(p => 
      p.id === postId 
        ? { 
            ...p, 
            collaborators: p.collaborators.map(c => 
              c.creatorId === creatorId 
                ? { ...c, hasApproved: true, postedAt: new Date().toISOString() } 
                : c
            ),
            individualPosts: p.individualPosts.map(ip => 
              ip.creatorId === creatorId 
                ? { ...ip, isPosted: true, postId: postId2 }
                : ip
            )
          }
        : p
    )
  })),
  getPendingCollaborations: (creatorId) => get().posts.filter(p => 
    p.collaborators.some(c => c.creatorId === creatorId && !c.hasApproved)
  ),
  getCreatorCollaborations: (creatorId) => get().posts.filter(p => 
    p.primaryCreatorId === creatorId || p.collaborators.some(c => c.creatorId === creatorId)
  ),
}));

// ==================== LIVE STREAMING STORE ====================
interface LiveStreamingStore {
  streams: LiveStream[];
  activeStream: LiveStream | null;
  isLive: boolean;
  gifts: TipGift[];
  startStream: (stream: LiveStream) => void;
  endStream: () => void;
  addTip: (streamId: string, tip: Tip) => void;
  addComment: (streamId: string, comment: LiveStream['comments'][0]) => void;
  updateViewers: (streamId: string, count: number) => void;
  scheduleStream: (stream: LiveStream) => void;
  getCreatorStreams: (creatorId: string) => LiveStream[];
  getUpcomingStreams: () => LiveStream[];
  getLiveStreams: () => LiveStream[];
}

export const useLiveStreamingStore = create<LiveStreamingStore>()((set, get) => ({
  streams: liveStreams,
  activeStream: null,
  isLive: false,
  gifts: tipGifts,
  startStream: (stream) => set({ 
    activeStream: { ...stream, status: 'live', startedAt: new Date().toISOString() },
    isLive: true 
  }),
  endStream: () => set((state) => {
    if (state.activeStream) {
      return {
        streams: state.streams.map(s => 
          s.id === state.activeStream?.id 
            ? { ...s, status: 'ended', endedAt: new Date().toISOString() }
            : s
        ),
        activeStream: null,
        isLive: false
      };
    }
    return state;
  }),
  addTip: (streamId, tip) => set((state) => ({
    streams: state.streams.map(s => 
      s.id === streamId 
        ? { ...s, tips: [...s.tips, tip], totalTips: s.totalTips + tip.amount }
        : s
    ),
    activeStream: state.activeStream?.id === streamId
      ? { 
          ...state.activeStream, 
          tips: [...state.activeStream.tips, tip],
          totalTips: state.activeStream.totalTips + tip.amount
        }
      : state.activeStream
  })),
  addComment: (streamId, comment) => set((state) => ({
    activeStream: state.activeStream?.id === streamId
      ? { ...state.activeStream, comments: [...state.activeStream.comments, comment] }
      : state.activeStream
  })),
  updateViewers: (streamId, count) => set((state) => ({
    activeStream: state.activeStream?.id === streamId
      ? { 
          ...state.activeStream, 
          viewers: count,
          peakViewers: Math.max(state.activeStream.peakViewers, count)
        }
      : state.activeStream
  })),
  scheduleStream: (stream) => set((state) => ({ 
    streams: [...state.streams, stream] 
  })),
  getCreatorStreams: (creatorId) => get().streams.filter(s => s.creatorId === creatorId),
  getUpcomingStreams: () => get().streams.filter(s => s.status === 'scheduled'),
  getLiveStreams: () => get().streams.filter(s => s.status === 'live'),
}));
