import { useState, useEffect } from 'react';
import { HomeScreen, SearchScreen, LibraryScreen, ProfileScreen, AuthScreen } from '@/screens';
import { CreatorAuthScreen, CreatorDashboard } from '@/screens/creator';
import { BottomNav, MiniPlayer, FullPlayer } from '@/components';
import { Messaging } from '@/components/social';
import { useAuthStore, useNavigationStore, useMusicStore } from '@/store/useStore';
import { useCreatorAuthStore } from '@/store/useCreatorStore';
import './App.css';

// App Mode: 'listener' | 'creator' | 'messaging'
type AppMode = 'listener' | 'creator' | 'messaging';

function App() {
  const [appMode, setAppMode] = useState<AppMode>('listener');
  const [showMessaging, setShowMessaging] = useState(false);
  
  // Listener Store
  const { isAuthenticated: isListenerAuth, isLoading: isListenerLoading } = useAuthStore();
  const { activeTab, isPlayerExpanded } = useNavigationStore();
  const { fetchSongs, fetchArtists, fetchPlaylists } = useMusicStore();
  
  // Creator Store
  const { isAuthenticated: isCreatorAuth, isLoading: isCreatorLoading } = useCreatorAuthStore();

  // Load initial data for listener mode
  useEffect(() => {
    if (isListenerAuth && appMode === 'listener') {
      fetchSongs();
      fetchArtists();
      fetchPlaylists();
    }
  }, [isListenerAuth, appMode, fetchSongs, fetchArtists, fetchPlaylists]);

  // Render listener screen
  const renderListenerScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'search':
        return <SearchScreen />;
      case 'library':
        return <LibraryScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  // Switch to creator mode
  const switchToCreator = () => {
    setAppMode('creator');
  };

  // Toggle messaging
  const toggleMessaging = () => {
    setShowMessaging(!showMessaging);
  };

  // Show loading screen
  if (isListenerLoading || isCreatorLoading) {
    return (
      <div className="min-h-screen bg-nia-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 border-4 border-nia-red/30 rounded-full" />
            <div className="absolute inset-0 border-4 border-nia-red border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-nia-gray-400 text-sm">Loading NiaTunes...</p>
        </div>
      </div>
    );
  }

  // CREATOR MODE
  if (appMode === 'creator') {
    // Show creator auth if not authenticated as creator
    if (!isCreatorAuth) {
      return (
        <CreatorAuthScreen 
          onAuthSuccess={() => {}} 
        />
      );
    }

    // Show creator dashboard
    return (
      <CreatorDashboard 
        onLogout={() => setAppMode('listener')} 
      />
    );
  }

  // LISTENER MODE
  // Show listener auth if not authenticated as listener
  if (!isListenerAuth) {
    return (
      <AuthScreen 
        onAuthSuccess={() => {}} 
      />
    );
  }

  return (
    <div className="grain-overlay">
      {/* Main Content */}
      <main className="min-h-screen bg-nia-black">
        {renderListenerScreen()}
      </main>

      {/* Mini Player */}
      {!isPlayerExpanded && <MiniPlayer />}

      {/* Full Player */}
      <FullPlayer />

      {/* Bottom Navigation */}
      {!isPlayerExpanded && <BottomNav />}

      {/* Floating Action Buttons */}
      <div className="fixed bottom-24 right-4 z-40 flex flex-col gap-3">
        {/* Messaging Button */}
        <button
          onClick={toggleMessaging}
          className="w-12 h-12 bg-nia-gray-800 rounded-full flex items-center justify-center shadow-lg hover:bg-nia-gray-700 transition-colors"
          title="Messages"
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>

        {/* Creator Mode Switch Button */}
        <button
          onClick={switchToCreator}
          className="w-12 h-12 bg-gradient-to-br from-nia-red to-nia-green rounded-full flex items-center justify-center shadow-glow hover:scale-110 transition-transform"
          title="Switch to Creator Mode"
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        </button>
      </div>

      {/* Messaging Modal */}
      {showMessaging && (
        <div className="fixed inset-0 z-50 bg-nia-black">
          <Messaging onClose={() => setShowMessaging(false)} />
        </div>
      )}
    </div>
  );
}

export default App;
