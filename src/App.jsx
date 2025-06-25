import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { AuthProvider } from '@/context/AuthContext';
import { PlaybackProvider } from '@/context/PlaybackContext';
import PrivateRoute from '@/components/PrivateRoute';

// Import page components
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import NowPlaying from '@/pages/NowPlaying';
import Favorites from '@/pages/Favorites';
import Upload from '@/pages/Upload';
import Library from '@/pages/Library';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import SpotifyIntegration from '@/pages/SpotifyIntegration';

function App() {
  return (
    <Router>
      <AuthProvider>
        <PlaybackProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<MainLayout><Home /></MainLayout>} />
              <Route path="/home" element={<MainLayout><Home /></MainLayout>} />
              <Route path="/search" element={<MainLayout><Search /></MainLayout>} />
              <Route path="/now-playing" element={<MainLayout><NowPlaying /></MainLayout>} />
              <Route path="/favorites" element={<MainLayout><Favorites /></MainLayout>} />
              <Route path="/upload" element={<MainLayout><Upload /></MainLayout>} />
              <Route path="/library" element={<MainLayout><Library /></MainLayout>} />
              <Route path="/spotify-integration" element={<MainLayout><SpotifyIntegration /></MainLayout>} />
            </Route>
          </Routes>
        </PlaybackProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
