import { Home, Search, Library, User } from 'lucide-react';
import type { TabType } from '@/types';
import { useNavigationStore } from '@/store/useStore';

interface NavItem {
  id: TabType;
  label: string;
  icon: typeof Home;
  activeIcon: typeof Home;
}

const navItems: NavItem[] = [
  { 
    id: 'home', 
    label: 'Home', 
    icon: Home,
    activeIcon: Home
  },
  { 
    id: 'search', 
    label: 'Search', 
    icon: Search,
    activeIcon: Search
  },
  { 
    id: 'library', 
    label: 'Library', 
    icon: Library,
    activeIcon: Library
  },
  { 
    id: 'profile', 
    label: 'Profile', 
    icon: User,
    activeIcon: User
  },
];

export function BottomNav() {
  const { activeTab, setActiveTab } = useNavigationStore();

  return (
    <nav className="bottom-nav z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = isActive ? item.activeIcon : item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'text-nia-red' 
                  : 'text-nia-gray-400 hover:text-white'
              }`}
            >
              {/* Active Indicator */}
              {isActive && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-nia-red rounded-full" />
              )}
              
              {/* Icon */}
              <div className={`relative transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
                <Icon 
                  className={`w-6 h-6 transition-all duration-300 ${
                    isActive ? 'stroke-[2.5px]' : 'stroke-2'
                  }`} 
                  fill={isActive ? 'currentColor' : 'none'}
                />
              </div>
              
              {/* Label */}
              <span className={`text-[10px] font-medium transition-all duration-300 ${
                isActive ? 'opacity-100' : 'opacity-70'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNav;
