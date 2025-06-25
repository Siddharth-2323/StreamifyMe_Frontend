import React from 'react';
import { X } from 'lucide-react';
import { usePlayback } from '@/context/PlaybackContext';

const QueuePanel = ({ isOpen, onClose }) => {
  const { queue, currentSong } = usePlayback();

  // Dummy user activity for now, will be replaced with real data later
  const userActivity = [
    { id: 1, user: 'User Activity', action: 'is listening to Chill Vibes', time: '30 min.' },
    { id: 2, user: 'User B.', action: 'is downloading Beats for Study', time: '30 min.' },
    { id: 3, user: 'User C.', action: 'commented liked your playlist "Chill Beats" ', time: '30 min.' },
    { id: 4, user: 'User D.', action: 'uploaded new mix Summer Vibes', time: '30 min.' },
    { id: 5, user: 'User E.', action: 'is listening to Cooking Beats', time: '30 min.' },
    { id: 6, user: 'User F.', action: 'is listening to Mood Booster', time: '30 min.' },
    { id: 7, user: 'User G.', action: 'is listening to Chill Vibes', time: '30 min.' },
    { id: 8, user: 'Alex Harmon', action: 'Mood Booster', time: '30 min.' },
    { id: 9, user: 'Jamie Beats', action: 'Your song', time: '30 min.' },
  ];

  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        lg:relative lg:translate-x-0 w-80 bg-white dark:bg-gray-800 shadow-md flex flex-col transition-transform duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Current Queue</h2>
        <button className="lg:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700" onClick={onClose}>
          <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">Now Playing</h3>
        {currentSong ? (
          <div className="flex items-center mb-4 p-3 rounded-lg bg-purple-100 dark:bg-purple-900 shadow-sm">
            <img src={currentSong.thumbnail || 'https://via.placeholder.com/48'} alt={currentSong.title} className="h-12 w-12 rounded-md mr-3" />
            <div>
              <p className="text-md font-semibold text-gray-800 dark:text-white truncate">{currentSong.title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{currentSong.artist}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No song is currently playing.</p>
        )}

        <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-700 dark:text-gray-300">Next Up</h3>
        {queue.length > 0 ? (
          <ul>
            {queue.map((song, index) => (
              <li key={index} className="flex items-center mb-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                <img src={song.thumbnail || 'https://via.placeholder.com/40'} alt={song.title} className="h-10 w-10 rounded-md mr-3" />
                <div>
                  <p className="text-md font-medium text-gray-800 dark:text-white truncate">{song.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{song.artist}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">Queue is empty.</p>
        )}

        <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-700 dark:text-gray-300">User Activity</h3>
        <ul>
          {userActivity.map((activity) => (
            <li key={activity.id} className="flex items-center mb-3 text-gray-700 dark:text-gray-300">
              <img src="https://via.placeholder.com/32" alt="User Avatar" className="h-8 w-8 rounded-full mr-3" />
              <p className="text-sm">
                <span className="font-semibold">{activity.user}</span> {activity.action}
              </p>
              <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QueuePanel; 