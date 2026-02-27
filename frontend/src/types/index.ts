// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  isPremium: boolean;
  followers: number;
  following: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Music Types
export interface Song {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  album: string;
  albumId: string;
  cover: string;
  duration: number;
  url: string;
  genre: string;
  releaseDate: string;
  plays: number;
}

export interface Artist {
  id: string;
  name: string;
  avatar: string;
  headerImage: string;
  bio: string;
  followers: number;
  monthlyListeners: number;
  genres: string[];
  isVerified: boolean;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  cover: string;
  releaseDate: string;
  songs: Song[];
  totalDuration: number;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  cover: string;
  owner: string;
  ownerId: string;
  songs: Song[];
  isPublic: boolean;
  createdAt: string;
  totalDuration: number;
}

// Player Types
export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isShuffle: boolean;
  repeatMode: 'none' | 'all' | 'one';
  queue: Song[];
  history: Song[];
}

// Navigation Types
export type TabType = 'home' | 'search' | 'library' | 'profile';

// Search Types
export interface SearchResult {
  songs: Song[];
  artists: Artist[];
  albums: Album[];
  playlists: Playlist[];
}

export interface SearchCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
}

// Library Types
export type LibraryFilter = 'playlists' | 'artists' | 'albums' | 'downloads';

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Re-export creator types
export * from './creator';

// Re-export social types
export * from './social';
