import { useState } from 'react';
import { 
  LayoutDashboard, 
  Upload, 
  BarChart3, 
  Users, 
  Wallet, 
  Settings,
  Bell,
  LogOut,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Minus,
  Play,
  Heart,
  MessageCircle,
  DollarSign,
  Music,
  CheckCircle2,
  Clock,
  AlertCircle,
  ShoppingBag,
  Calendar,
  Video,
  FileText,
  Users2,
  Film
} from 'lucide-react';
import { useCreatorAuthStore, useCreatorDashboardStore } from '@/store/useCreatorStore';
import { 
  MerchandiseManager, 
  EventsManager, 
  CanvasManager, 
  LiveStreamManager,
  ArtistNotesManager,
  CollaborationManager 
} from '@/components/social';
import { formatCurrency, formatNumberCompact } from '@/data/creatorMockData';
import { streamAnalytics, demographicData, deviceData, ageGroupData, chartPositions } from '@/data/creatorMockData';
import type { CreatorUpload } from '@/types/creator';

interface CreatorDashboardProps {
  onLogout?: () => void;
}

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'uploads', label: 'Uploads', icon: Upload },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'subscribers', label: 'Subscribers', icon: Users },
  { id: 'earnings', label: 'Earnings', icon: Wallet },
  { id: 'merchandise', label: 'Merchandise', icon: ShoppingBag },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'canvas', label: 'Canvas', icon: Film },
  { id: 'live', label: 'Live Stream', icon: Video },
  { id: 'notes', label: 'Artist Notes', icon: FileText },
  { id: 'collaborations', label: 'Collaborations', icon: Users2 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function CreatorDashboard({ onLogout }: CreatorDashboardProps) {
  const { creator, logout } = useCreatorAuthStore();
  const { 
    stats, 
    uploads, 
    notifications, 
    unreadNotifications,
    subscriptionTiers,
    payouts,
    activeTab, 
    setActiveTab,
    markNotificationRead,
    markAllNotificationsRead
  } = useCreatorDashboardStore();
  
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    onLogout?.();
  };

  const getStatusIcon = (status: CreatorUpload['status']) => {
    switch (status) {
      case 'published':
        return <CheckCircle2 className="w-4 h-4 text-nia-green" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'draft':
        return <Minus className="w-4 h-4 text-nia-gray-400" />;
      case 'rejected':
        return <AlertCircle className="w-4 h-4 text-nia-red" />;
    }
  };

  const getStatusColor = (status: CreatorUpload['status']) => {
    switch (status) {
      case 'published':
        return 'text-nia-green bg-nia-green/10';
      case 'processing':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'draft':
        return 'text-nia-gray-400 bg-nia-gray-800';
      case 'rejected':
        return 'text-nia-red bg-nia-red/10';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="glass-card p-6 rounded-2xl bg-gradient-to-r from-nia-red/20 via-nia-black to-nia-green/20">
        <div className="flex items-center gap-4">
          <img 
            src={creator?.avatar} 
            alt={creator?.artistName}
            className="w-16 h-16 rounded-full object-cover border-2 border-nia-red"
          />
          <div>
            <h2 className="text-white text-xl font-bold">Welcome back, {creator?.artistName}! 👋</h2>
            <p className="text-nia-gray-400">Here's what's happening with your music today.</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-4 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-nia-red/20 rounded-xl flex items-center justify-center">
              <Play className="w-5 h-5 text-nia-red" />
            </div>
            <span className="text-nia-gray-400 text-sm">Total Streams</span>
          </div>
          <p className="text-2xl font-bold text-white">{formatNumberCompact(stats.totalStreams)}</p>
          <p className="text-nia-green text-xs mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +12% this month
          </p>
        </div>

        <div className="glass-card p-4 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-nia-green/20 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-nia-green" />
            </div>
            <span className="text-nia-gray-400 text-sm">Total Earnings</span>
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(stats.totalRevenue)}</p>
          <p className="text-nia-green text-xs mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +8% this month
          </p>
        </div>

        <div className="glass-card p-4 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-nia-gray-400 text-sm">Subscribers</span>
          </div>
          <p className="text-2xl font-bold text-white">{formatNumberCompact(stats.totalSubscribers)}</p>
          <p className="text-nia-green text-xs mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +{stats.newSubscribersThisMonth} this month
          </p>
        </div>

        <div className="glass-card p-4 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <Music className="w-5 h-5 text-purple-500" />
            </div>
            <span className="text-nia-gray-400 text-sm">Uploads</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.totalSongs + stats.totalPodcasts}</p>
          <p className="text-nia-gray-400 text-xs mt-1">
            {stats.totalSongs} songs • {stats.totalPodcasts} podcasts
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button 
            onClick={() => setActiveTab('uploads')}
            className="p-4 bg-nia-gray-800 rounded-xl hover:bg-nia-gray-700 transition-colors text-left"
          >
            <Upload className="w-6 h-6 text-nia-red mb-2" />
            <p className="text-white text-sm font-medium">Upload Song</p>
          </button>
          <button 
            onClick={() => setActiveTab('live')}
            className="p-4 bg-nia-gray-800 rounded-xl hover:bg-nia-gray-700 transition-colors text-left"
          >
            <Video className="w-6 h-6 text-nia-green mb-2" />
            <p className="text-white text-sm font-medium">Go Live</p>
          </button>
          <button 
            onClick={() => setActiveTab('merchandise')}
            className="p-4 bg-nia-gray-800 rounded-xl hover:bg-nia-gray-700 transition-colors text-left"
          >
            <ShoppingBag className="w-6 h-6 text-blue-500 mb-2" />
            <p className="text-white text-sm font-medium">Add Product</p>
          </button>
          <button 
            onClick={() => setActiveTab('events')}
            className="p-4 bg-nia-gray-800 rounded-xl hover:bg-nia-gray-700 transition-colors text-left"
          >
            <Calendar className="w-6 h-6 text-yellow-500 mb-2" />
            <p className="text-white text-sm font-medium">Create Event</p>
          </button>
        </div>
      </div>

      {/* Top Performing Song */}
      <div className="glass-card p-4 rounded-2xl">
        <h3 className="text-white font-semibold mb-4">Top Performing</h3>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-nia-gray-800">
            <img 
              src={uploads.find(u => u.id === stats.topPerformingSongId)?.cover || '/album-art.jpg'} 
              alt={stats.topPerformingSong}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h4 className="text-white font-medium">{stats.topPerformingSong}</h4>
            <p className="text-nia-gray-400 text-sm">
              {formatNumberCompact(uploads.find(u => u.id === stats.topPerformingSongId)?.streams || 0)} streams
            </p>
          </div>
          <div className="text-right">
            <p className="text-nia-green font-semibold">
              {formatCurrency(uploads.find(u => u.id === stats.topPerformingSongId)?.revenue || 0)}
            </p>
            <p className="text-nia-gray-400 text-xs">earned</p>
          </div>
        </div>
      </div>

      {/* Recent Uploads */}
      <div className="glass-card p-4 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Recent Uploads</h3>
          <button 
            onClick={() => setActiveTab('uploads')}
            className="text-nia-red text-sm flex items-center gap-1"
          >
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {uploads.slice(0, 3).map((upload) => (
            <div key={upload.id} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-nia-gray-800">
                <img src={upload.cover} alt={upload.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white text-sm truncate">{upload.title}</h4>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(upload.status)}`}>
                    {upload.status}
                  </span>
                  <span className="text-nia-gray-400 text-xs">{formatNumberCompact(upload.streams)} plays</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Position */}
      {chartPositions.length > 0 && (
        <div className="glass-card p-4 rounded-2xl">
          <h3 className="text-white font-semibold mb-4">Chart Performance</h3>
          <div className="space-y-3">
            {chartPositions.slice(0, 3).map((chart) => (
              <div key={chart.songId} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-nia-gray-800 flex items-center justify-center">
                  <span className="text-white font-bold">#{chart.position}</span>
                </div>
                <div className="w-10 h-10 rounded-lg overflow-hidden">
                  <img src={chart.cover} alt={chart.songTitle} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white text-sm">{chart.songTitle}</h4>
                  <p className="text-nia-gray-400 text-xs">Top 100 Kenya</p>
                </div>
                <div className="flex items-center gap-1">
                  {chart.trend === 'up' && <TrendingUp className="w-4 h-4 text-nia-green" />}
                  {chart.trend === 'down' && <TrendingDown className="w-4 h-4 text-nia-red" />}
                  {chart.trend === 'same' && <Minus className="w-4 h-4 text-nia-gray-400" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderUploads = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Your Uploads</h2>
        <button className="btn-primary flex items-center gap-2 text-sm">
          <Upload className="w-4 h-4" />
          Upload New
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto scroll-hide">
        {['All', 'Published', 'Processing', 'Drafts'].map((filter) => (
          <button
            key={filter}
            className="px-4 py-2 rounded-full bg-nia-gray-800 text-white text-sm hover:bg-nia-gray-700 transition-colors"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Uploads List */}
      <div className="space-y-3">
        {uploads.map((upload) => (
          <div key={upload.id} className="glass-card p-4 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-nia-gray-800 flex-shrink-0">
                <img src={upload.cover} alt={upload.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-white font-medium">{upload.title}</h4>
                    <p className="text-nia-gray-400 text-sm">{upload.type === 'song' ? 'Song' : 'Podcast'} • {upload.genre}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(upload.status)}`}>
                    {getStatusIcon(upload.status)}
                    {upload.status}
                  </span>
                </div>
                
                {upload.status === 'published' && (
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1 text-nia-gray-400 text-xs">
                      <Play className="w-3 h-3" />
                      {formatNumberCompact(upload.streams)}
                    </div>
                    <div className="flex items-center gap-1 text-nia-gray-400 text-xs">
                      <Heart className="w-3 h-3" />
                      {formatNumberCompact(upload.likes)}
                    </div>
                    <div className="flex items-center gap-1 text-nia-gray-400 text-xs">
                      <MessageCircle className="w-3 h-3" />
                      {formatNumberCompact(upload.comments)}
                    </div>
                    <div className="flex items-center gap-1 text-nia-green text-xs">
                      <DollarSign className="w-3 h-3" />
                      {formatCurrency(upload.revenue)}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-2 mt-3">
                  <button className="px-3 py-1.5 bg-nia-gray-800 rounded-lg text-white text-xs hover:bg-nia-gray-700 transition-colors">
                    Edit
                  </button>
                  <button className="px-3 py-1.5 bg-nia-gray-800 rounded-lg text-white text-xs hover:bg-nia-gray-700 transition-colors">
                    Stats
                  </button>
                  {upload.status === 'draft' && (
                    <button className="px-3 py-1.5 bg-nia-red rounded-lg text-white text-xs hover:bg-nia-red/80 transition-colors">
                      Publish
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Analytics</h2>

      {/* Stream Chart */}
      <div className="glass-card p-4 rounded-2xl">
        <h3 className="text-white font-semibold mb-4">Streams (Last 30 Days)</h3>
        <div className="h-48 flex items-end gap-1">
          {streamAnalytics.map((day) => {
            const maxStreams = Math.max(...streamAnalytics.map(d => d.streams));
            const height = (day.streams / maxStreams) * 100;
            return (
              <div
                key={day.date}
                className="flex-1 bg-nia-red/60 rounded-t hover:bg-nia-red transition-colors relative group"
                style={{ height: `${height}%` }}
              >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-nia-gray-800 rounded text-white text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">
                  {day.streams.toLocaleString()} streams
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-nia-gray-500 text-xs">
          <span>30 days ago</span>
          <span>Today</span>
        </div>
      </div>

      {/* Demographics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-4 rounded-2xl">
          <h3 className="text-white font-semibold mb-4">Top Countries</h3>
          <div className="space-y-3">
            {demographicData.slice(0, 5).map((country) => (
              <div key={country.country}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white">{country.country}</span>
                  <span className="text-nia-gray-400">{country.percentage}%</span>
                </div>
                <div className="h-2 bg-nia-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-nia-red to-nia-green rounded-full"
                    style={{ width: `${country.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl">
          <h3 className="text-white font-semibold mb-4">Age Groups</h3>
          <div className="space-y-3">
            {ageGroupData.map((age) => (
              <div key={age.ageGroup}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white">{age.ageGroup}</span>
                  <span className="text-nia-gray-400">{age.percentage}%</span>
                </div>
                <div className="h-2 bg-nia-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-nia-green to-blue-500 rounded-full"
                    style={{ width: `${age.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Devices */}
      <div className="glass-card p-4 rounded-2xl">
        <h3 className="text-white font-semibold mb-4">Devices</h3>
        <div className="flex gap-4">
          {deviceData.map((device) => (
            <div key={device.device} className="flex-1 text-center">
              <div className="relative w-20 h-20 mx-auto mb-2">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    fill="none"
                    stroke="#1A1A1A"
                    strokeWidth="8"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    fill="none"
                    stroke="#D32F2F"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${device.percentage * 2.26} 226`}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
                  {device.percentage}%
                </span>
              </div>
              <p className="text-nia-gray-400 text-sm">{device.device}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSubscribers = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Subscribers</h2>

      {/* Subscription Tiers */}
      <div className="space-y-4">
        {subscriptionTiers.map((tier) => (
          <div key={tier.id} className="glass-card p-4 rounded-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-white font-semibold">{tier.name}</h4>
                <p className="text-nia-gray-400 text-sm">{tier.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-nia-red font-bold">{formatCurrency(tier.price)}/mo</span>
                  <span className="text-nia-gray-500 text-sm">• {tier.subscriberCount} subscribers</span>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-nia-gray-800 rounded-lg text-white text-xs hover:bg-nia-gray-700 transition-colors">
                Edit
              </button>
            </div>
            <div className="mt-3 pt-3 border-t border-nia-gray-800">
              <p className="text-nia-gray-400 text-xs mb-2">Benefits:</p>
              <div className="flex flex-wrap gap-2">
                {tier.benefits.map((benefit, i) => (
                  <span key={i} className="text-xs text-nia-gray-400 bg-nia-gray-800 px-2 py-1 rounded">
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-3 border-2 border-dashed border-nia-gray-700 rounded-2xl text-nia-gray-400 hover:text-white hover:border-nia-gray-500 transition-colors">
        + Create New Tier
      </button>
    </div>
  );

  const renderEarnings = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Earnings</h2>

      {/* Earnings Summary */}
      <div className="glass-card p-6 rounded-2xl text-center">
        <p className="text-nia-gray-400 text-sm mb-2">Available Balance</p>
        <p className="text-4xl font-bold text-white mb-4">{formatCurrency(stats.monthlyRevenue)}</p>
        <button className="btn-primary">
          Request Payout
        </button>
        <p className="text-nia-gray-500 text-xs mt-3">
          Minimum payout: $50.00
        </p>
      </div>

      {/* Revenue Breakdown */}
      <div className="glass-card p-4 rounded-2xl">
        <h3 className="text-white font-semibold mb-4">Revenue Breakdown</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-nia-red/20 rounded-xl flex items-center justify-center">
                <Play className="w-5 h-5 text-nia-red" />
              </div>
              <div>
                <p className="text-white text-sm">Streaming Revenue</p>
                <p className="text-nia-gray-400 text-xs">From plays & downloads</p>
              </div>
            </div>
            <p className="text-white font-semibold">{formatCurrency(stats.monthlyRevenue * 0.6)}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-nia-green/20 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-nia-green" />
              </div>
              <div>
                <p className="text-white text-sm">Subscriptions</p>
                <p className="text-nia-gray-400 text-xs">Fan subscriptions</p>
              </div>
            </div>
            <p className="text-white font-semibold">{formatCurrency(stats.monthlyRevenue * 0.3)}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-white text-sm">Tips & Donations</p>
                <p className="text-nia-gray-400 text-xs">Direct fan support</p>
              </div>
            </div>
            <p className="text-white font-semibold">{formatCurrency(stats.monthlyRevenue * 0.1)}</p>
          </div>
        </div>
      </div>

      {/* Payout History */}
      <div className="glass-card p-4 rounded-2xl">
        <h3 className="text-white font-semibold mb-4">Payout History</h3>
        <div className="space-y-3">
          {payouts.map((payout) => (
            <div key={payout.id} className="flex items-center justify-between py-2 border-b border-nia-gray-800 last:border-0">
              <div>
                <p className="text-white font-medium">{formatCurrency(payout.amount)}</p>
                <p className="text-nia-gray-400 text-xs">
                  {new Date(payout.requestedAt).toLocaleDateString()} • {payout.method}
                </p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                payout.status === 'completed' ? 'bg-nia-green/20 text-nia-green' :
                payout.status === 'processing' ? 'bg-yellow-500/20 text-yellow-500' :
                'bg-nia-gray-800 text-nia-gray-400'
              }`}>
                {payout.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Settings</h2>

      {/* Profile Settings */}
      <div className="glass-card p-4 rounded-2xl">
        <h3 className="text-white font-semibold mb-4">Profile</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img src={creator?.avatar} alt={creator?.artistName} className="w-full h-full object-cover" />
            </div>
            <div>
              <button className="text-nia-red text-sm font-medium">Change Photo</button>
              <p className="text-nia-gray-400 text-xs">JPG, PNG. Max 2MB</p>
            </div>
          </div>
          
          <div>
            <label className="text-nia-gray-400 text-sm block mb-1">Display Name</label>
            <input 
              type="text" 
              defaultValue={creator?.artistName}
              className="w-full input-field"
            />
          </div>
          
          <div>
            <label className="text-nia-gray-400 text-sm block mb-1">Bio</label>
            <textarea 
              defaultValue={creator?.bio}
              rows={3}
              className="w-full input-field resize-none"
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="glass-card p-4 rounded-2xl">
        <h3 className="text-white font-semibold mb-4">Social Links</h3>
        <div className="space-y-3">
          {Object.entries(creator?.socialLinks || {}).map(([platform, url]) => (
            <div key={platform}>
              <label className="text-nia-gray-400 text-sm block mb-1 capitalize">{platform}</label>
              <input 
                type="text" 
                defaultValue={url}
                placeholder={`Your ${platform} URL`}
                className="w-full input-field"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Payout Settings */}
      <div className="glass-card p-4 rounded-2xl">
        <h3 className="text-white font-semibold mb-4">Payout Method</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-nia-green/10 border border-nia-green/30 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-nia-green" />
            <div className="flex-1">
              <p className="text-white text-sm">M-Pesa</p>
              <p className="text-nia-gray-400 text-xs">{creator?.bankDetails?.mpesaNumber}</p>
            </div>
            <button className="text-nia-red text-sm">Edit</button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="glass-card p-4 rounded-2xl border border-nia-red/30">
        <h3 className="text-nia-red font-semibold mb-4">Danger Zone</h3>
        <button 
          onClick={handleLogout}
          className="w-full py-3 border border-nia-red/50 rounded-xl text-nia-red hover:bg-nia-red/10 transition-colors flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'uploads':
        return renderUploads();
      case 'analytics':
        return renderAnalytics();
      case 'subscribers':
        return renderSubscribers();
      case 'earnings':
        return renderEarnings();
      case 'merchandise':
        return <MerchandiseManager />;
      case 'events':
        return <EventsManager />;
      case 'canvas':
        return <CanvasManager />;
      case 'live':
        return <LiveStreamManager />;
      case 'notes':
        return <ArtistNotesManager />;
      case 'collaborations':
        return <CollaborationManager />;
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-nia-black flex">
      {/* Sidebar (Desktop) */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-nia-gray-800 p-4">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 bg-gradient-to-br from-nia-red to-nia-green rounded-xl flex items-center justify-center">
            <Music className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold">Creator</h1>
            <p className="text-nia-gray-400 text-xs">Studio</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as typeof activeTab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${
                activeTab === item.id
                  ? 'bg-nia-red text-white'
                  : 'text-nia-gray-400 hover:bg-nia-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium truncate">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Creator Profile */}
        <div className="mt-auto pt-4 border-t border-nia-gray-800">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img src={creator?.avatar} alt={creator?.artistName} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{creator?.artistName}</p>
              <p className="text-nia-gray-400 text-xs truncate capitalize">{creator?.creatorType}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-nia-black/95 backdrop-blur-md border-b border-nia-gray-800">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-white text-xl font-bold capitalize lg:hidden">{activeTab}</h2>
            <h2 className="text-white text-xl font-bold capitalize hidden lg:block">{activeTab}</h2>
            
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="w-10 h-10 glass-btn flex items-center justify-center relative"
                >
                  <Bell className="w-5 h-5 text-white" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-nia-red rounded-full text-white text-xs flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>
                
                {/* Notification Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 glass-card rounded-2xl overflow-hidden z-50">
                    <div className="flex items-center justify-between p-4 border-b border-nia-gray-800">
                      <h4 className="text-white font-semibold">Notifications</h4>
                      <button 
                        onClick={markAllNotificationsRead}
                        className="text-nia-red text-xs"
                      >
                        Mark all read
                      </button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div 
                          key={notif.id}
                          onClick={() => markNotificationRead(notif.id)}
                          className={`p-4 border-b border-nia-gray-800 cursor-pointer hover:bg-white/5 transition-colors ${
                            !notif.read ? 'bg-nia-red/5' : ''
                          }`}
                        >
                          <p className="text-white text-sm font-medium">{notif.title}</p>
                          <p className="text-nia-gray-400 text-xs mt-1">{notif.message}</p>
                          <p className="text-nia-gray-500 text-xs mt-2">
                            {new Date(notif.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex overflow-x-auto scroll-hide px-4 pb-3 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  activeTab === item.id
                    ? 'bg-nia-red text-white'
                    : 'bg-nia-gray-800 text-nia-gray-400'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-4 lg:p-6 pb-24 lg:pb-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default CreatorDashboard;
