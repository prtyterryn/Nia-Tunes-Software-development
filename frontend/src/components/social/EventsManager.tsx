import { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Plus, 
  Edit2, 
  Trash2,
  Video,
  Music,
  Users2,
  X,
  Share2
} from 'lucide-react';
import { useEventsStore } from '@/store/useSocialStore';
import { useCreatorAuthStore } from '@/store/useCreatorStore';
import type { Event } from '@/types/social';

export function EventsManager() {
  const { creator } = useCreatorAuthStore();
  const { events, announcements, deleteEvent, deleteAnnouncement } = useEventsStore();
  const [activeTab, setActiveTab] = useState<'events' | 'announcements'>('events');
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState<'event' | 'announcement'>('event');

  const creatorEvents = events.filter(e => e.creatorId === creator?.id);
  const creatorAnnouncements = announcements.filter(a => a.creatorId === creator?.id);

  const getEventIcon = (type: Event['type']) => {
    switch (type) {
      case 'concert': return Music;
      case 'tour': return MapPin;
      case 'release': return Music;
      case 'meet_greet': return Users2;
      case 'live_stream': return Video;
      default: return Calendar;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('events')}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
            activeTab === 'events'
              ? 'bg-nia-red text-white'
              : 'bg-nia-gray-800 text-nia-gray-400 hover:bg-nia-gray-700'
          }`}
        >
          Events & Tours
        </button>
        <button
          onClick={() => setActiveTab('announcements')}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
            activeTab === 'announcements'
              ? 'bg-nia-red text-white'
              : 'bg-nia-gray-800 text-nia-gray-400 hover:bg-nia-gray-700'
          }`}
        >
          Announcements
        </button>
      </div>

      {/* Add Button */}
      <button
        onClick={() => { setModalType(activeTab === 'events' ? 'event' : 'announcement'); setShowAddModal(true); }}
        className="w-full py-4 border-2 border-dashed border-nia-gray-700 rounded-2xl text-nia-gray-400 hover:text-white hover:border-nia-red transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        {activeTab === 'events' ? 'Create New Event' : 'Post Announcement'}
      </button>

      {/* Events List */}
      {activeTab === 'events' && (
        <div className="space-y-4">
          {creatorEvents.map((event) => {
            const EventIcon = getEventIcon(event.type);
            return (
              <div key={event.id} className="glass-card p-4 rounded-2xl">
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-nia-gray-800 flex-shrink-0">
                    <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <EventIcon className="w-4 h-4 text-nia-red" />
                          <span className="text-nia-gray-400 text-xs uppercase">{event.type}</span>
                        </div>
                        <h4 className="text-white font-medium">{event.title}</h4>
                      </div>
                      <div className="flex gap-1">
                        <button className="w-8 h-8 bg-nia-gray-800 rounded-lg flex items-center justify-center hover:bg-nia-gray-700">
                          <Edit2 className="w-4 h-4 text-nia-gray-400" />
                        </button>
                        <button 
                          onClick={() => deleteEvent(event.id)}
                          className="w-8 h-8 bg-nia-gray-800 rounded-lg flex items-center justify-center hover:bg-nia-red/20"
                        >
                          <Trash2 className="w-4 h-4 text-nia-red" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-2 text-nia-gray-400 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(event.startDate)}
                      </span>
                      {!event.isVirtual && event.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.location.city}
                        </span>
                      )}
                      {event.isVirtual && (
                        <span className="flex items-center gap-1">
                          <Video className="w-4 h-4" />
                          Virtual
                        </span>
                      )}
                    </div>

                    {event.ticketInfo && (
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-nia-red font-semibold">
                          ${event.ticketInfo.price}
                        </span>
                        <span className="text-nia-gray-400 text-sm">
                          {event.ticketInfo.soldTickets}/{event.ticketInfo.availableTickets + event.ticketInfo.soldTickets} sold
                        </span>
                        <span className="text-nia-green text-sm">
                          {event.attendees} attending
                        </span>
                      </div>
                    )}

                    <div className="flex gap-2 mt-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        event.status === 'upcoming' ? 'bg-blue-500/20 text-blue-500' :
                        event.status === 'ongoing' ? 'bg-nia-green/20 text-nia-green' :
                        event.status === 'completed' ? 'bg-nia-gray-800 text-nia-gray-400' :
                        'bg-nia-red/20 text-nia-red'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Announcements List */}
      {activeTab === 'announcements' && (
        <div className="space-y-4">
          {creatorAnnouncements.map((announcement) => (
            <div key={announcement.id} className="glass-card p-4 rounded-2xl">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-nia-gray-800 flex-shrink-0">
                  <img src={announcement.attachments[0]} alt={announcement.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-nia-red text-xs uppercase">{announcement.type}</span>
                      <h4 className="text-white font-medium">{announcement.title}</h4>
                    </div>
                    <div className="flex gap-1">
                      <button className="w-8 h-8 bg-nia-gray-800 rounded-lg flex items-center justify-center hover:bg-nia-gray-700">
                        <Share2 className="w-4 h-4 text-nia-gray-400" />
                      </button>
                      <button 
                        onClick={() => deleteAnnouncement(announcement.id)}
                        className="w-8 h-8 bg-nia-gray-800 rounded-lg flex items-center justify-center hover:bg-nia-red/20"
                      >
                        <Trash2 className="w-4 h-4 text-nia-red" />
                      </button>
                    </div>
                  </div>

                  <p className="text-nia-gray-400 text-sm mt-1 line-clamp-2">{announcement.content}</p>

                  <div className="flex items-center gap-4 mt-3 text-nia-gray-400 text-sm">
                    <span className="flex items-center gap-1">
                      {announcement.likes} likes
                    </span>
                    <span className="flex items-center gap-1">
                      {announcement.comments} comments
                    </span>
                    <span className="flex items-center gap-1">
                      {announcement.shares} shares
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-xl font-bold">
                {modalType === 'event' ? 'Create New Event' : 'Post Announcement'}
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 bg-nia-gray-800 rounded-lg flex items-center justify-center"
              >
                <X className="w-5 h-5 text-nia-gray-400" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="text-nia-gray-400 text-sm block mb-1">Title</label>
                <input 
                  type="text" 
                  placeholder={modalType === 'event' ? 'Event name' : 'Announcement title'}
                  className="w-full input-field"
                />
              </div>

              <div>
                <label className="text-nia-gray-400 text-sm block mb-1">Description</label>
                <textarea 
                  placeholder="Add details..."
                  rows={3}
                  className="w-full input-field resize-none"
                />
              </div>

              {modalType === 'event' && (
                <>
                  <div>
                    <label className="text-nia-gray-400 text-sm block mb-1">Event Type</label>
                    <select className="w-full input-field">
                      <option value="concert">Concert</option>
                      <option value="tour">Tour</option>
                      <option value="release">Release Party</option>
                      <option value="meet_greet">Meet & Greet</option>
                      <option value="live_stream">Live Stream</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-nia-gray-400 text-sm block mb-1">Date & Time</label>
                      <input 
                        type="datetime-local" 
                        className="w-full input-field"
                      />
                    </div>
                    <div>
                      <label className="text-nia-gray-400 text-sm block mb-1">Ticket Price ($)</label>
                      <input 
                        type="number" 
                        placeholder="25.00"
                        className="w-full input-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-nia-gray-400 text-sm block mb-1">Location</label>
                    <input 
                      type="text" 
                      placeholder="Venue name, City"
                      className="w-full input-field"
                    />
                  </div>
                </>
              )}

              {modalType === 'announcement' && (
                <div>
                  <label className="text-nia-gray-400 text-sm block mb-1">Announcement Type</label>
                  <select className="w-full input-field">
                    <option value="general">General</option>
                    <option value="album_drop">Album Drop</option>
                    <option value="single_release">Single Release</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="milestone">Milestone</option>
                  </select>
                </div>
              )}

              <div>
                <label className="text-nia-gray-400 text-sm block mb-1">Cover Image</label>
                <div className="border-2 border-dashed border-nia-gray-700 rounded-xl p-8 text-center">
                  <Calendar className="w-12 h-12 text-nia-gray-600 mx-auto mb-2" />
                  <p className="text-nia-gray-400 text-sm">Upload cover image</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 border border-nia-gray-700 rounded-full text-white font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                >
                  {modalType === 'event' ? 'Create Event' : 'Post Announcement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventsManager;
