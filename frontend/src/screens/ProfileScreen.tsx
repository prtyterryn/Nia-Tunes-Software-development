import { useState } from 'react';
import { 
  Settings, 
  ChevronRight, 
  Crown, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  Edit3,
  Music,
  Users,
  Clock,
  Heart
} from 'lucide-react';
import { useAuthStore } from '@/store/useStore';
import { formatNumber } from '@/data/mockData';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  action?: () => void;
}

export function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);

  const stats = [
    { label: 'Playlists', value: 12, icon: Music },
    { label: 'Following', value: 156, icon: Users },
    { label: 'Hours', value: 342, icon: Clock },
    { label: 'Liked', value: 487, icon: Heart },
  ];

  const menuItems: MenuItem[] = [
    { 
      id: 'premium', 
      label: 'NiaTunes Premium', 
      icon: Crown, 
      badge: 'Active',
      action: () => {}
    },
    { 
      id: 'notifications', 
      label: 'Notifications', 
      icon: Bell,
      action: () => {}
    },
    { 
      id: 'privacy', 
      label: 'Privacy & Security', 
      icon: Shield,
      action: () => {}
    },
    { 
      id: 'help', 
      label: 'Help & Support', 
      icon: HelpCircle,
      action: () => {}
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings,
      action: () => {}
    },
  ];

  const handleLogout = async () => {
    await logout();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-nia-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-nia-gray-400 mb-4">Please log in to view your profile</p>
          <button className="btn-primary">Log In</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nia-black pb-32">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-nia-black/95 backdrop-blur-md border-b border-nia-gray-800">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-white text-xl font-bold">Profile</h1>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="w-10 h-10 glass-btn flex items-center justify-center"
          >
            <Edit3 className="w-5 h-5 text-white" />
          </button>
        </div>
      </header>

      <div className="px-4 py-6 space-y-8">
        {/* Profile Header */}
        <section className="text-center">
          <div className="relative inline-block">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-nia-red/30 mx-auto">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            {user.isPremium && (
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center border-4 border-nia-black">
                <Crown className="w-4 h-4 text-nia-black" />
              </div>
            )}
          </div>
          
          <h2 className="text-white text-2xl font-bold mt-4">{user.name}</h2>
          <p className="text-nia-gray-400 text-sm">{user.email}</p>
          
          {user.isPremium && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-full mt-3">
              <Crown className="w-4 h-4 text-yellow-500" />
              <span className="text-yellow-500 text-sm font-medium">Premium Member</span>
            </div>
          )}
        </section>

        {/* Stats */}
        <section>
          <div className="grid grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div 
                key={stat.label}
                className="text-center p-3 glass-card rounded-xl"
              >
                <stat.icon className="w-5 h-5 text-nia-red mx-auto mb-2" />
                <p className="text-white text-lg font-bold">{formatNumber(stat.value)}</p>
                <p className="text-nia-gray-400 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Menu */}
        <section>
          <h3 className="text-white text-lg font-bold mb-4">Account</h3>
          <div className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full flex items-center gap-4 p-4 glass-card rounded-xl hover:bg-white/10 transition-colors"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  item.id === 'premium' 
                    ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' 
                    : 'bg-nia-gray-800'
                }`}>
                  <item.icon className={`w-5 h-5 ${
                    item.id === 'premium' ? 'text-nia-black' : 'text-white'
                  }`} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-white font-medium">{item.label}</p>
                </div>
                {item.badge && (
                  <span className="px-2 py-1 bg-nia-green/20 text-nia-green text-xs font-medium rounded-full">
                    {item.badge}
                  </span>
                )}
                <ChevronRight className="w-5 h-5 text-nia-gray-400" />
              </button>
            ))}
          </div>
        </section>

        {/* Logout */}
        <section>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-4 border border-nia-red/30 rounded-xl text-nia-red hover:bg-nia-red/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Log Out</span>
          </button>
        </section>

        {/* App Info */}
        <section className="text-center">
          <p className="text-nia-gray-600 text-xs">NiaTunes v1.0.0</p>
          <p className="text-nia-gray-600 text-xs mt-1">Made with ❤️ in Kenya</p>
        </section>
      </div>
    </div>
  );
}

export default ProfileScreen;
