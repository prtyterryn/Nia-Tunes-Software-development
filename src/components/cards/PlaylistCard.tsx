import { Play } from 'lucide-react';
import type { Playlist } from '@/types';
import { formatDuration } from '@/data/mockData';

interface PlaylistCardProps {
  playlist: Playlist;
  onClick?: () => void;
  onPlay?: () => void;
  variant?: 'default' | 'compact' | 'featured';
}

export function PlaylistCard({ 
  playlist, 
  onClick, 
  onPlay,
  variant = 'default' 
}: PlaylistCardProps) {
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
        <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={playlist.cover} 
            alt={playlist.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Play className="w-5 h-5 text-white fill-white" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium text-sm truncate">{playlist.name}</h4>
          <p className="text-nia-gray-400 text-xs truncate">
            {playlist.songs.length} songs • {formatDuration(playlist.totalDuration)}
          </p>
        </div>
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <div 
        onClick={onClick}
        className="group relative rounded-2xl overflow-hidden cursor-pointer card-hover"
      >
        <div className="aspect-square">
          <img 
            src={playlist.cover} 
            alt={playlist.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 image-overlay" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className="text-nia-red text-xs font-semibold uppercase tracking-wider">
            Featured Playlist
          </span>
          <h3 className="text-white font-bold text-lg mt-1 line-clamp-1">{playlist.name}</h3>
          <p className="text-nia-gray-400 text-sm line-clamp-2 mt-1">{playlist.description}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-nia-gray-400 text-xs">{playlist.songs.length} songs</span>
            <span className="text-nia-gray-600">•</span>
            <span className="text-nia-gray-400 text-xs">{formatDuration(playlist.totalDuration)}</span>
          </div>
        </div>
        <button 
          onClick={handlePlay}
          className="absolute top-4 right-4 w-10 h-10 bg-nia-red rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-glow"
        >
          <Play className="w-5 h-5 text-white fill-white ml-0.5" />
        </button>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative aspect-square rounded-2xl overflow-hidden mb-3">
        <img 
          src={playlist.cover} 
          alt={playlist.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button 
          onClick={handlePlay}
          className="absolute bottom-3 right-3 w-12 h-12 bg-nia-red rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-glow"
        >
          <Play className="w-6 h-6 text-white fill-white ml-0.5" />
        </button>
      </div>
      <h4 className="text-white font-medium text-sm line-clamp-1 group-hover:text-nia-red transition-colors">
        {playlist.name}
      </h4>
      <p className="text-nia-gray-400 text-xs line-clamp-1 mt-0.5">
        {playlist.description}
      </p>
    </div>
  );
}

export default PlaylistCard;
