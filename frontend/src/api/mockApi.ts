import type { 
  User, 
  Song, 
  Artist, 
  Album, 
  Playlist, 
  SearchResult, 
  ApiResponse,
  PaginatedResponse 
} from '@/types';
import { 
  currentUser, 
  artists, 
  songs, 
  albums, 
  playlists,
  searchCategories,
  trendingData,
  newReleases,
  recentlyPlayed 
} from '@/data/mockData';

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Auth API
export const authApi = {
  login: async (email: string, password: string): Promise<ApiResponse<User>> => {
    await delay(800);
    if (email && password.length >= 6) {
      return {
        data: currentUser,
        success: true,
        message: 'Login successful',
      };
    }
    throw new Error('Invalid credentials');
  },

  register: async (name: string, email: string, password: string): Promise<ApiResponse<User>> => {
    await delay(1000);
    if (name && email && password.length >= 6) {
      return {
        data: { ...currentUser, name, email },
        success: true,
        message: 'Registration successful',
      };
    }
    throw new Error('Invalid registration data');
  },

  logout: async (): Promise<ApiResponse<null>> => {
    await delay(500);
    return {
      data: null,
      success: true,
      message: 'Logout successful',
    };
  },

  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    await delay(300);
    return {
      data: currentUser,
      success: true,
    };
  },

  updateProfile: async (updates: Partial<User>): Promise<ApiResponse<User>> => {
    await delay(600);
    return {
      data: { ...currentUser, ...updates },
      success: true,
      message: 'Profile updated',
    };
  },
};

// Music API
export const musicApi = {
  // Songs
  getSongs: async (page = 1, limit = 20): Promise<PaginatedResponse<Song>> => {
    await delay(400);
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      data: songs.slice(start, end),
      total: songs.length,
      page,
      limit,
      hasMore: end < songs.length,
    };
  },

  getSongById: async (id: string): Promise<ApiResponse<Song>> => {
    await delay(300);
    const song = songs.find(s => s.id === id);
    if (song) {
      return { data: song, success: true };
    }
    throw new Error('Song not found');
  },

  getSongsByGenre: async (genre: string): Promise<ApiResponse<Song[]>> => {
    await delay(400);
    const filtered = songs.filter(s => 
      s.genre.toLowerCase() === genre.toLowerCase()
    );
    return { data: filtered, success: true };
  },

  // Artists
  getArtists: async (page = 1, limit = 20): Promise<PaginatedResponse<Artist>> => {
    await delay(400);
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      data: artists.slice(start, end),
      total: artists.length,
      page,
      limit,
      hasMore: end < artists.length,
    };
  },

  getArtistById: async (id: string): Promise<ApiResponse<Artist>> => {
    await delay(300);
    const artist = artists.find(a => a.id === id);
    if (artist) {
      return { data: artist, success: true };
    }
    throw new Error('Artist not found');
  },

  getArtistSongs: async (artistId: string): Promise<ApiResponse<Song[]>> => {
    await delay(400);
    const artistSongs = songs.filter(s => s.artistId === artistId);
    return { data: artistSongs, success: true };
  },

  followArtist: async (artistId: string): Promise<ApiResponse<Artist>> => {
    await delay(500);
    const artist = artists.find(a => a.id === artistId);
    if (artist) {
      return { 
        data: { ...artist, followers: artist.followers + 1 }, 
        success: true 
      };
    }
    throw new Error('Artist not found');
  },

  // Albums
  getAlbums: async (page = 1, limit = 20): Promise<PaginatedResponse<Album>> => {
    await delay(400);
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      data: albums.slice(start, end),
      total: albums.length,
      page,
      limit,
      hasMore: end < albums.length,
    };
  },

  getAlbumById: async (id: string): Promise<ApiResponse<Album>> => {
    await delay(300);
    const album = albums.find(a => a.id === id);
    if (album) {
      return { data: album, success: true };
    }
    throw new Error('Album not found');
  },

  // Playlists
  getPlaylists: async (page = 1, limit = 20): Promise<PaginatedResponse<Playlist>> => {
    await delay(400);
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      data: playlists.slice(start, end),
      total: playlists.length,
      page,
      limit,
      hasMore: end < playlists.length,
    };
  },

  getPlaylistById: async (id: string): Promise<ApiResponse<Playlist>> => {
    await delay(300);
    const playlist = playlists.find(p => p.id === id);
    if (playlist) {
      return { data: playlist, success: true };
    }
    throw new Error('Playlist not found');
  },

  createPlaylist: async (name: string, description?: string): Promise<ApiResponse<Playlist>> => {
    await delay(600);
    const newPlaylist: Playlist = {
      id: `playlist-${Date.now()}`,
      name,
      description: description || '',
      cover: '/playlist-1.jpg',
      owner: currentUser.name,
      ownerId: currentUser.id,
      songs: [],
      isPublic: false,
      createdAt: new Date().toISOString(),
      totalDuration: 0,
    };
    return { data: newPlaylist, success: true, message: 'Playlist created' };
  },

  addToPlaylist: async (playlistId: string, songId: string): Promise<ApiResponse<Playlist>> => {
    await delay(400);
    const playlist = playlists.find(p => p.id === playlistId);
    const song = songs.find(s => s.id === songId);
    if (playlist && song) {
      return {
        data: { ...playlist, songs: [...playlist.songs, song] },
        success: true,
        message: 'Song added to playlist',
      };
    }
    throw new Error('Playlist or song not found');
  },

  removeFromPlaylist: async (playlistId: string, songId: string): Promise<ApiResponse<Playlist>> => {
    await delay(400);
    const playlist = playlists.find(p => p.id === playlistId);
    if (playlist) {
      return {
        data: { 
          ...playlist, 
          songs: playlist.songs.filter(s => s.id !== songId) 
        },
        success: true,
        message: 'Song removed from playlist',
      };
    }
    throw new Error('Playlist not found');
  },

  // Search
  search: async (query: string): Promise<ApiResponse<SearchResult>> => {
    await delay(500);
    const lowerQuery = query.toLowerCase();
    
    const result: SearchResult = {
      songs: songs.filter(s => 
        s.title.toLowerCase().includes(lowerQuery) ||
        s.artist.toLowerCase().includes(lowerQuery)
      ),
      artists: artists.filter(a => 
        a.name.toLowerCase().includes(lowerQuery)
      ),
      albums: albums.filter(a => 
        a.title.toLowerCase().includes(lowerQuery) ||
        a.artist.toLowerCase().includes(lowerQuery)
      ),
      playlists: playlists.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
      ),
    };
    
    return { data: result, success: true };
  },

  getSearchCategories: async () => {
    await delay(200);
    return { data: searchCategories, success: true };
  },

  // Home Data
  getHomeData: async () => {
    await delay(600);
    return {
      data: {
        greeting: getGreeting(),
        trending: trendingData,
        newReleases,
        recentlyPlayed,
        recommendedPlaylists: playlists.slice(0, 4),
        featuredArtists: artists.slice(0, 4),
      },
      success: true,
    };
  },

  // Library Data
  getLibraryData: async (userId: string) => {
    await delay(500);
    return {
      data: {
        playlists: playlists.filter(p => p.ownerId === userId || p.ownerId === 'system'),
        likedSongs: songs.slice(0, 10),
        downloadedSongs: songs.slice(2, 5),
        followedArtists: artists.slice(0, 3),
      },
      success: true,
    };
  },
};

// Helper function for greeting
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

// Export all APIs
export const mockApi = {
  auth: authApi,
  music: musicApi,
};

export default mockApi;
