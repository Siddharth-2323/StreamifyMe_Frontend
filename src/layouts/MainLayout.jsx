import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Home, Search, Heart, Upload, Library, Settings, LogOut, Music, Bell, User, Spotify, Menu, ListMusic } from 'lucide-react';
import NowPlayingBar from '@/components/NowPlayingBar';
import QueuePanel from '@/components/QueuePanel';

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isQueuePanelOpen, setIsQueuePanelOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/home', icon: Home },
    { name: 'Smart Search', path: '/search', icon: Search },
    { name: 'Now Playing', path: '/now-playing', icon: Music },
    { name: 'Favorites', path: '/favorites', icon: Heart },
    { name: 'Uploads', path: '/upload', icon: Upload },
    { name: 'My library', path: '/library', icon: Library },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans relative">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0 w-64 bg-white shadow-md flex flex-col justify-between py-4 px-2 transition-transform duration-300 ease-in-out`}
      >
        <div>
          <div className="flex items-center justify-center mb-6">
            <img src="/logo.png" alt="StreamifyMe Logo" className="h-10" /> {/* Assuming a logo.png in public folder */}
            <span className="ml-2 text-2xl font-bold text-gray-800">StreamifyMe</span>
          </div>
          <nav>
            <ul>
              {navLinks.map((link) => (
                <li key={link.name} className="mb-2">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-lg text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition-colors duration-200 ${isActive ? 'bg-purple-100 text-purple-700 font-semibold' : ''}`
                    }
                    onClick={() => setIsSidebarOpen(false)} // Close sidebar on nav click
                  >
                    <link.icon className="h-5 w-5 mr-3" />
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Settings and Log out */}
        <div className="mt-auto">
          <ul>
            <li className="mb-2">
              <Link
                to="/spotify-integration"
                className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition-colors duration-200"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Spotify className="h-5 w-5 mr-3" />
                Spotify Integration
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/settings"
                className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition-colors duration-200"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </Link>
            </li>
            <li>
              <Link
                to="/logout"
                className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition-colors duration-200"
                onClick={() => setIsSidebarOpen(false)}
              >
                <LogOut className="h-5 w-5 mr-3" />
                Log out
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Overlay for mobile sidebar and queue panel */}
      {(isSidebarOpen || isQueuePanelOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => { setIsSidebarOpen(false); setIsQueuePanelOpen(false); }}
        ></div>
      )}

      {/* Main content area */}
      <div className="flex flex-col flex-1 lg:ml-64">
        {/* Header */}
        <header className="flex items-center justify-between h-16 bg-white shadow-md px-4">
          <button className="lg:hidden mr-4 p-2 rounded-md hover:bg-gray-200" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
          <div className="relative flex-1 max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search across platforms"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="h-6 w-6 text-gray-600 cursor-pointer hover:text-purple-700" />
            <div className="flex items-center cursor-pointer hidden md:flex">
              <User className="h-6 w-6 text-gray-600 mr-2" />
              <span className="text-gray-700 font-medium">User Profile</span>
            </div>
            <button className="lg:hidden p-2 rounded-md hover:bg-gray-200" onClick={() => setIsQueuePanelOpen(!isQueuePanelOpen)}>
              <ListMusic className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50 mb-20">
          {children}
        </main>

        {/* Now Playing Bar */}
        <NowPlayingBar onQueueToggle={() => setIsQueuePanelOpen(!isQueuePanelOpen)} />
      </div>

      {/* Queue Panel */}
      <QueuePanel isOpen={isQueuePanelOpen} onClose={() => setIsQueuePanelOpen(false)} />
    </div>
  );
};

export default MainLayout; 