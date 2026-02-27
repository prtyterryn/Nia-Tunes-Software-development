import { useState, useEffect } from 'react';
import { Plus, Download, Heart, Grid3X3, List } from 'lucide-react';
import { PlaylistCard, ArtistCard, SongCard, AlbumCard } from '@/components';
import { mockApi } from '@/api/mockApi';
import { useAuthStore, usePlayerStore } from '@/store/useStore';
import type { LibraryFilter, Playlist, Artist, Song, Album } from '@/types';

export function LibraryScreen() {
  const { user } = useAuthStore();
  const { playPlaylist } = usePlayerStore();
  const [activeFilter, setActiveFilter] = useState<LibraryFilter>('playlists');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const filters: { id: LibraryFilter; label: string; count?: number }[] = [
    { id: 'playlists', label: 'Playlists', count: playlists.length },
    { id: 'artists', label: 'Artists', count: artists.length },
    { id: 'albums', label: 'Albums', count: albums.length },
    { id: 'downloads', label: 'Downloads', count: songs.length },
  ];

  useEffect(() => {
    loadLibraryData();
  }, []);

  const loadLibraryData = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const response = await mockApi.music.getLibraryData(user.id);
      if (response.success) {
        setPlaylists(response.data.playlists);
        setArtists(response.data.followedArtists);
        setSongs(response.data.likedSongs);
        setAlbums([]);
      }
    } catch (error) {
      console.error('Failed to load library data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePlaylist = async () => {
    try {
      const response = await mockApi.music.createPlaylist(
        `My Playlist #${playlists.length + 1}`,
        'New playlist'
      );
      if (response.success) {
        setPlaylists(prev => [response.data, ...prev]);
      }
    } catch (error) {
      console.error('Failed to create playlist:', error);
    }
  };

  const handlePlayPlaylist = (playlist: Playlist) => {
    if (playlist.songs.length > 0) {
      playPlaylist(playlist.songs);
    }
  };

  const renderContent = () => {
    switch (activeFilter) {
      case 'playlists':
        return (
          <div className="space-y-3">
            {/* Liked Songs Card */}
            <div 
              onClick={() => songs.length > 0 && playPlaylist(songs)}
              className="group relative p-4 rounded-2xl overflow-hidden cursor-pointer card-hover"
              style={{ 
                background: 'linear-gradient(135deg, #D32F2F 0%, #388E3C 100%)' 
              }}
            >
              <div className="relative z-10">
                <Heart className="w-8 h-8 text-white mb-3 fill-white" />
                <h4 className="text-white font-bold text-lg">Liked Songs</h4>
                <p className="text-white/80 text-sm">{songs.length} songs</p>
              </div>
            </div>

            {/* User Playlists */}
            {playlists.filter(p => p.name !== 'Liked Songs').map((playlist) => (
              <PlaylistCard 
                key={playlist.id} 
                playlist={playlist}
                variant="compact"
                onPlay={() => handlePlayPlaylist(playlist)}
              />
            ))}
          </div>
        );

      case 'artists':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {artists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        );

      case 'albums':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {albums.length > 0 ? (
              albums.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="w-16 h-16 bg-nia-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-nia-gray-400" />
                </div>
                <h3 className="text-white text-lg font-medium mb-2">No albums yet</h3>
                <p className="text-nia-gray-400 text-sm">
                  Albums you save will appear here
                </p>
              </div>
            )}
          </div>
        );

      case 'downloads':
        return (
          <div className="space-y-2">
            {songs.length > 0 ? (
              songs.map((song, index) => (
                <SongCard 
                  key={song.id} 
                  song={song} 
                  variant="row"
                  index={index}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-nia-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-nia-gray-400" />
                </div>
                <h3 className="text-white text-lg font-medium mb-2">No downloads yet</h3>
                <p className="text-nia-gray-400 text-sm">
                  Download songs to listen offline
                </p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-nia-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-nia-red border-t-transparent rounded-full animate-spin" />
          <p className="text-nia-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nia-black pb-32">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-nia-black/95 backdrop-blur-md border-b border-nia-gray-800">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-white text-2xl font-bold">Your Library</h1>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleCreatePlaylist}
                className="w-10 h-10 glass-btn flex items-center justify-center"
              >
                <Plus className="w-5 h-5 text-white" />
              </button>
              <button 
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="w-10 h-10 glass-btn flex items-center justify-center"
              >
                {viewMode === 'grid' ? (
                  <List className="w-5 h-5 text-white" />
                ) : (
                  <Grid3X3 className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto scroll-hide pb-2 -mx-4 px-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeFilter === filter.id
                    ? 'bg-nia-red text-white'
                    : 'bg-nia-gray-800 text-nia-gray-400 hover:bg-nia-gray-700 hover:text-white'
                }`}
              >
                <span>{filter.label}</span>
                {filter.count !== undefined && filter.count > 0 && (
                  <span className={`text-xs ${
                    activeFilter === filter.id ? 'text-white/80' : 'text-nia-gray-500'
                  }`}>
                    {filter.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-6">
        {renderContent()}
      </div>
    </div>
  );
}

export default LibraryScreen;
