import { useState, useEffect } from 'react';
import { Search, X, Music, Mic, Heart, Guitar, Mic2, Star, Sun } from 'lucide-react';
import { SongCard, ArtistCard, PlaylistCard, AlbumCard } from '@/components';
import { mockApi } from '@/api/mockApi';
import { useNavigationStore } from '@/store/useStore';
import type { SearchCategory, Song, Artist, Playlist, Album } from '@/types';

const categoryIcons: Record<string, React.ElementType> = {
  music: Music,
  mic: Mic,
  heart: Heart,
  guitar: Guitar,
  'mic-2': Mic2,
  star: Star,
  sun: Sun,
};

export function SearchScreen() {
  const { searchQuery, setSearchQuery } = useNavigationStore();
  const [categories, setCategories] = useState<SearchCategory[]>([]);
  const [searchResults, setSearchResults] = useState<{
    songs: Song[];
    artists: Artist[];
    playlists: Playlist[];
    albums: Album[];
  } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Afrobeat', 'Sauti Sol', 'Gospel', 'King Kaka'
  ]);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchQuery.trim()) {
        performSearch(searchQuery);
      } else {
        setSearchResults(null);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const loadCategories = async () => {
    try {
      const response = await mockApi.music.getSearchCategories();
      if (response.success) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const performSearch = async (query: string) => {
    setIsSearching(true);
    try {
      const response = await mockApi.music.search(query);
      if (response.success) {
        setSearchResults(response.data);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    setSearchQuery(categoryName);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults(null);
  };

  const removeRecentSearch = (search: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches(prev => prev.filter(s => s !== search));
  };

  return (
    <div className="min-h-screen bg-nia-black pb-32">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-nia-black/95 backdrop-blur-md border-b border-nia-gray-800">
        <div className="p-4">
          <h1 className="text-white text-2xl font-bold mb-4">Search</h1>
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nia-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search artists, songs, albums..."
              className="w-full input-field pl-12 pr-10"
            />
            {searchQuery && (
              <button 
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <X className="w-5 h-5 text-nia-gray-400 hover:text-white" />
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="px-4 py-6">
        {/* Search Results */}
        {searchResults ? (
          <div className="space-y-6">
            {/* Songs */}
            {searchResults.songs.length > 0 && (
              <section>
                <h3 className="text-white text-lg font-bold mb-4">Songs</h3>
                <div className="space-y-2">
                  {searchResults.songs.slice(0, 5).map((song, index) => (
                    <SongCard 
                      key={song.id} 
                      song={song} 
                      variant="row"
                      index={index}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Artists */}
            {searchResults.artists.length > 0 && (
              <section>
                <h3 className="text-white text-lg font-bold mb-4">Artists</h3>
                <div className="flex gap-4 overflow-x-auto scroll-hide pb-2 -mx-4 px-4">
                  {searchResults.artists.map((artist) => (
                    <div key={artist.id} className="flex-shrink-0 w-28">
                      <ArtistCard artist={artist} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Playlists */}
            {searchResults.playlists.length > 0 && (
              <section>
                <h3 className="text-white text-lg font-bold mb-4">Playlists</h3>
                <div className="grid grid-cols-2 gap-4">
                  {searchResults.playlists.slice(0, 4).map((playlist) => (
                    <PlaylistCard key={playlist.id} playlist={playlist} />
                  ))}
                </div>
              </section>
            )}

            {/* Albums */}
            {searchResults.albums.length > 0 && (
              <section>
                <h3 className="text-white text-lg font-bold mb-4">Albums</h3>
                <div className="flex gap-4 overflow-x-auto scroll-hide pb-2 -mx-4 px-4">
                  {searchResults.albums.map((album) => (
                    <div key={album.id} className="flex-shrink-0 w-36">
                      <AlbumCard album={album} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* No Results */}
            {!searchResults.songs.length && 
             !searchResults.artists.length && 
             !searchResults.playlists.length && 
             !searchResults.albums.length && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-nia-gray-600 mx-auto mb-4" />
                <h3 className="text-white text-lg font-medium mb-2">No results found</h3>
                <p className="text-nia-gray-400 text-sm">
                  Try searching for something else
                </p>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Recent Searches */}
            {recentSearches.length > 0 && !searchQuery && (
              <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-lg font-bold">Recent Searches</h3>
                  <button 
                    onClick={() => setRecentSearches([])}
                    className="text-nia-red text-sm font-medium"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search) => (
                    <button
                      key={search}
                      onClick={() => setSearchQuery(search)}
                      className="flex items-center gap-2 px-4 py-2 bg-nia-gray-800 rounded-full text-white text-sm hover:bg-nia-gray-700 transition-colors"
                    >
                      <span>{search}</span>
                      <X 
                        className="w-4 h-4 text-nia-gray-400 hover:text-white"
                        onClick={(e) => removeRecentSearch(search, e)}
                      />
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Browse Categories */}
            {!searchQuery && (
              <section>
                <h3 className="text-white text-lg font-bold mb-4">Browse All</h3>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category, index) => {
                    const Icon = categoryIcons[category.icon] || Music;
                    return (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryClick(category.name)}
                        className="relative p-4 rounded-2xl overflow-hidden text-left transition-transform hover:scale-[1.02] active:scale-[0.98]"
                        style={{ 
                          backgroundColor: category.color,
                          animationDelay: `${index * 0.05}s`
                        }}
                      >
                        <div className="relative z-10">
                          <h4 className="text-white font-bold text-lg">{category.name}</h4>
                        </div>
                        <Icon 
                          className="absolute -bottom-2 -right-2 w-20 h-20 text-white/20 rotate-12" 
                        />
                      </button>
                    );
                  })}
                </div>
              </section>
            )}
          </>
        )}

        {/* Loading State */}
        {isSearching && (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-nia-red border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchScreen;
