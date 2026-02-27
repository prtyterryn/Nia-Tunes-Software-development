import { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Edit2, 
  Trash2, 
  Pin,
  Image as ImageIcon,
  X,
  Heart
} from 'lucide-react';
import { useArtistNotesStore } from '@/store/useSocialStore';
import { useCreatorAuthStore } from '@/store/useCreatorStore';
import type { ArtistNote } from '@/types/social';

export function ArtistNotesManager() {
  const { creator } = useCreatorAuthStore();
  const { notes, addNote, deleteNote, pinNote } = useArtistNotesStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingNote, setEditingNote] = useState<ArtistNote | null>(null);
  const [attachments, setAttachments] = useState<string[]>([]);

  const creatorNotes = notes.filter(n => n.creatorId === creator?.id);
  const pinnedNotes = creatorNotes.filter(n => n.isPinned);
  const unpinnedNotes = creatorNotes.filter(n => !n.isPinned);

  const handleSaveNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newNote: ArtistNote = {
      id: editingNote?.id || `note-${Date.now()}`,
      creatorId: creator?.id || '',
      songId: formData.get('songId') as string,
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      attachments: attachments,
      isPinned: editingNote?.isPinned || false,
      likes: editingNote?.likes || 0,
      createdAt: editingNote?.createdAt || new Date().toISOString(),
    };

    addNote(newNote);

    setShowAddModal(false);
    setEditingNote(null);
    setAttachments([]);
  };

  const handleAddAttachment = () => {
    // In real app, this would open file picker
    setAttachments([...attachments, `/album-${attachments.length + 1}.jpg`]);
  };

  return (
    <div className="space-y-6">
      {/* Info Card */}
      <div className="glass-card p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h4 className="text-white font-medium">Artist Notes</h4>
            <p className="text-nia-gray-400 text-sm mt-1">
              Share the story behind your music. Add photos, memories, and insights 
              that fans will love to discover.
            </p>
          </div>
        </div>
      </div>

      {/* Add Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="w-full py-4 border-2 border-dashed border-nia-gray-700 rounded-2xl text-nia-gray-400 hover:text-white hover:border-nia-red transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Write New Note
      </button>

      {/* Pinned Notes */}
      {pinnedNotes.length > 0 && (
        <div>
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Pin className="w-4 h-4 text-nia-red" />
            Pinned Notes
          </h3>
          <div className="space-y-4">
            {pinnedNotes.map((note) => (
              <NoteCard 
                key={note.id} 
                note={note} 
                onEdit={() => { setEditingNote(note); setAttachments(note.attachments); setShowAddModal(true); }}
                onDelete={() => deleteNote(note.id)}
                onPin={() => pinNote(note.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Notes */}
      <div>
        <h3 className="text-white font-semibold mb-4">All Notes</h3>
        <div className="space-y-4">
          {unpinnedNotes.map((note) => (
            <NoteCard 
              key={note.id} 
              note={note} 
              onEdit={() => { setEditingNote(note); setAttachments(note.attachments); setShowAddModal(true); }}
              onDelete={() => deleteNote(note.id)}
              onPin={() => pinNote(note.id)}
            />
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingNote) && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-xl font-bold">
                {editingNote ? 'Edit Note' : 'Write New Note'}
              </h3>
              <button 
                onClick={() => { setShowAddModal(false); setEditingNote(null); setAttachments([]); }}
                className="w-8 h-8 bg-nia-gray-800 rounded-lg flex items-center justify-center"
              >
                <X className="w-5 h-5 text-nia-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSaveNote} className="space-y-4">
              <div>
                <label className="text-nia-gray-400 text-sm block mb-1">Title</label>
                <input 
                  name="title"
                  type="text" 
                  defaultValue={editingNote?.title}
                  placeholder="e.g., The Story Behind Nakupenda"
                  className="w-full input-field"
                  required
                />
              </div>

              <div>
                <label className="text-nia-gray-400 text-sm block mb-1">Associated Song (Optional)</label>
                <select name="songId" className="w-full input-field">
                  <option value="">Select a song...</option>
                  <option value="song-1">Nakupenda</option>
                  <option value="song-2">Lala Salama</option>
                  <option value="upload-3">Behind the Music</option>
                </select>
              </div>

              <div>
                <label className="text-nia-gray-400 text-sm block mb-1">Your Story</label>
                <textarea 
                  name="content"
                  defaultValue={editingNote?.content}
                  placeholder="Share the story behind your music..."
                  rows={6}
                  className="w-full input-field resize-none"
                  required
                />
              </div>

              {/* Attachments */}
              <div>
                <label className="text-nia-gray-400 text-sm block mb-1">Photos</label>
                <div className="flex flex-wrap gap-2">
                  {attachments.map((attachment, i) => (
                    <div key={i} className="w-20 h-20 rounded-xl overflow-hidden relative">
                      <img src={attachment} alt="" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => setAttachments(attachments.filter((_, idx) => idx !== i))}
                        className="absolute top-1 right-1 w-5 h-5 bg-nia-red rounded-full flex items-center justify-center"
                      >
                        <X className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddAttachment}
                    className="w-20 h-20 border-2 border-dashed border-nia-gray-700 rounded-xl flex flex-col items-center justify-center text-nia-gray-400 hover:border-nia-red hover:text-nia-red transition-colors"
                  >
                    <ImageIcon className="w-6 h-6" />
                    <span className="text-xs mt-1">Add</span>
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowAddModal(false); setEditingNote(null); setAttachments([]); }}
                  className="flex-1 py-3 border border-nia-gray-700 rounded-full text-white font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                >
                  {editingNote ? 'Save Changes' : 'Publish Note'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

interface NoteCardProps {
  note: ArtistNote;
  onEdit: () => void;
  onDelete: () => void;
  onPin: () => void;
}

function NoteCard({ note, onEdit, onDelete, onPin }: NoteCardProps) {
  return (
    <div className={`glass-card p-4 rounded-2xl ${note.isPinned ? 'border border-nia-red/30' : ''}`}>
      <div className="flex gap-4">
        {note.attachments.length > 0 && (
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-nia-gray-800 flex-shrink-0">
            <img src={note.attachments[0]} alt="" className="w-full h-full object-cover" />
            {note.attachments.length > 1 && (
              <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/60 rounded text-white text-xs">
                +{note.attachments.length - 1}
              </div>
            )}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-white font-medium">{note.title}</h4>
              <p className="text-nia-gray-400 text-sm mt-1 line-clamp-2">{note.content}</p>
            </div>
            <div className="flex gap-1">
              <button 
                onClick={onPin}
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  note.isPinned ? 'bg-nia-red/20' : 'bg-nia-gray-800 hover:bg-nia-gray-700'
                }`}
              >
                <Pin className={`w-4 h-4 ${note.isPinned ? 'text-nia-red' : 'text-nia-gray-400'}`} />
              </button>
              <button 
                onClick={onEdit}
                className="w-8 h-8 bg-nia-gray-800 rounded-lg flex items-center justify-center hover:bg-nia-gray-700"
              >
                <Edit2 className="w-4 h-4 text-nia-gray-400" />
              </button>
              <button 
                onClick={onDelete}
                className="w-8 h-8 bg-nia-gray-800 rounded-lg flex items-center justify-center hover:bg-nia-red/20"
              >
                <Trash2 className="w-4 h-4 text-nia-red" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-3 text-nia-gray-400 text-sm">
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {note.likes} likes
            </span>
            <span>{new Date(note.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistNotesManager;
