import type { Song, Artist, Album, Playlist, User, SearchCategory } from '@/types';

// Current User
export const currentUser: User = {
  id: 'user-1',
  email: 'user@niatunes.com',
  name: 'Alex Kimani',
  avatar: '/artist-avatar.jpg',
  isPremium: true,
  followers: 234,
  following: 156,
};

// Artists
export const artists: Artist[] = [
  {
    id: 'artist-1',
    name: 'Zahara',
    avatar: '/artist-1.jpg',
    headerImage: '/artist-header.jpg',
    bio: 'Award-winning Afro-pop sensation from Nairobi',
    followers: 2500000,
    monthlyListeners: 850000,
    genres: ['Afrobeat', 'Pop'],
    isVerified: true,
  },
  {
    id: 'artist-2',
    name: 'King Kaka',
    avatar: '/artist-2.jpg',
    headerImage: '/artist-header.jpg',
    bio: 'Rapper, songwriter, and entrepreneur',
    followers: 1800000,
    monthlyListeners: 620000,
    genres: ['Hip Hop', 'Gengetone'],
    isVerified: true,
  },
  {
    id: 'artist-3',
    name: 'Mercy Masika',
    avatar: '/artist-3.jpg',
    headerImage: '/artist-header.jpg',
    bio: 'Gospel artist spreading hope through music',
    followers: 1200000,
    monthlyListeners: 450000,
    genres: ['Gospel', 'Worship'],
    isVerified: true,
  },
  {
    id: 'artist-4',
    name: 'Sauti Sol',
    avatar: '/artist-4.jpg',
    headerImage: '/artist-header.jpg',
    bio: 'East African Afro-pop band',
    followers: 3200000,
    monthlyListeners: 1200000,
    genres: ['Afrobeat', 'Pop', 'R&B'],
    isVerified: true,
  },
];

// Songs
export const songs: Song[] = [
  {
    id: 'song-1',
    title: 'Nakupenda',
    artist: 'Zahara',
    artistId: 'artist-1',
    album: 'Echoes of Tomorrow',
    albumId: 'album-1',
    cover: '/album-2.jpg',
    duration: 214,
    url: '/audio/song1.mp3',
    genre: 'Afrobeat',
    releaseDate: '2024-01-15',
    plays: 5200000,
  },
  {
    id: 'song-2',
    title: 'Dundaing',
    artist: 'King Kaka',
    artistId: 'artist-2',
    album: 'Eastlando Royalty',
    albumId: 'album-2',
    cover: '/album-1.jpg',
    duration: 198,
    url: '/audio/song2.mp3',
    genre: 'Hip Hop',
    releaseDate: '2024-02-20',
    plays: 3800000,
  },
  {
    id: 'song-3',
    title: 'Mwema',
    artist: 'Mercy Masika',
    artistId: 'artist-3',
    album: 'Healed',
    albumId: 'album-3',
    cover: '/album-3.jpg',
    duration: 245,
    url: '/audio/song3.mp3',
    genre: 'Gospel',
    releaseDate: '2024-01-10',
    plays: 2100000,
  },
  {
    id: 'song-4',
    title: 'Suzanna',
    artist: 'Sauti Sol',
    artistId: 'artist-4',
    album: 'Midnight Train',
    albumId: 'album-4',
    cover: '/album-1.jpg',
    duration: 201,
    url: '/audio/song4.mp3',
    genre: 'Afrobeat',
    releaseDate: '2024-03-05',
    plays: 6700000,
  },
  {
    id: 'song-5',
    title: 'Kuliko Jana',
    artist: 'Sauti Sol',
    artistId: 'artist-4',
    album: 'Live and Die in Afrika',
    albumId: 'album-5',
    cover: '/album-2.jpg',
    duration: 268,
    url: '/audio/song5.mp3',
    genre: 'Afrobeat',
    releaseDate: '2024-02-14',
    plays: 4500000,
  },
  {
    id: 'song-6',
    title: 'Lala Salama',
    artist: 'Zahara',
    artistId: 'artist-1',
    album: 'Echoes of Tomorrow',
    albumId: 'album-1',
    cover: '/album-2.jpg',
    duration: 192,
    url: '/audio/song6.mp3',
    genre: 'Afrobeat',
    releaseDate: '2024-01-20',
    plays: 3200000,
  },
  {
    id: 'song-7',
    title: 'Mungu Pekee',
    artist: 'Mercy Masika',
    artistId: 'artist-3',
    album: 'Healed',
    albumId: 'album-3',
    cover: '/album-3.jpg',
    duration: 276,
    url: '/audio/song7.mp3',
    genre: 'Gospel',
    releaseDate: '2024-03-01',
    plays: 1800000,
  },
  {
    id: 'song-8',
    title: 'Wajinga Nyinyi',
    artist: 'King Kaka',
    artistId: 'artist-2',
    album: 'Eastlando Royalty',
    albumId: 'album-2',
    cover: '/album-1.jpg',
    duration: 223,
    url: '/audio/song8.mp3',
    genre: 'Hip Hop',
    releaseDate: '2024-02-28',
    plays: 4100000,
  },
];

// Albums
export const albums: Album[] = [
  {
    id: 'album-1',
    title: 'Echoes of Tomorrow',
    artist: 'Zahara',
    artistId: 'artist-1',
    cover: '/album-2.jpg',
    releaseDate: '2024-01-15',
    songs: songs.filter(s => s.albumId === 'album-1'),
    totalDuration: 406,
  },
  {
    id: 'album-2',
    title: 'Eastlando Royalty',
    artist: 'King Kaka',
    artistId: 'artist-2',
    cover: '/album-1.jpg',
    releaseDate: '2024-02-20',
    songs: songs.filter(s => s.albumId === 'album-2'),
    totalDuration: 421,
  },
  {
    id: 'album-3',
    title: 'Healed',
    artist: 'Mercy Masika',
    artistId: 'artist-3',
    cover: '/album-3.jpg',
    releaseDate: '2024-01-10',
    songs: songs.filter(s => s.albumId === 'album-3'),
    totalDuration: 521,
  },
  {
    id: 'album-4',
    title: 'Midnight Train',
    artist: 'Sauti Sol',
    artistId: 'artist-4',
    cover: '/album-1.jpg',
    releaseDate: '2024-03-05',
    songs: [songs.find(s => s.id === 'song-4')!],
    totalDuration: 201,
  },
  {
    id: 'album-5',
    title: 'Live and Die in Afrika',
    artist: 'Sauti Sol',
    artistId: 'artist-4',
    cover: '/album-2.jpg',
    releaseDate: '2024-02-14',
    songs: [songs.find(s => s.id === 'song-5')!],
    totalDuration: 268,
  },
];

// Playlists
export const playlists: Playlist[] = [
  {
    id: 'playlist-1',
    name: 'Daily Mix 1',
    description: 'Made for you based on your listening history',
    cover: '/playlist-1.jpg',
    owner: 'NiaTunes',
    ownerId: 'system',
    songs: songs.slice(0, 4),
    isPublic: true,
    createdAt: '2024-03-01',
    totalDuration: 815,
  },
  {
    id: 'playlist-2',
    name: 'Afrobeat Hits',
    description: 'The hottest Afrobeat tracks right now',
    cover: '/playlist-2.jpg',
    owner: 'NiaTunes',
    ownerId: 'system',
    songs: songs.filter(s => s.genre === 'Afrobeat'),
    isPublic: true,
    createdAt: '2024-02-15',
    totalDuration: 875,
  },
  {
    id: 'playlist-3',
    name: 'Kenyan Vibes',
    description: 'Best of Kenyan music',
    cover: '/playlist-3.jpg',
    owner: 'NiaTunes',
    ownerId: 'system',
    songs: songs.slice(2, 6),
    isPublic: true,
    createdAt: '2024-01-20',
    totalDuration: 932,
  },
  {
    id: 'playlist-4',
    name: 'Gospel Favorites',
    description: 'Uplifting gospel music',
    cover: '/playlist-4.jpg',
    owner: 'NiaTunes',
    ownerId: 'system',
    songs: songs.filter(s => s.genre === 'Gospel'),
    isPublic: true,
    createdAt: '2024-03-10',
    totalDuration: 521,
  },
  {
    id: 'playlist-5',
    name: 'Liked Songs',
    description: 'Your favorite tracks',
    cover: '/album-art.jpg',
    owner: currentUser.name,
    ownerId: currentUser.id,
    songs: songs.slice(0, 5),
    isPublic: false,
    createdAt: '2024-01-01',
    totalDuration: 1100,
  },
];

// Search Categories
export const searchCategories: SearchCategory[] = [
  { id: 'afrobeat', name: 'Afrobeat', color: '#D32F2F', icon: 'music' },
  { id: 'gengetone', name: 'Gengetone', color: '#388E3C', icon: 'mic' },
  { id: 'gospel', name: 'Gospel', color: '#FFFFFF', icon: 'heart' },
  { id: 'benga', name: 'Benga', color: '#D32F2F', icon: 'guitar' },
  { id: 'hiphop', name: 'Hip Hop', color: '#616161', icon: 'mic-2' },
  { id: 'randb', name: 'R&B', color: '#388E3C', icon: 'music-2' },
  { id: 'reggae', name: 'Reggae', color: '#D32F2F', icon: 'sun' },
  { id: 'pop', name: 'Pop', color: '#FFFFFF', icon: 'star' },
];

// Trending Data
export const trendingData = {
  title: 'Trending in Kenya',
  subtitle: 'This Week\'s Hot Tracks',
  image: '/trending-hero.jpg',
  songs: songs.slice(0, 5),
};

// New Releases
export const newReleases = songs.slice(0, 6);

// Recently Played
export const recentlyPlayed = songs.slice(2, 6);

// Helper Functions
export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};
