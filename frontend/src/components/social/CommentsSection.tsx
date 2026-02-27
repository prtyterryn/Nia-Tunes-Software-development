import { useState } from 'react';
import { 
  Heart, 
  Send,
  Video,
  Camera,
  Star,
  ThumbsUp,
  X,
  Play
} from 'lucide-react';
import { useCommentsStore } from '@/store/useSocialStore';
import { useAuthStore } from '@/store/useStore';
import type { Comment, Review } from '@/types/social';

interface CommentsSectionProps {
  songId: string;
}

export function CommentsSection({ songId }: CommentsSectionProps) {
  const { user } = useAuthStore();
  const { comments, reviews, addComment, addReview, likeComment, likeReview } = useCommentsStore();
  const [activeTab, setActiveTab] = useState<'comments' | 'reviews'>('comments');
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [showReactionModal, setShowReactionModal] = useState(false);

  const songComments = comments.filter(c => c.songId === songId);
  const songReviews = reviews.filter(r => r.songId === songId);
  const averageRating = songReviews.length > 0 
    ? songReviews.reduce((sum, r) => sum + r.rating, 0) / songReviews.length 
    : 0;

  const handlePostComment = () => {
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      songId,
      userId: user?.id || 'user-1',
      userName: user?.name || 'You',
      userAvatar: user?.avatar || '/artist-4.jpg',
      content: commentText,
      type: 'text',
      likes: 0,
      replies: [],
      isPinned: false,
      createdAt: new Date().toISOString(),
    };

    addComment(newComment);
    setCommentText('');
  };

  const handlePostReview = () => {
    if (!reviewText.trim()) return;

    const newReview: Review = {
      id: `review-${Date.now()}`,
      songId,
      userId: user?.id || 'user-1',
      userName: user?.name || 'You',
      userAvatar: user?.avatar || '/artist-4.jpg',
      rating,
      review: reviewText,
      likes: 0,
      isVerifiedPurchase: true,
      createdAt: new Date().toISOString(),
    };

    addReview(newReview);
    setReviewText('');
    setRating(5);
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-4 border-b border-nia-gray-800">
        <button
          onClick={() => setActiveTab('comments')}
          className={`pb-3 text-sm font-medium transition-colors ${
            activeTab === 'comments' ? 'text-nia-red border-b-2 border-nia-red' : 'text-nia-gray-400'
          }`}
        >
          Comments ({songComments.length})
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`pb-3 text-sm font-medium transition-colors ${
            activeTab === 'reviews' ? 'text-nia-red border-b-2 border-nia-red' : 'text-nia-gray-400'
          }}`}
        >
          Reviews ({songReviews.length})
        </button>
      </div>

      {/* Rating Summary (Reviews tab only) */}
      {activeTab === 'reviews' && (
        <div className="glass-card p-4 rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-4xl font-bold text-white">{averageRating.toFixed(1)}</p>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-4 h-4 ${star <= Math.round(averageRating) ? 'text-yellow-500 fill-yellow-500' : 'text-nia-gray-600'}`} 
                  />
                ))}
              </div>
              <p className="text-nia-gray-400 text-xs mt-1">{songReviews.length} reviews</p>
            </div>
            <div className="flex-1 space-y-1">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = songReviews.filter(r => r.rating === stars).length;
                const percentage = songReviews.length > 0 ? (count / songReviews.length) * 100 : 0;
                return (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="text-nia-gray-400 text-xs w-3">{stars}</span>
                    <Star className="w-3 h-3 text-nia-gray-600" />
                    <div className="flex-1 h-1.5 bg-nia-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-nia-gray-400 text-xs w-6">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="glass-card p-4 rounded-2xl">
        {activeTab === 'comments' ? (
          <div className="space-y-3">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              rows={2}
              className="w-full bg-transparent text-white placeholder:text-nia-gray-500 resize-none focus:outline-none"
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowReactionModal(true)}
                  className="w-8 h-8 bg-nia-gray-800 rounded-full flex items-center justify-center"
                >
                  <Video className="w-4 h-4 text-nia-gray-400" />
                </button>
                <button 
                  onClick={() => setShowReactionModal(true)}
                  className="w-8 h-8 bg-nia-gray-800 rounded-full flex items-center justify-center"
                >
                  <Camera className="w-4 h-4 text-nia-gray-400" />
                </button>
              </div>
              <button
                onClick={handlePostComment}
                disabled={!commentText.trim()}
                className="px-4 py-2 bg-nia-red rounded-full text-white text-sm font-medium disabled:opacity-50 flex items-center gap-1"
              >
                <Send className="w-4 h-4" />
                Post
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-nia-gray-400 text-sm">Your rating:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star 
                      className={`w-6 h-6 transition-colors ${star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-nia-gray-600'}`} 
                    />
                  </button>
                ))}
              </div>
            </div>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review..."
              rows={3}
              className="w-full bg-transparent text-white placeholder:text-nia-gray-500 resize-none focus:outline-none"
            />
            <div className="flex justify-end">
              <button
                onClick={handlePostReview}
                disabled={!reviewText.trim()}
                className="px-4 py-2 bg-nia-red rounded-full text-white text-sm font-medium disabled:opacity-50"
              >
                Post Review
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Comments List */}
      {activeTab === 'comments' && (
        <div className="space-y-4">
          {songComments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <img 
                src={comment.userAvatar} 
                alt={comment.userName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="glass-card p-3 rounded-2xl rounded-tl-none">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-nia-red text-sm font-medium">{comment.userName}</span>
                    {comment.isPinned && (
                      <span className="text-xs px-2 py-0.5 bg-nia-red/20 text-nia-red rounded-full">
                        Pinned
                      </span>
                    )}
                  </div>
                  
                  {comment.type === 'video_reaction' && comment.videoUrl ? (
                    <div className="aspect-video bg-nia-gray-800 rounded-xl flex items-center justify-center">
                      <Play className="w-10 h-10 text-white" />
                    </div>
                  ) : (
                    <p className="text-white">{comment.content}</p>
                  )}
                </div>
                
                <div className="flex items-center gap-4 mt-1 ml-2">
                  <button 
                    onClick={() => likeComment(comment.id)}
                    className="flex items-center gap-1 text-nia-gray-400 text-sm hover:text-nia-red"
                  >
                    <Heart className="w-4 h-4" />
                    {comment.likes}
                  </button>
                  <button className="text-nia-gray-400 text-sm hover:text-white">
                    Reply
                  </button>
                  <span className="text-nia-gray-500 text-sm">{formatTime(comment.createdAt)}</span>
                </div>

                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="mt-3 ml-4 space-y-3">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-2">
                        <img 
                          src={reply.userAvatar} 
                          alt={reply.userName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="glass-card p-2 rounded-xl rounded-tl-none">
                            <span className="text-nia-red text-xs font-medium">{reply.userName}</span>
                            <p className="text-white text-sm">{reply.content}</p>
                          </div>
                          <span className="text-nia-gray-500 text-xs ml-2">{formatTime(reply.createdAt)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reviews List */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          {songReviews.map((review) => (
            <div key={review.id} className="glass-card p-4 rounded-2xl">
              <div className="flex items-start gap-3">
                <img 
                  src={review.userAvatar} 
                  alt={review.userName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-white font-medium">{review.userName}</span>
                      {review.isVerifiedPurchase && (
                        <span className="ml-2 text-xs px-2 py-0.5 bg-nia-green/20 text-nia-green rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                    <span className="text-nia-gray-500 text-sm">{formatTime(review.createdAt)}</span>
                  </div>
                  
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-nia-gray-600'}`} 
                      />
                    ))}
                  </div>
                  
                  <p className="text-white mt-2">{review.review}</p>
                  
                  {review.videoReaction && (
                    <div className="mt-3 aspect-video bg-nia-gray-800 rounded-xl flex items-center justify-center">
                      <Play className="w-10 h-10 text-white" />
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 mt-3">
                    <button 
                      onClick={() => likeReview(review.id)}
                      className="flex items-center gap-1 text-nia-gray-400 text-sm hover:text-nia-red"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      Helpful ({review.likes})
                    </button>
                    <button className="text-nia-gray-400 text-sm hover:text-white">
                      Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Video Reaction Modal */}
      {showReactionModal && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          <div className="flex items-center justify-between p-4">
            <h3 className="text-white text-lg font-bold">Record Video Reaction</h3>
            <button onClick={() => setShowReactionModal(false)}>
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
          <div className="flex-1 bg-nia-gray-900 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-nia-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-12 h-12 text-nia-gray-400" />
              </div>
              <p className="text-nia-gray-400">Camera preview would appear here</p>
            </div>
          </div>
          <div className="p-4 flex justify-center gap-4">
            <button className="w-16 h-16 bg-nia-red rounded-full flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-full" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentsSection;
