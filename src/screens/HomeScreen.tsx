import { useEffect, useState } from 'react';
import { Bell, Settings, TrendingUp } from 'lucide-react';
import { PlaylistCard, ArtistCard, SongCard } from '@/components';
import { mockApi } from '@/api/mockApi';
import { usePlayerStore } from '@/store/useStore';
import type { Playlist, Artist, Song } from '@/types';
import { getGreeting } from '@/data/mockData';

export function HomeScreen() {
  const [greeting, setGreeting] = useState('');
  const [trending, setTrending] = useState<any>(null);
  const [newReleases, setNewReleases] = useState<Song[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Song[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { playPlaylist } = usePlayerStore();

  useEffect(() => {
    setGreeting(getGreeting());
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      const response = await mockApi.music.getHomeData();
      if (response.success) {
        setTrending(response.data.trending);
        setNewReleases(response.data.newReleases);
        setRecentlyPlayed(response.data.recentlyPlayed);
        setPlaylists(response.data.recommendedPlaylists);
        setArtists(response.data.featuredArtists);
      }
    } catch (error) {
      console.error('Failed to load home data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayPlaylist = (playlist: Playlist) => {
    if (playlist.songs.length > 0) {
      playPlaylist(playlist.songs);
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
        <div className="flex items-center justify-between p-4">
          <div>
            <p className="text-nia-gray-400 text-sm">{greeting}</p>
            <h1 className="text-white text-xl font-bold">Alex</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 glass-btn flex items-center justify-center relative">
              <Bell className="w-5 h-5 text-white" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-nia-red rounded-full" />
            </button>
            <button className="w-10 h-10 glass-btn flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 space-y-8">
        {/* Trending Hero */}
        {trending && (
          <section className="relative rounded-3xl overflow-hidden">
            <div className="aspect-[16/10]">
              <img 
                src={trending.image} 
                alt={trending.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-nia-black via-nia-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-nia-red" />
                <span className="text-nia-red text-xs font-semibold uppercase tracking-wider">
                  {trending.title}
                </span>
              </div>
              <h2 className="text-white text-2xl font-bold mb-2">{trending.subtitle}</h2>
              <p className="text-nia-gray-400 text-sm mb-4">
                Discover the hottest tracks trending across Kenya this week
              </p>
              <button 
                onClick={() => trending.songs.length > 0 && playPlaylist(trending.songs)}
                className="btn-primary text-sm"
              >
                Play Now
              </button>
            </div>
          </section>
        )}

        {/* Recently Played */}
        {recentlyPlayed.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg font-bold">Recently Played</h3>
              <button className="text-nia-red text-sm font-medium hover:underline">
                See All
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {recentlyPlayed.slice(0, 4).map((song) => (
                <SongCard 
                  key={song.id} 
                  song={song} 
                  variant="compact"
                />
              ))}
            </div>
          </section>
        )}

        {/* Recommended Playlists */}
        {playlists.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg font-bold">Made For You</h3>
              <button className="text-nia-red text-sm font-medium hover:underline">
                See All
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {playlists.slice(0, 4).map((playlist) => (
                <PlaylistCard 
                  key={playlist.id} 
                  playlist={playlist}
                  onPlay={() => handlePlayPlaylist(playlist)}
                />
              ))}
            </div>
          </section>
        )}

        {/* New Releases */}
        {newReleases.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg font-bold">New Releases</h3>
              <button className="text-nia-red text-sm font-medium hover:underline">
                See All
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto scroll-hide pb-2 -mx-4 px-4">
              {newReleases.map((song) => (
                <div key={song.id} className="flex-shrink-0 w-40">
                  <SongCard song={song} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Featured Artists */}
        {artists.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg font-bold">Featured Artists</h3>
              <button className="text-nia-red text-sm font-medium hover:underline">
                See All
              </button>
            </div>
            <div className="flex gap-6 overflow-x-auto scroll-hide pb-2 -mx-4 px-4">
              {artists.map((artist) => (
                <div key={artist.id} className="flex-shrink-0 w-32">
                  <ArtistCard artist={artist} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Your Playlists */}
        {playlists.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg font-bold">Your Playlists</h3>
              <button className="text-nia-red text-sm font-medium hover:underline">
                See All
              </button>
            </div>
            <div className="space-y-2">
              {playlists.slice(0, 3).map((playlist) => (
                <PlaylistCard 
                  key={playlist.id} 
                  playlist={playlist}
                  variant="compact"
                  onPlay={() => handlePlayPlaylist(playlist)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
