import { useState } from 'react';
import { 
  Users, 
  Plus, 
  CheckCircle2,
  TrendingUp,
  X,
  Check,
  AlertCircle
} from 'lucide-react';
import { useCollaborationStore } from '@/store/useSocialStore';
import { useCreatorAuthStore } from '@/store/useCreatorStore';
import type { CollaborationPost, CollaborationPartner } from '@/types/social';

export function CollaborationManager() {
  const { creator } = useCreatorAuthStore();
  const { createCollaboration, approveCollaboration, getPendingCollaborations, getCreatorCollaborations } = useCollaborationStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCollaborators, setSelectedCollaborators] = useState<string[]>([]);

  const creatorCollaborations = getCreatorCollaborations(creator?.id || '');
  const pendingCollaborations = getPendingCollaborations(creator?.id || '');

  const availableCollaborators = [
    { id: 'artist-1', name: 'Zahara', avatar: '/artist-1.jpg', genre: 'Afrobeat' },
    { id: 'artist-2', name: 'King Kaka', avatar: '/artist-2.jpg', genre: 'Hip Hop' },
    { id: 'artist-3', name: 'Mercy Masika', avatar: '/artist-3.jpg', genre: 'Gospel' },
    { id: 'creator-teremi', name: 'Teremi King', avatar: '/teremi-king.jpg', genre: 'Afro-fusion' },
  ];

  const toggleCollaborator = (id: string) => {
    setSelectedCollaborators(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleCreateCollaboration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const collaborators: CollaborationPartner[] = [
      {
        creatorId: creator?.id || '',
        name: creator?.artistName || '',
        avatar: creator?.avatar || '',
        hasApproved: true,
        postedAt: new Date().toISOString(),
      },
      ...selectedCollaborators.map(id => {
        const collab = availableCollaborators.find(c => c.id === id);
        return {
          creatorId: id,
          name: collab?.name || '',
          avatar: collab?.avatar || '',
          hasApproved: false,
        };
      }),
    ];

    const newPost: CollaborationPost = {
      id: `collab-${Date.now()}`,
      primaryCreatorId: creator?.id || '',
      collaborators,
      songId: formData.get('songId') as string,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      coverImage: '/album-2.jpg',
      isPostedOnAll: false,
      individualPosts: collaborators.map(c => ({
        creatorId: c.creatorId,
        postId: '',
        isPosted: c.creatorId === creator?.id,
        engagement: { likes: 0, comments: 0, shares: 0 },
      })),
      totalEngagement: {
        likes: 0,
        comments: 0,
        shares: 0,
        streams: 0,
      },
      createdAt: new Date().toISOString(),
    };

    createCollaboration(newPost);
    setShowCreateModal(false);
    setSelectedCollaborators([]);
  };

  return (
    <div className="space-y-6">
      {/* Info Card */}
      <div className="glass-card p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Users className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h4 className="text-white font-medium">Collaboration Posts</h4>
            <p className="text-nia-gray-400 text-sm mt-1">
              Create posts that appear on multiple artists' pages. Boost engagement 
              by sharing each other's audiences!
            </p>
          </div>
        </div>
      </div>

      {/* Create Button */}
      <button
        onClick={() => setShowCreateModal(true)}
        className="w-full py-4 border-2 border-dashed border-purple-500/50 rounded-2xl text-purple-400 hover:bg-purple-500/10 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Create Collaboration
      </button>

      {/* Pending Approvals */}
      {pendingCollaborations.length > 0 && (
        <div>
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-500" />
            Pending Your Approval
          </h3>
          <div className="space-y-4">
            {pendingCollaborations.map((collab) => (
              <div key={collab.id} className="glass-card p-4 rounded-2xl border border-yellow-500/30">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-nia-gray-800 flex-shrink-0">
                    <img src={collab.coverImage} alt={collab.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{collab.title}</h4>
                    <p className="text-nia-gray-400 text-sm line-clamp-2">{collab.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex -space-x-2">
                        {collab.collaborators.map((c) => (
                          <img 
                            key={c.creatorId} 
                            src={c.avatar} 
                            alt={c.name}
                            className="w-6 h-6 rounded-full border-2 border-nia-black"
                          />
                        ))}
                      </div>
                      <span className="text-nia-gray-400 text-xs">
                        {collab.collaborators.length} artists
                      </span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button 
                        onClick={() => approveCollaboration(collab.id, creator?.id || '')}
                        className="px-4 py-2 bg-nia-green rounded-lg text-white text-sm font-medium flex items-center gap-1"
                      >
                        <Check className="w-4 h-4" />
                        Approve
                      </button>
                      <button className="px-4 py-2 bg-nia-gray-800 rounded-lg text-nia-gray-400 text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Collaborations */}
      <div>
        <h3 className="text-white font-semibold mb-4">Your Collaborations</h3>
        <div className="space-y-4">
          {creatorCollaborations.map((collab) => (
            <div key={collab.id} className="glass-card p-4 rounded-2xl">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-nia-gray-800 flex-shrink-0">
                  <img src={collab.coverImage} alt={collab.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-white font-medium">{collab.title}</h4>
                      <p className="text-nia-gray-400 text-sm line-clamp-1">{collab.description}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      collab.isPostedOnAll 
                        ? 'bg-nia-green/20 text-nia-green' 
                        : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {collab.isPostedOnAll ? 'Posted' : 'Pending'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex -space-x-2">
                      {collab.collaborators.map((c) => (
                        <img 
                          key={c.creatorId} 
                          src={c.avatar} 
                          alt={c.name}
                          className={`w-6 h-6 rounded-full border-2 border-nia-black ${
                            c.hasApproved ? '' : 'opacity-50'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-nia-gray-400 text-xs">
                      {collab.collaborators.filter(c => c.hasApproved).length}/{collab.collaborators.length} approved
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-nia-gray-400 text-sm">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {collab.totalEngagement.streams.toLocaleString()} streams
                    </span>
                    <span>{collab.totalEngagement.likes} likes</span>
                    <span>{collab.totalEngagement.shares} shares</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-xl font-bold">Create Collaboration</h3>
              <button onClick={() => setShowCreateModal(false)}>
                <X className="w-5 h-5 text-nia-gray-400" />
              </button>
            </div>

            <form onSubmit={handleCreateCollaboration} className="space-y-4">
              <div>
                <label className="text-nia-gray-400 text-sm block mb-1">Post Title</label>
                <input 
                  name="title"
                  type="text" 
                  placeholder="e.g., New Collab Out Now!"
                  className="w-full input-field"
                  required
                />
              </div>

              <div>
                <label className="text-nia-gray-400 text-sm block mb-1">Description</label>
                <textarea 
                  name="description"
                  placeholder="What do you want to say about this collaboration?"
                  rows={3}
                  className="w-full input-field resize-none"
                  required
                />
              </div>

              <div>
                <label className="text-nia-gray-400 text-sm block mb-1">Select Song</label>
                <select name="songId" className="w-full input-field">
                  <option value="">Choose the collaboration song...</option>
                  <option value="song-1">Nakupenda (feat. Zahara)</option>
                  <option value="upload-3">Behind the Music</option>
                </select>
              </div>

              <div>
                <label className="text-nia-gray-400 text-sm block mb-1">Select Collaborators</label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {availableCollaborators.map((artist) => (
                    <button
                      key={artist.id}
                      type="button"
                      onClick={() => toggleCollaborator(artist.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                        selectedCollaborators.includes(artist.id)
                          ? 'bg-nia-red/20 border border-nia-red'
                          : 'bg-nia-gray-800 hover:bg-nia-gray-700'
                      }`}
                    >
                      <img src={artist.avatar} alt={artist.name} className="w-10 h-10 rounded-full" />
                      <div className="flex-1 text-left">
                        <p className="text-white font-medium">{artist.name}</p>
                        <p className="text-nia-gray-400 text-sm">{artist.genre}</p>
                      </div>
                      {selectedCollaborators.includes(artist.id) && (
                        <CheckCircle2 className="w-5 h-5 text-nia-red" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-3 border border-nia-gray-700 rounded-full text-white font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={selectedCollaborators.length === 0}
                  className="flex-1 btn-primary disabled:opacity-50"
                >
                  Send Invites
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CollaborationManager;
