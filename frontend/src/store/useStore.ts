import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Song, Artist, Playlist, PlayerState, TabType } from '@/types';
import { mockApi } from '@/api/mockApi';

// Auth Store
interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await mockApi.auth.login(email, password);
          set({ 
            user: response.data, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Login failed', 
            isLoading: false 
          });
        }
      },

      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await mockApi.auth.register(name, email, password);
          set({ 
            user: response.data, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Registration failed', 
            isLoading: false 
          });
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await mockApi.auth.logout();
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false 
          });
        } catch (error) {
          set({ isLoading: false });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);

// Player Store
interface PlayerStore extends PlayerState {
  play: (song: Song) => void;
  pause: () => void;
  togglePlay: () => void;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  addToQueue: (song: Song) => void;
  removeFromQueue: (songId: string) => void;
  clearQueue: () => void;
  playPlaylist: (songs: Song[], startIndex?: number) => void;
  updateCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
}

export const usePlayerStore = create<PlayerStore>()((set, get) => ({
  currentSong: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.8,
  isShuffle: false,
  repeatMode: 'none',
  queue: [],
  history: [],

  play: (song) => {
    const { currentSong, history } = get();
    if (currentSong) {
      set({ history: [...history, currentSong] });
    }
    set({ 
      currentSong: song, 
      isPlaying: true, 
      currentTime: 0,
      duration: song.duration 
    });
  },

  pause: () => set({ isPlaying: false }),

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

  next: () => {
    const { queue, currentSong, history, isShuffle } = get();
    if (queue.length === 0) return;
    
    let nextSong: Song;
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * queue.length);
      nextSong = queue[randomIndex];
    } else {
      nextSong = queue[0];
    }
    
    if (currentSong) {
      set({ history: [...history, currentSong] });
    }
    set({ 
      currentSong: nextSong, 
      isPlaying: true, 
      currentTime: 0,
      duration: nextSong.duration,
      queue: queue.filter(s => s.id !== nextSong.id)
    });
  },

  previous: () => {
    const { history, currentSong, queue } = get();
    if (history.length === 0) return;
    
    const previousSong = history[history.length - 1];
    if (currentSong) {
      set({ queue: [currentSong, ...queue] });
    }
    set({ 
      currentSong: previousSong, 
      isPlaying: true, 
      currentTime: 0,
      duration: previousSong.duration,
      history: history.slice(0, -1)
    });
  },

  seek: (time) => set({ currentTime: time }),

  setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),

  toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),

  toggleRepeat: () => set((state) => ({ 
    repeatMode: state.repeatMode === 'none' ? 'all' : state.repeatMode === 'all' ? 'one' : 'none'
  })),

  addToQueue: (song) => set((state) => ({ 
    queue: [...state.queue, song] 
  })),

  removeFromQueue: (songId) => set((state) => ({ 
    queue: state.queue.filter(s => s.id !== songId) 
  })),

  clearQueue: () => set({ queue: [] }),

  playPlaylist: (songs, startIndex = 0) => {
    const startSong = songs[startIndex];
    const remainingSongs = songs.filter((_, i) => i !== startIndex);
    set({ 
      currentSong: startSong, 
      isPlaying: true, 
      currentTime: 0,
      duration: startSong.duration,
      queue: remainingSongs,
      history: []
    });
  },

  updateCurrentTime: (time) => set({ currentTime: time }),

  setDuration: (duration) => set({ duration }),
}));

// Navigation Store
interface NavigationStore {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isPlayerExpanded: boolean;
  setPlayerExpanded: (expanded: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useNavigationStore = create<NavigationStore>()((set) => ({
  activeTab: 'home',
  setActiveTab: (tab) => set({ activeTab: tab }),
  isPlayerExpanded: false,
  setPlayerExpanded: (expanded) => set({ isPlayerExpanded: expanded }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

// Music Data Store
interface MusicStore {
  songs: Song[];
  artists: Artist[];
  playlists: Playlist[];
  isLoading: boolean;
  error: string | null;
  fetchSongs: () => Promise<void>;
  fetchArtists: () => Promise<void>;
  fetchPlaylists: () => Promise<void>;
  searchMusic: (query: string) => Promise<{ songs: Song[]; artists: Artist[]; playlists: Playlist[] }>;
}

export const useMusicStore = create<MusicStore>()((set) => ({
  songs: [],
  artists: [],
  playlists: [],
  isLoading: false,
  error: null,

  fetchSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await mockApi.music.getSongs();
      set({ songs: response.data, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch songs', 
        isLoading: false 
      });
    }
  },

  fetchArtists: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await mockApi.music.getArtists();
      set({ artists: response.data, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch artists', 
        isLoading: false 
      });
    }
  },

  fetchPlaylists: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await mockApi.music.getPlaylists();
      set({ playlists: response.data, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch playlists', 
        isLoading: false 
      });
    }
  },

  searchMusic: async (query) => {
    try {
      const response = await mockApi.music.search(query);
      return response.data;
    } catch (error) {
      return { songs: [], artists: [], playlists: [] };
    }
  },
}));
