import { useState, useEffect, useRef } from 'react';
import { 
  Video, 
  Users, 
  Gift, 
  X,
  Sparkles,
  Send,
  Play
} from 'lucide-react';
import { useLiveStreamingStore } from '@/store/useSocialStore';
import { useCreatorAuthStore } from '@/store/useCreatorStore';
import type { LiveStream, Tip, LiveComment } from '@/types/social';

// Gift animations
const giftAnimations: Record<string, string> = {
  rose: 'animate-float',
  heart: 'animate-pulse',
  star: 'animate-spin-slow',
  diamond: 'animate-pulse-glow',
  crown: 'animate-bounce',
  rocket: 'animate-fly',
};

export function LiveStreamManager() {
  const { creator } = useCreatorAuthStore();
  const { 
    gifts, 
    activeStream, 
    isLive,
    startStream, 
    endStream, 
    addTip, 
    addComment,
    updateViewers,
    scheduleStream,
    getCreatorStreams 
  } = useLiveStreamingStore();

  const [showGoLiveModal, setShowGoLiveModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [streamTitle, setStreamTitle] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [comment, setComment] = useState('');
  const [showGiftPanel, setShowGiftPanel] = useState(false);
  const [activeGift, setActiveGift] = useState<string | null>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  const creatorStreams = getCreatorStreams(creator?.id || '');
  const upcomingStreams = creatorStreams.filter(s => s.status === 'scheduled');
  const pastStreams = creatorStreams.filter(s => s.status === 'ended');

  // Auto-scroll comments
  useEffect(() => {
    if (commentsRef.current) {
      commentsRef.current.scrollTop = commentsRef.current.scrollHeight;
    }
  }, [activeStream?.comments]);

  const handleGoLive = () => {
    if (!streamTitle.trim()) return;

    const newStream: LiveStream = {
      id: `live-${Date.now()}`,
      creatorId: creator?.id || '',
      creatorName: creator?.artistName || '',
      creatorAvatar: creator?.avatar || '',
      title: streamTitle,
      thumbnailUrl: creator?.coverImage || '',
      status: 'live',
      viewers: 1,
      peakViewers: 1,
      totalViews: 0,
      duration: 0,
      tips: [],
      totalTips: 0,
      comments: [],
      isRecording: true,
    };

    startStream(newStream);
    setShowGoLiveModal(false);
    setStreamTitle('');
  };

  const handleScheduleStream = () => {
    if (!streamTitle.trim() || !scheduledDate) return;

    const newStream: LiveStream = {
      id: `live-${Date.now()}`,
      creatorId: creator?.id || '',
      creatorName: creator?.artistName || '',
      creatorAvatar: creator?.avatar || '',
      title: streamTitle,
      thumbnailUrl: creator?.coverImage || '',
      status: 'scheduled',
      scheduledAt: scheduledDate,
      viewers: 0,
      peakViewers: 0,
      totalViews: 0,
      duration: 0,
      tips: [],
      totalTips: 0,
      comments: [],
      isRecording: false,
    };

    scheduleStream(newStream);
    setShowScheduleModal(false);
    setStreamTitle('');
    setScheduledDate('');
  };

  const handleSendComment = () => {
    if (!comment.trim() || !activeStream) return;

    const newComment: LiveComment = {
      id: `comment-${Date.now()}`,
      streamId: activeStream.id,
      userId: 'current-user',
      userName: creator?.artistName || 'You',
      userAvatar: creator?.avatar || '',
      message: comment,
      isVIP: true,
      createdAt: new Date().toISOString(),
    };

    addComment(activeStream.id, newComment);
    setComment('');
  };

  const handleSendGift = (gift: typeof gifts[0]) => {
    if (!activeStream) return;

    const newTip: Tip = {
      id: `tip-${Date.now()}`,
      streamId: activeStream.id,
      senderId: 'user-1',
      senderName: 'Fan User',
      senderAvatar: '/artist-1.jpg',
      amount: gift.price,
      currency: gift.currency,
      message: `Sent ${gift.name}!`,
      giftType: gift.id,
      createdAt: new Date().toISOString(),
    };

    addTip(activeStream.id, newTip);
    setActiveGift(gift.id);
    setTimeout(() => setActiveGift(null), 2000);
    setShowGiftPanel(false);
  };

  // Simulate viewer count changes
  useEffect(() => {
    if (!isLive || !activeStream) return;

    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 10) - 3;
      const newCount = Math.max(1, activeStream.viewers + change);
      updateViewers(activeStream.id, newCount);
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive, activeStream, updateViewers]);

  // Live Stream View
  if (isLive && activeStream) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        {/* Video Preview */}
        <div className="absolute inset-0 bg-gradient-to-b from-nia-gray-900 to-nia-black">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-nia-red/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Video className="w-12 h-12 text-nia-red" />
              </div>
              <p className="text-white text-xl font-bold">LIVE</p>
              <p className="text-nia-gray-400">{activeStream.title}</p>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-nia-red">
                <img src={activeStream.creatorAvatar} alt={activeStream.creatorName} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-white font-medium">{activeStream.creatorName}</p>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-nia-red text-sm">
                    <Users className="w-4 h-4" />
                    {activeStream.viewers.toLocaleString()}
                  </span>
                  <span className="text-nia-gray-400 text-sm">
                    ${activeStream.totalTips} tips
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={endStream}
              className="px-4 py-2 bg-nia-red rounded-full text-white text-sm font-medium"
            >
              End Live
            </button>
          </div>
        </div>

        {/* Gift Animation Overlay */}
        {activeGift && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className={`text-6xl ${giftAnimations[gifts.find(g => g.id === activeGift)?.animation || '']}`}>
              {gifts.find(g => g.id === activeGift)?.icon}
            </div>
          </div>
        )}

        {/* Comments */}
        <div 
          ref={commentsRef}
          className="absolute bottom-32 left-4 right-4 max-h-64 overflow-y-auto space-y-2"
        >
          {activeStream.comments.map((c) => (
            <div key={c.id} className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                <img src={c.userAvatar} alt={c.userName} className="w-full h-full object-cover" />
              </div>
              <div className="bg-black/60 rounded-lg px-3 py-1.5">
                <p className="text-nia-red text-xs font-medium">{c.userName}</p>
                <p className="text-white text-sm">{c.message}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tips Display */}
        {activeStream.tips.length > 0 && (
          <div className="absolute top-20 right-4 space-y-2">
            {activeStream.tips.slice(-3).map((tip) => (
              <div key={tip.id} className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg px-3 py-2 border border-yellow-500/30">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <img src={tip.senderAvatar} alt={tip.senderName} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-yellow-400 text-xs font-medium">{tip.senderName}</p>
                    <p className="text-white text-sm flex items-center gap-1">
                      Sent {gifts.find(g => g.id === tip.giftType)?.icon} ${tip.amount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Say something..."
                className="w-full bg-white/10 backdrop-blur rounded-full px-4 py-3 pr-12 text-white placeholder:text-nia-gray-400"
                onKeyPress={(e) => e.key === 'Enter' && handleSendComment()}
              />
              <button 
                onClick={handleSendComment}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-nia-red rounded-full flex items-center justify-center"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
            <button 
              onClick={() => setShowGiftPanel(!showGiftPanel)}
              className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
            >
              <Gift className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Gift Panel */}
        {showGiftPanel && (
          <div className="absolute bottom-24 left-4 right-4 glass-card rounded-2xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-medium">Send a Gift</h4>
              <button onClick={() => setShowGiftPanel(false)}>
                <X className="w-5 h-5 text-nia-gray-400" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {gifts.map((gift) => (
                <button
                  key={gift.id}
                  onClick={() => handleSendGift(gift)}
                  className="p-3 bg-nia-gray-800 rounded-xl hover:bg-nia-gray-700 transition-colors text-center"
                >
                  <span className="text-3xl">{gift.icon}</span>
                  <p className="text-white text-sm font-medium mt-1">{gift.name}</p>
                  <p className="text-nia-red text-xs">${gift.price}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setShowGoLiveModal(true)}
          className="py-6 bg-gradient-to-br from-nia-red to-nia-red/80 rounded-2xl text-white flex flex-col items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
        >
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
            <Video className="w-7 h-7" />
          </div>
          <span className="font-bold text-lg">Go Live Now</span>
          <span className="text-white/70 text-sm">Start streaming instantly</span>
        </button>

        <button
          onClick={() => setShowScheduleModal(true)}
          className="py-6 bg-nia-gray-800 rounded-2xl text-white flex flex-col items-center justify-center gap-2 hover:bg-nia-gray-700 transition-colors"
        >
          <div className="w-14 h-14 bg-nia-gray-700 rounded-full flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-nia-green" />
          </div>
          <span className="font-bold text-lg">Schedule Live</span>
          <span className="text-nia-gray-400 text-sm">Plan your stream</span>
        </button>
      </div>

      {/* Upcoming Streams */}
      {upcomingStreams.length > 0 && (
        <div>
          <h3 className="text-white font-semibold mb-4">Upcoming Streams</h3>
          <div className="space-y-3">
            {upcomingStreams.map((stream) => (
              <div key={stream.id} className="glass-card p-4 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-nia-gray-800">
                    <img src={stream.thumbnailUrl} alt={stream.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{stream.title}</h4>
                    <p className="text-nia-gray-400 text-sm">
                      {stream.scheduledAt && new Date(stream.scheduledAt).toLocaleString()}
                    </p>
                    <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-500 rounded-full mt-2 inline-block">
                      Scheduled
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Past Streams */}
      {pastStreams.length > 0 && (
        <div>
          <h3 className="text-white font-semibold mb-4">Past Streams</h3>
          <div className="space-y-3">
            {pastStreams.map((stream) => (
              <div key={stream.id} className="glass-card p-4 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-nia-gray-800 relative">
                    <img src={stream.thumbnailUrl} alt={stream.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{stream.title}</h4>
                    <div className="flex items-center gap-4 mt-1 text-nia-gray-400 text-sm">
                      <span>{stream.totalViews.toLocaleString()} views</span>
                      <span>${stream.totalTips} in tips</span>
                      <span>{Math.floor(stream.duration / 60)}m duration</span>
                    </div>
                  </div>
                  {stream.isRecording && stream.recordingUrl && (
                    <button className="px-3 py-1.5 bg-nia-red rounded-lg text-white text-sm">
                      Watch Replay
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips Info */}
      <div className="glass-card p-4 rounded-2xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center">
            <Gift className="w-5 h-5 text-yellow-500" />
          </div>
          <div>
            <h4 className="text-white font-medium">Earn from Tips</h4>
            <p className="text-nia-gray-400 text-sm mt-1">
              Fans can send you gifts during live streams. You keep 70% of all tips!
            </p>
          </div>
        </div>
      </div>

      {/* Go Live Modal */}
      {showGoLiveModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-md rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-xl font-bold">Go Live</h3>
              <button onClick={() => setShowGoLiveModal(false)}>
                <X className="w-5 h-5 text-nia-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-nia-gray-400 text-sm block mb-1">Stream Title</label>
                <input 
                  type="text" 
                  value={streamTitle}
                  onChange={(e) => setStreamTitle(e.target.value)}
                  placeholder="What are you streaming about?"
                  className="w-full input-field"
                />
              </div>

              <div className="flex items-center gap-2 p-3 bg-nia-gray-800 rounded-xl">
                <input type="checkbox" id="record" className="w-4 h-4 accent-nia-red" defaultChecked />
                <label htmlFor="record" className="text-white text-sm">Save recording for replay</label>
              </div>

              <button
                onClick={handleGoLive}
                disabled={!streamTitle.trim()}
                className="w-full py-4 bg-nia-red rounded-full text-white font-bold disabled:opacity-50"
              >
                Start Live Stream
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-md rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-xl font-bold">Schedule Live Stream</h3>
              <button onClick={() => setShowScheduleModal(false)}>
                <X className="w-5 h-5 text-nia-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-nia-gray-400 text-sm block mb-1">Stream Title</label>
                <input 
                  type="text" 
                  value={streamTitle}
                  onChange={(e) => setStreamTitle(e.target.value)}
                  placeholder="What are you streaming about?"
                  className="w-full input-field"
                />
              </div>

              <div>
                <label className="text-nia-gray-400 text-sm block mb-1">Date & Time</label>
                <input 
                  type="datetime-local" 
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full input-field"
                />
              </div>

              <button
                onClick={handleScheduleStream}
                disabled={!streamTitle.trim() || !scheduledDate}
                className="w-full py-4 bg-nia-green rounded-full text-white font-bold disabled:opacity-50"
              >
                Schedule Stream
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LiveStreamManager;
