import { Play, Pause, Heart, MoreHorizontal } from 'lucide-react';
import type { Song } from '@/types';
import { formatDuration, formatNumber } from '@/data/mockData';
import { usePlayerStore } from '@/store/useStore';

interface SongCardProps {
  song: Song;
  onClick?: () => void;
  variant?: 'default' | 'compact' | 'row' | 'featured';
  showAlbum?: boolean;
  index?: number;
}

export function SongCard({ 
  song, 
  onClick, 
  variant = 'default',
  showAlbum = false,
  index
}: SongCardProps) {
  const { currentSong, isPlaying, play, pause } = usePlayerStore();
  const isCurrentSong = currentSong?.id === song.id;
  const isCurrentlyPlaying = isCurrentSong && isPlaying;

  const handlePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isCurrentSong) {
      if (isPlaying) {
        pause();
      } else {
        play(song);
      }
    } else {
      play(song);
    }
    onClick?.();
  };

  if (variant === 'row') {
    return (
      <div 
        onClick={handlePlay}
        className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 cursor-pointer ${
          isCurrentSong 
            ? 'bg-nia-red/10 border border-nia-red/30' 
            : 'hover:bg-nia-gray-800/50'
        }`}
      >
        {index !== undefined && (
          <span className="text-nia-gray-400 text-sm w-6 text-center">
            {isCurrentlyPlaying ? (
              <span className="flex gap-0.5 justify-center">
                <span className="w-1 h-3 bg-nia-red rounded-full animate-wave" />
                <span className="w-1 h-4 bg-nia-red rounded-full animate-wave" style={{ animationDelay: '0.1s' }} />
                <span className="w-1 h-2 bg-nia-red rounded-full animate-wave" style={{ animationDelay: '0.2s' }} />
              </span>
            ) : (
              <span className="group-hover:hidden">{index + 1}</span>
            )}
            <Play className={`w-4 h-4 mx-auto hidden ${!isCurrentlyPlaying && 'group-hover:block'}`} />
          </span>
        )}
        
        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={song.cover} 
            alt={song.title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity ${
            isCurrentlyPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}>
            {isCurrentlyPlaying ? (
              <Pause className="w-5 h-5 text-white fill-white" />
            ) : (
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            )}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className={`font-medium text-sm truncate ${isCurrentSong ? 'text-nia-red' : 'text-white'}`}>
            {song.title}
          </h4>
          <p className="text-nia-gray-400 text-xs truncate">{song.artist}</p>
        </div>
        
        {showAlbum && (
          <span className="text-nia-gray-400 text-xs hidden sm:block truncate max-w-[120px]">
            {song.album}
          </span>
        )}
        
        <div className="flex items-center gap-4">
          <button 
            onClick={(e) => e.stopPropagation()}
            className="text-nia-gray-400 hover:text-nia-red transition-colors opacity-0 group-hover:opacity-100"
          >
            <Heart className="w-4 h-4" />
          </button>
          <span className="text-nia-gray-400 text-xs">{formatDuration(song.duration)}</span>
          <button 
            onClick={(e) => e.stopPropagation()}
            className="text-nia-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div 
        onClick={handlePlay}
        className="group flex items-center gap-3 p-2 rounded-xl hover:bg-nia-gray-800/50 transition-all duration-300 cursor-pointer"
      >
        <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={song.cover} 
            alt={song.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            {isCurrentlyPlaying ? (
              <Pause className="w-5 h-5 text-white fill-white" />
            ) : (
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            )}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`font-medium text-sm truncate ${isCurrentSong ? 'text-nia-red' : 'text-white'}`}>
            {song.title}
          </h4>
          <p className="text-nia-gray-400 text-xs truncate">{song.artist}</p>
        </div>
        <span className="text-nia-gray-400 text-xs">{formatDuration(song.duration)}</span>
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <div 
        onClick={handlePlay}
        className="group relative rounded-2xl overflow-hidden cursor-pointer card-hover"
      >
        <div className="aspect-square">
          <img 
            src={song.cover} 
            alt={song.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 image-overlay" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className="text-nia-green text-xs font-semibold uppercase tracking-wider">
            {song.genre}
          </span>
          <h3 className="text-white font-bold text-lg mt-1 line-clamp-1">{song.title}</h3>
          <p className="text-nia-gray-400 text-sm">{song.artist}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-nia-gray-400 text-xs">{formatNumber(song.plays)} plays</span>
          </div>
        </div>
        <button 
          onClick={handlePlay}
          className="absolute top-4 right-4 w-10 h-10 bg-nia-red rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-glow"
        >
          {isCurrentlyPlaying ? (
            <Pause className="w-5 h-5 text-white fill-white" />
          ) : (
            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
          )}
        </button>
      </div>
    );
  }

  return (
    <div 
      onClick={handlePlay}
      className="group cursor-pointer"
    >
      <div className="relative aspect-square rounded-2xl overflow-hidden mb-3">
        <img 
          src={song.cover} 
          alt={song.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button 
          onClick={handlePlay}
          className="absolute bottom-3 right-3 w-12 h-12 bg-nia-red rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-glow"
        >
          {isCurrentlyPlaying ? (
            <Pause className="w-6 h-6 text-white fill-white" />
          ) : (
            <Play className="w-6 h-6 text-white fill-white ml-0.5" />
          )}
        </button>
      </div>
      <h4 className={`font-medium text-sm line-clamp-1 group-hover:text-nia-red transition-colors ${
        isCurrentSong ? 'text-nia-red' : 'text-white'
      }`}>
        {song.title}
      </h4>
      <p className="text-nia-gray-400 text-xs line-clamp-1 mt-0.5">{song.artist}</p>
    </div>
  );
}

export default SongCard;
