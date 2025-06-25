import React, { createContext, useState, useContext, useRef } from 'react';

const PlaybackContext = createContext();

export const usePlayback = () => useContext(PlaybackContext);

export const PlaybackProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);

  const audioRef = useRef(new Audio());

  const playSong = (song) => {
    if (audioRef.current.src !== song.audio_url) {
      audioRef.current.src = song.audio_url;
      audioRef.current.load();
    }
    setCurrentSong(song);
    setIsPlaying(true);
    audioRef.current.play().catch(e => console.error("Error playing audio:", e));
  };

  const pauseSong = () => {
    setIsPlaying(false);
    audioRef.current.pause();
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseSong();
    } else {
      if (currentSong) {
        playSong(currentSong);
      }
    }
  };

  const nextSong = () => {
    // Implement logic to play next song from queue
    console.log('Next song logic not yet implemented.');
  };

  const prevSong = () => {
    // Implement logic to play previous song from queue
    console.log('Previous song logic not yet implemented.');
  };

  const updateProgress = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const changeVolume = (newVolume) => {
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  // Event listeners for audio element
  React.useEffect(() => {
    const audio = audioRef.current;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => nextSong(); // Play next song when current ends

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    // Initial volume setting
    audio.volume = volume;

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, [nextSong, volume]);

  const value = {
    currentSong,
    setCurrentSong,
    isPlaying,
    setIsPlaying,
    queue,
    setQueue,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    volume,
    setVolume,
    playSong,
    pauseSong,
    togglePlayPause,
    nextSong,
    prevSong,
    updateProgress,
    changeVolume,
  };

  return (
    <PlaybackContext.Provider value={value}>
      {children}
    </PlaybackContext.Provider>
  );
}; 