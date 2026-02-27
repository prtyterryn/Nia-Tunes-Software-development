import { Play, Pause, SkipForward, SkipBack, ChevronUp } from 'lucide-react';
import { usePlayerStore, useNavigationStore } from '@/store/useStore';

export function MiniPlayer() {
  const { 
    currentSong, 
    isPlaying, 
    currentTime, 
    duration,
    togglePlay, 
    next, 
    previous 
  } = usePlayerStore();
  const { setPlayerExpanded } = useNavigationStore();

  if (!currentSong) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      className="fixed bottom-[72px] left-0 right-0 z-40 px-4 pb-2"
    >
      <div 
        className="glass-card rounded-2xl overflow-hidden cursor-pointer animate-slide-up"
        onClick={() => setPlayerExpanded(true)}
      >
        {/* Progress Bar */}
        <div className="h-1 bg-white/10">
          <div 
            className="h-full bg-gradient-to-r from-nia-red to-nia-green transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex items-center gap-3 p-3">
          {/* Album Art */}
          <div className={`relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 ${isPlaying ? 'animate-pulse-glow' : ''}`}>
            <img 
              src={currentSong.cover} 
              alt={currentSong.title}
              className={`w-full h-full object-cover ${isPlaying ? 'animate-spin-slow' : ''}`}
              style={{ animationDuration: '20s' }}
            />
          </div>
          
          {/* Song Info */}
          <div className="flex-1 min-w-0">
            <h4 className="text-white font-medium text-sm truncate">{currentSong.title}</h4>
            <p className="text-nia-gray-400 text-xs truncate">{currentSong.artist}</p>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); previous(); }}
              className="w-8 h-8 flex items-center justify-center text-nia-gray-400 hover:text-white transition-colors"
            >
              <SkipBack className="w-5 h-5 fill-current" />
            </button>
            
            <button 
              onClick={(e) => { e.stopPropagation(); togglePlay(); }}
              className="w-10 h-10 bg-nia-red rounded-full flex items-center justify-center shadow-glow hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white fill-white" />
              ) : (
                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
              )}
            </button>
            
            <button 
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="w-8 h-8 flex items-center justify-center text-nia-gray-400 hover:text-white transition-colors"
            >
              <SkipForward className="w-5 h-5 fill-current" />
            </button>
            
            <button 
              onClick={(e) => { e.stopPropagation(); setPlayerExpanded(true); }}
              className="w-8 h-8 flex items-center justify-center text-nia-gray-400 hover:text-white transition-colors ml-1"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiniPlayer;
