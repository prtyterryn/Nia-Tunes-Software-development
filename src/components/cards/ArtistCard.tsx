import { useState } from 'react';
import { Play, Check } from 'lucide-react';
import type { Artist } from '@/types';
import { formatNumber } from '@/data/mockData';

interface ArtistCardProps {
  artist: Artist;
  onClick?: () => void;
  onPlay?: () => void;
  variant?: 'default' | 'compact' | 'featured';
  showFollowButton?: boolean;
}

export function ArtistCard({ 
  artist, 
  onClick, 
  onPlay,
  variant = 'default',
  showFollowButton = false
}: ArtistCardProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFollowing(!isFollowing);
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlay?.();
  };

  if (variant === 'compact') {
    return (
      <div 
        onClick={onClick}
        className="group flex items-center gap-3 p-2 rounded-xl bg-nia-gray-800/50 hover:bg-nia-gray-800 transition-all duration-300 cursor-pointer"
      >
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <img 
            src={artist.avatar} 
            alt={artist.name}
            className="w-full h-full object-cover"
          />
          {artist.isVerified && (
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-nia-green rounded-full flex items-center justify-center border-2 border-nia-black">
              <Check className="w-2.5 h-2.5 text-white" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium text-sm truncate flex items-center gap-1">
            {artist.name}
          </h4>
          <p className="text-nia-gray-400 text-xs truncate">
            {formatNumber(artist.monthlyListeners)} monthly listeners
          </p>
        </div>
        <button 
          onClick={handlePlay}
          className="w-8 h-8 bg-nia-red rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Play className="w-4 h-4 text-white fill-white ml-0.5" />
        </button>
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <div 
        onClick={onClick}
        className="group relative rounded-2xl overflow-hidden cursor-pointer card-hover"
      >
        <div className="aspect-[3/4]">
          <img 
            src={artist.avatar} 
            alt={artist.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 image-overlay" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-white font-bold text-lg">{artist.name}</h3>
            {artist.isVerified && (
              <div className="w-5 h-5 bg-nia-green rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <p className="text-nia-gray-400 text-sm">
            {formatNumber(artist.followers)} followers
          </p>
          <div className="flex items-center gap-2 mt-3">
            <button 
              onClick={handlePlay}
              className="flex-1 bg-nia-red text-white text-sm font-semibold py-2 rounded-full hover:bg-nia-red/90 transition-colors"
            >
              Play
            </button>
            {showFollowButton && (
              <button 
                onClick={handleFollow}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  isFollowing 
                    ? 'bg-nia-green text-white' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer text-center"
    >
      <div className="relative w-full aspect-square rounded-full overflow-hidden mb-3 mx-auto max-w-[160px]">
        <img 
          src={artist.avatar} 
          alt={artist.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button 
            onClick={handlePlay}
            className="w-14 h-14 bg-nia-red rounded-full flex items-center justify-center shadow-glow transform scale-90 group-hover:scale-100 transition-transform"
          >
            <Play className="w-6 h-6 text-white fill-white ml-1" />
          </button>
        </div>
        {artist.isVerified && (
          <div className="absolute bottom-1 right-1 w-6 h-6 bg-nia-green rounded-full flex items-center justify-center border-2 border-nia-black">
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
        )}
      </div>
      <h4 className="text-white font-medium text-sm line-clamp-1 group-hover:text-nia-red transition-colors">
        {artist.name}
      </h4>
      <p className="text-nia-gray-400 text-xs mt-0.5">
        Artist
      </p>
    </div>
  );
}

export default ArtistCard;
