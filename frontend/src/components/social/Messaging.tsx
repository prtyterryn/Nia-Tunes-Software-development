import { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Phone, 
  Video, 
  Send, 
  Image as ImageIcon,
  Music,
  Smile,
  CheckCheck,
  ArrowLeft,
  Plus,
  Users,
  MoreVertical
} from 'lucide-react';
import { useMessagingStore } from '@/store/useSocialStore';
import { useAuthStore } from '@/store/useStore';

interface MessagingProps {
  onClose?: () => void;
}

export function Messaging({ onClose }: MessagingProps) {
  // onClose is used in the UI for closing the messaging modal
  const { user } = useAuthStore();
  const { conversations, contacts, activeConversation, setActiveConversation, addMessage } = useMessagingStore();
  const [showContacts, setShowContacts] = useState(false);
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find(c => c.id === activeConversation);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.lastMessage]);

  const handleSendMessage = () => {
    if (!messageText.trim() || !activeConversation) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      conversationId: activeConversation,
      senderId: user?.id || 'current-user',
      type: 'text' as const,
      content: messageText,
      isRead: false,
      createdAt: new Date().toISOString(),
    };

    addMessage(activeConversation, newMessage);
    setMessageText('');
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Conversation List View
  if (!activeConversation) {
    return (
      <div className="h-full flex flex-col bg-nia-black">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-nia-gray-800">
          <h2 className="text-white text-xl font-bold">Messages</h2>
          <div className="flex gap-2">
            <button 
              className="w-10 h-10 glass-btn flex items-center justify-center"
            >
              <Users className="w-5 h-5 text-white" />
            </button>
            <button 
              onClick={() => setShowContacts(true)}
              className="w-10 h-10 bg-nia-red rounded-full flex items-center justify-center"
            >
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nia-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full input-field pl-12"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => {
            const otherParticipant = conv.participants.find(p => p.id !== user?.id);
            return (
              <button
                key={conv.id}
                onClick={() => setActiveConversation(conv.id)}
                className="w-full flex items-center gap-3 p-4 hover:bg-nia-gray-800/50 transition-colors border-b border-nia-gray-800"
              >
                <div className="relative">
                  <img 
                    src={otherParticipant?.avatar} 
                    alt={otherParticipant?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {otherParticipant?.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-nia-green rounded-full border-2 border-nia-black" />
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-medium truncate">{conv.isGroup ? conv.groupName : otherParticipant?.name}</h4>
                    <span className="text-nia-gray-500 text-xs">
                      {formatTime(conv.lastMessage.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className={`text-sm truncate ${conv.unreadCount > 0 ? 'text-white' : 'text-nia-gray-400'}`}>
                      {conv.lastMessage.type === 'song' && '🎵 '}
                      {conv.lastMessage.type === 'image' && '📷 '}
                      {conv.lastMessage.content}
                    </p>
                    {conv.unreadCount > 0 && (
                      <span className="w-5 h-5 bg-nia-red rounded-full text-white text-xs flex items-center justify-center">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Contacts Modal */}
        {showContacts && (
          <div className="absolute inset-0 z-50 bg-nia-black">
            <div className="flex items-center justify-between p-4 border-b border-nia-gray-800">
              <div className="flex items-center gap-3">
                <button onClick={() => setShowContacts(false)}>
                  <ArrowLeft className="w-6 h-6 text-white" />
                </button>
                <h2 className="text-white text-xl font-bold">New Message</h2>
              </div>
            </div>

            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nia-gray-400" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  className="w-full input-field pl-12"
                />
              </div>
            </div>

            <div className="overflow-y-auto">
              <h3 className="text-nia-gray-400 text-sm px-4 py-2">On NiaTunes</h3>
              {contacts.filter(c => c.isOnNiaTunes).map((contact) => (
                <button
                  key={contact.id}
                  className="w-full flex items-center gap-3 p-4 hover:bg-nia-gray-800/50 transition-colors"
                >
                  <img 
                    src={contact.avatar} 
                    alt={contact.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 text-left">
                    <h4 className="text-white font-medium">{contact.name}</h4>
                    <p className="text-nia-gray-400 text-sm">{contact.mutualFriends} mutual friends</p>
                  </div>
                </button>
              ))}

              <h3 className="text-nia-gray-400 text-sm px-4 py-2">Invite to NiaTunes</h3>
              {contacts.filter(c => !c.isOnNiaTunes).map((contact) => (
                <button
                  key={contact.id}
                  className="w-full flex items-center gap-3 p-4 hover:bg-nia-gray-800/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-nia-gray-800 flex items-center justify-center">
                    <Users className="w-6 h-6 text-nia-gray-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-white font-medium">{contact.name}</h4>
                    <p className="text-nia-gray-400 text-sm">{contact.phoneNumber}</p>
                  </div>
                  <span className="px-3 py-1 bg-nia-red rounded-full text-white text-sm">Invite</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Active Chat View
  const otherParticipant = activeConv?.participants.find(p => p.id !== user?.id);

  return (
    <div className="h-full flex flex-col bg-nia-black">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-4 border-b border-nia-gray-800">
        <button onClick={() => setActiveConversation(null)}>
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <button onClick={onClose} className="ml-auto">
          <span className="text-nia-gray-400 text-sm">Close</span>
        </button>
        <img 
          src={activeConv?.isGroup ? activeConv.groupAvatar : otherParticipant?.avatar} 
          alt={activeConv?.isGroup ? activeConv.groupName : otherParticipant?.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <h4 className="text-white font-medium">
            {activeConv?.isGroup ? activeConv.groupName : otherParticipant?.name}
          </h4>
          <p className="text-nia-gray-400 text-xs">
            {otherParticipant?.isOnline ? 'Online' : 'Last seen recently'}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="w-10 h-10 glass-btn flex items-center justify-center">
            <Phone className="w-5 h-5 text-white" />
          </button>
          <button className="w-10 h-10 glass-btn flex items-center justify-center">
            <Video className="w-5 h-5 text-white" />
          </button>
          <button className="w-10 h-10 glass-btn flex items-center justify-center">
            <MoreVertical className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Mock messages for demo */}
        <div className="flex justify-center">
          <span className="text-nia-gray-500 text-xs">Today</span>
        </div>

        <div className="flex gap-3">
          <img src={otherParticipant?.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
          <div className="max-w-[70%]">
            <div className="bg-nia-gray-800 rounded-2xl rounded-tl-none px-4 py-2">
              <p className="text-white">Hey! Have you heard the new Alex K song?</p>
            </div>
            <span className="text-nia-gray-500 text-xs mt-1">10:30 AM</span>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <div className="max-w-[70%]">
            <div className="bg-nia-red rounded-2xl rounded-tr-none px-4 py-2">
              <p className="text-white">Yes! Nakupenda is fire! 🔥</p>
            </div>
            <div className="flex items-center justify-end gap-1 mt-1">
              <span className="text-nia-gray-500 text-xs">10:32 AM</span>
              <CheckCheck className="w-4 h-4 text-nia-green" />
            </div>
          </div>
        </div>

        {/* Shared Song */}
        <div className="flex gap-3 justify-end">
          <div className="max-w-[70%]">
            <div className="bg-nia-red rounded-2xl rounded-tr-none p-3">
              <div className="flex items-center gap-3 bg-black/20 rounded-xl p-2">
                <img src="/album-2.jpg" alt="" className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <p className="text-white font-medium">Nakupenda</p>
                  <p className="text-white/70 text-sm">Alex K</p>
                </div>
                <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Music className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-end gap-1 mt-1">
              <span className="text-nia-gray-500 text-xs">10:33 AM</span>
              <CheckCheck className="w-4 h-4 text-nia-green" />
            </div>
          </div>
        </div>

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-nia-gray-800">
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 glass-btn flex items-center justify-center">
            <Plus className="w-5 h-5 text-white" />
          </button>
          <button className="w-10 h-10 glass-btn flex items-center justify-center">
            <ImageIcon className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type a message..."
              className="w-full input-field pr-10"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2">
              <Smile className="w-5 h-5 text-nia-gray-400" />
            </button>
          </div>
          <button 
            onClick={handleSendMessage}
            className="w-10 h-10 bg-nia-red rounded-full flex items-center justify-center"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Messaging;
