import { useState, useRef } from 'react';
import { 
  Play, 
  Upload, 
  Video, 
  Clock, 
  Eye, 
  CheckCircle2, 
  AlertCircle,
  Trash2,
  X,
  Film
} from 'lucide-react';
import { useCanvasStore } from '@/store/useSocialStore';
import { useCreatorAuthStore } from '@/store/useCreatorStore';
import type { CanvasVideo } from '@/types/social';

export function CanvasManager() {
  const { creator } = useCreatorAuthStore();
  const { videos, addCanvas, deleteCanvas } = useCanvasStore();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const creatorVideos = videos.filter(v => v.creatorId === creator?.id);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      alert('File size must be less than 50MB');
      return;
    }

    // Check duration (max 30 seconds)
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      if (video.duration > 30) {
        alert('Video must be 30 seconds or less');
        return;
      }
      startUpload(file);
    };
    video.src = URL.createObjectURL(file);
  };

  const startUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Add the new canvas
          const newCanvas: CanvasVideo = {
            id: `canvas-${Date.now()}`,
            songId: 'new-song',
            creatorId: creator?.id || '',
            videoUrl: URL.createObjectURL(file),
            thumbnailUrl: '/album-art.jpg',
            duration: 15,
            status: 'processing',
            views: 0,
            createdAt: new Date().toISOString(),
          };
          addCanvas(newCanvas);
          setShowUploadModal(false);
          return 0;
        }
        return prev + 10;
      });
    }, 300);
  };

  const getStatusIcon = (status: CanvasVideo['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className="w-4 h-4 text-nia-green" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-yellow-500 animate-pulse" />;
      case 'rejected':
        return <AlertCircle className="w-4 h-4 text-nia-red" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Info Card */}
      <div className="glass-card p-4 rounded-2xl bg-gradient-to-r from-nia-red/10 to-nia-green/10">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-nia-red/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Film className="w-5 h-5 text-nia-red" />
          </div>
          <div>
            <h4 className="text-white font-medium">What is Canvas?</h4>
            <p className="text-nia-gray-400 text-sm mt-1">
              Canvas is a short looping video that plays while your song streams. 
              It's like Spotify Canvas - a 3-30 second visual that brings your music to life!
            </p>
          </div>
        </div>
      </div>

      {/* Upload Button */}
      <button
        onClick={() => setShowUploadModal(true)}
        className="w-full py-6 border-2 border-dashed border-nia-red/50 rounded-2xl text-nia-red hover:bg-nia-red/10 transition-colors flex flex-col items-center justify-center gap-2"
      >
        <div className="w-14 h-14 bg-nia-red/20 rounded-full flex items-center justify-center">
          <Upload className="w-7 h-7" />
        </div>
        <span className="font-medium">Upload New Canvas</span>
        <span className="text-nia-gray-400 text-sm">MP4, MOV • Max 30 seconds • Max 50MB</span>
      </button>

      {/* Canvas Videos Grid */}
      <div>
        <h3 className="text-white font-semibold mb-4">Your Canvas Videos</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {creatorVideos.map((video) => (
            <div key={video.id} className="glass-card rounded-2xl overflow-hidden group">
              {/* Video Preview */}
              <div className="aspect-[9/16] relative bg-nia-gray-800">
                <img 
                  src={video.thumbnailUrl} 
                  alt="Canvas thumbnail" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="w-12 h-12 bg-nia-red rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                  </button>
                </div>
                
                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 rounded text-white text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {video.duration}s
                </div>

                {/* Status Badge */}
                <div className="absolute top-2 left-2">
                  <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                    video.status === 'active' ? 'bg-nia-green/80 text-white' :
                    video.status === 'processing' ? 'bg-yellow-500/80 text-white' :
                    'bg-nia-red/80 text-white'
                  }`}>
                    {getStatusIcon(video.status)}
                    {video.status}
                  </span>
                </div>

                {/* Delete Button */}
                <button 
                  onClick={() => deleteCanvas(video.id)}
                  className="absolute top-2 right-2 w-8 h-8 bg-nia-red/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Info */}
              <div className="p-3">
                <div className="flex items-center gap-1 text-nia-gray-400 text-xs">
                  <Eye className="w-3 h-3" />
                  {video.views.toLocaleString()} views
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="glass-card p-4 rounded-2xl">
        <h4 className="text-white font-medium mb-3">Tips for Great Canvas</h4>
        <ul className="space-y-2 text-nia-gray-400 text-sm">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-nia-green flex-shrink-0 mt-0.5" />
            Keep it short and engaging (3-15 seconds works best)
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-nia-green flex-shrink-0 mt-0.5" />
            Use vertical video (9:16 aspect ratio)
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-nia-green flex-shrink-0 mt-0.5" />
            Make it loop seamlessly
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-nia-green flex-shrink-0 mt-0.5" />
            Show your personality or behind-the-scenes moments
          </li>
        </ul>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-md rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-xl font-bold">Upload Canvas</h3>
              <button 
                onClick={() => { setShowUploadModal(false); setIsUploading(false); }}
                className="w-8 h-8 bg-nia-gray-800 rounded-lg flex items-center justify-center"
              >
                <X className="w-5 h-5 text-nia-gray-400" />
              </button>
            </div>

            {!isUploading ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-nia-gray-700 rounded-xl p-12 text-center cursor-pointer hover:border-nia-red transition-colors"
              >
                <Video className="w-16 h-16 text-nia-gray-600 mx-auto mb-4" />
                <p className="text-white font-medium mb-2">Click to upload video</p>
                <p className="text-nia-gray-400 text-sm">or drag and drop</p>
                <p className="text-nia-gray-500 text-xs mt-4">MP4, MOV • Max 30s • Max 50MB</p>
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-20 h-20 relative mx-auto mb-4">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      fill="none"
                      stroke="#1A1A1A"
                      strokeWidth="6"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      fill="none"
                      stroke="#D32F2F"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${uploadProgress * 2.26} 226`}
                      className="transition-all duration-300"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
                    {uploadProgress}%
                  </span>
                </div>
                <p className="text-white font-medium">Uploading...</p>
                <p className="text-nia-gray-400 text-sm mt-1">Please don't close this window</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CanvasManager;
