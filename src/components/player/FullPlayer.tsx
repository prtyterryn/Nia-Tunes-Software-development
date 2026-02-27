import { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  ChevronDown, 
  Heart, 
  Share2, 
  MoreHorizontal,
  Shuffle,
  Repeat,
  Repeat1,
  ListMusic
} from 'lucide-react';
import { usePlayerStore, useNavigationStore } from '@/store/useStore';
import { formatDuration } from '@/data/mockData';

export function FullPlayer() {
  const { 
    currentSong, 
    isPlaying, 
    currentTime, 
    duration,
    volume,
    isShuffle,
    repeatMode,
    togglePlay, 
    next, 
    previous,
    seek,
    setVolume,
    toggleShuffle,
    toggleRepeat
  } = usePlayerStore();
  const { isPlayerExpanded, setPlayerExpanded } = useNavigationStore();
  const [isLiked, setIsLiked] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  // Simulate progress
  useEffect(() => {
    if (!isPlaying || !isPlayerExpanded) return;
    
    const interval = setInterval(() => {
      if (!isDragging && currentTime < duration) {
        seek(currentTime + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration, isDragging, seek, isPlayerExpanded]);

  if (!isPlayerExpanded || !currentSong) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    seek(percent * duration);
  };

  const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleProgressClick(e);
  };

  const handleProgressMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleProgressClick(e);
  };

  const handleProgressMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="fixed inset-0 z-[60] bg-nia-black animate-fade-in"
      onMouseMove={handleProgressMouseMove}
      onMouseUp={handleProgressMouseUp}
      onMouseLeave={handleProgressMouseUp}
    >
      {/* Background Blur */}
      <div 
        className="now-playing-bg animate-float"
        style={{ backgroundImage: `url(${currentSong.cover})`, backgroundSize: 'cover' }}
      />
      
      {/* Content */}
      <div className="relative h-full flex flex-col safe-top safe-bottom">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={() => setPlayerExpanded(false)}
            className="w-10 h-10 glass-btn flex items-center justify-center"
          >
            <ChevronDown className="w-6 h-6 text-white" />
          </button>
          <div className="text-center">
            <p className="text-nia-gray-400 text-xs uppercase tracking-wider">Now Playing</p>
            <p className="text-white text-sm font-medium">{currentSong.genre}</p>
          </div>
          <button className="w-10 h-10 glass-btn flex items-center justify-center">
            <MoreHorizontal className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Album Art */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div 
            className={`relative w-full max-w-[320px] aspect-square rounded-3xl overflow-hidden shadow-2xl ${
              isPlaying ? 'animate-float' : ''
            }`}
            style={{ 
              boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 60px rgba(211, 47, 47, 0.2)' 
            }}
          >
            <img 
              src={currentSong.cover} 
              alt={currentSong.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Song Info */}
        <div className="px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-white text-2xl font-bold truncate">{currentSong.title}</h2>
              <p className="text-nia-gray-400 text-lg truncate mt-1">{currentSong.artist}</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isLiked ? 'bg-nia-red text-white' : 'glass-btn text-nia-gray-400'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button className="w-10 h-10 glass-btn flex items-center justify-center text-nia-gray-400">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-2">
          <div 
            ref={progressRef}
            className="h-2 bg-white/10 rounded-full cursor-pointer relative group"
            onClick={handleProgressClick}
            onMouseDown={handleProgressMouseDown}
          >
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-nia-red to-nia-green rounded-full"
              style={{ width: `${progress}%` }}
            >
              <div 
                className={`absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg transform transition-transform ${
                  isDragging ? 'scale-150' : 'scale-0 group-hover:scale-100'
                }`}
              />
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-nia-gray-400 text-xs">{formatDuration(currentTime)}</span>
            <span className="text-nia-gray-400 text-xs">{formatDuration(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Shuffle */}
            <button 
              onClick={toggleShuffle}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
                isShuffle ? 'text-nia-red bg-nia-red/20' : 'text-nia-gray-400'
              }`}
            >
              <Shuffle className="w-5 h-5" />
            </button>

            {/* Previous */}
            <button 
              onClick={previous}
              className="w-12 h-12 flex items-center justify-center text-white hover:scale-110 transition-transform"
            >
              <SkipBack className="w-8 h-8 fill-current" />
            </button>

            {/* Play/Pause */}
            <button 
              onClick={togglePlay}
              className="w-20 h-20 bg-nia-red rounded-full flex items-center justify-center shadow-glow hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-10 h-10 text-white fill-white" />
              ) : (
                <Play className="w-10 h-10 text-white fill-white ml-1" />
              )}
            </button>

            {/* Next */}
            <button 
              onClick={next}
              className="w-12 h-12 flex items-center justify-center text-white hover:scale-110 transition-transform"
            >
              <SkipForward className="w-8 h-8 fill-current" />
            </button>

            {/* Repeat */}
            <button 
              onClick={toggleRepeat}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
                repeatMode !== 'none' ? 'text-nia-red bg-nia-red/20' : 'text-nia-gray-400'
              }`}
            >
              {repeatMode === 'one' ? (
                <Repeat1 className="w-5 h-5" />
              ) : (
                <Repeat className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Volume & Queue */}
        <div className="px-6 pb-6 pt-2">
          <div className="flex items-center gap-4">
            <div className="flex-1 flex items-center gap-3">
              <span className="text-nia-gray-400 text-xs">Volume</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
              />
            </div>
            <button className="flex items-center gap-2 text-nia-gray-400 hover:text-white transition-colors">
              <ListMusic className="w-5 h-5" />
              <span className="text-sm">Queue</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullPlayer;
