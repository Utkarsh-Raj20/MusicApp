import React, { useState, useRef, useEffect } from 'react';
import { Track, PlaybackState, Emotion, EmotionDetectionResult } from '../types';
import Controls from './Controls';
import TrackInfo from './TrackInfo';
import EmotionDetector from './EmotionDetector';
import EmotionDisplay from './EmotionDisplay';
import { getRandomTrackForEmotion, getPreviousTrack, getNextTrack } from '../utils/audioUtils';
import { emotionColors, smoothEmotionTransition } from '../utils/emotionUtils';
import { Camera, CameraOff } from 'lucide-react';

const MusicPlayer: React.FC = () => {
  // State for current track and emotion
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>('neutral');
  const [lastEmotionChangeTime, setLastEmotionChangeTime] = useState<number>(0);
  
  // State for webcam activation
  const [isWebcamActive, setIsWebcamActive] = useState(true);
  
  // Audio playback state
  const [playbackState, setPlaybackState] = useState<PlaybackState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.7,
    isMuted: false,
    isLooping: false,
    isShuffle: false
  });
  
  // Refs
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Set initial track
  useEffect(() => {
    const initialTrack = getRandomTrackForEmotion('neutral');
    setCurrentTrack(initialTrack);
  }, []);
  
  // Handle emotion detection results
  const handleEmotionDetected = (result: EmotionDetectionResult) => {
    const now = Date.now();
    const emotionChangeThreshold = 3000; // 3 seconds between emotion changes
    
    // Apply smoothing to prevent rapid emotion switching
    const smoothedEmotion = smoothEmotionTransition(result);
    
    if (smoothedEmotion !== currentEmotion && (now - lastEmotionChangeTime) > emotionChangeThreshold) {
      setCurrentEmotion(smoothedEmotion);
      setLastEmotionChangeTime(now);
      
      // Change track when emotion changes
      const newTrack = getRandomTrackForEmotion(smoothedEmotion);
      setCurrentTrack(newTrack);
      
      // Auto-play when emotion changes
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setPlaybackState(prev => ({ ...prev, isPlaying: false }));
          })
          .catch(error => {
            console.error('Playback error:', error);
          });
      }
    }
  };
  
  // Toggle webcam
  const toggleWebcam = () => {
    setIsWebcamActive(prev => !prev);
  };
  
  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const handleTimeUpdate = () => {
      setPlaybackState(prev => ({
        ...prev,
        currentTime: audio.currentTime
      }));
    };
    
    const handleDurationChange = () => {
      setPlaybackState(prev => ({
        ...prev,
        duration: audio.duration
      }));
    };
    
    const handleEnded = () => {
      if (playbackState.isLooping) {
        audio.play();
      } else if (playbackState.isShuffle) {
        const newTrack = getRandomTrackForEmotion(currentEmotion);
        setCurrentTrack(newTrack);
        setTimeout(() => {
          audio.play();
        }, 100);
      } else {
        handleNext();
      }
    };
    
    // Add event listeners
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    
    // Cleanup
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentEmotion, playbackState.isLooping, playbackState.isShuffle]);
  
  // Playback control handlers
  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (playbackState.isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => {
        console.error('Playback error:', error);
      });
    }
    
    setPlaybackState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying
    }));
  };
  
  const handlePrevious = () => {
    if (!currentTrack) return;
    
    const prevTrack = getPreviousTrack(currentTrack);
    setCurrentTrack(prevTrack);
    
    // Auto-play when changing tracks
    setPlaybackState(prev => ({
      ...prev,
      isPlaying: true,
      currentTime: 0
    }));
    
    // Small timeout to ensure track changes before playing
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.error('Playback error:', error);
        });
      }
    }, 100);
  };
  
  const handleNext = () => {
    if (!currentTrack) return;
    
    const nextTrack = playbackState.isShuffle 
      ? getRandomTrackForEmotion(currentEmotion)
      : getNextTrack(currentTrack);
    
    setCurrentTrack(nextTrack);
    
    // Auto-play when changing tracks
    setPlaybackState(prev => ({
      ...prev,
      isPlaying: true,
      currentTime: 0
    }));
    
    // Small timeout to ensure track changes before playing
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.error('Playback error:', error);
        });
      }
    }, 100);
  };
  
  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setPlaybackState(prev => ({
        ...prev,
        currentTime: time
      }));
    }
  };
  
  const handleVolumeChange = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = false;
      setPlaybackState(prev => ({
        ...prev,
        volume,
        isMuted: false
      }));
    }
  };
  
  const handleToggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !playbackState.isMuted;
      audioRef.current.muted = newMutedState;
      setPlaybackState(prev => ({
        ...prev,
        isMuted: newMutedState
      }));
    }
  };
  
  const handleToggleLoop = () => {
    if (audioRef.current) {
      audioRef.current.loop = !playbackState.isLooping;
      setPlaybackState(prev => ({
        ...prev,
        isLooping: !prev.isLooping
      }));
    }
  };
  
  const handleToggleShuffle = () => {
    setPlaybackState(prev => ({
      ...prev,
      isShuffle: !prev.isShuffle
    }));
  };
  
  // Get gradient background based on current emotion
  const emotionBackground = currentTrack
    ? emotionColors[currentTrack.emotion].background
    : 'from-gray-800 to-gray-900';
  
  return (
    <div className={`w-full max-w-lg mx-auto overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br ${emotionBackground} transition-all duration-700`}>
      {/* Audio element */}
      <audio
        ref={audioRef}
        src={currentTrack?.path}
        preload="auto"
      />
      
      {/* Webcam and emotion detection */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-white text-xl font-bold">Emotion Music Player</h2>
          <button 
            onClick={toggleWebcam}
            className="p-2 bg-white bg-opacity-10 rounded-full text-white hover:bg-opacity-20 transition"
          >
            {isWebcamActive ? <Camera size={18} /> : <CameraOff size={18} />}
          </button>
        </div>
        
        <EmotionDetector 
          onEmotionDetected={handleEmotionDetected}
          isActive={isWebcamActive}
        />
      </div>
      
      {/* Divider */}
      <div className="w-full h-px bg-white bg-opacity-10"></div>
      
      {/* Emotion display */}
      <div className="p-4">
        <EmotionDisplay 
          emotion={currentEmotion}
          isActive={isWebcamActive}
        />
      </div>
      
      {/* Track info */}
      {currentTrack && (
        <>
          <div className="w-full h-px bg-white bg-opacity-10"></div>
          <TrackInfo 
            track={currentTrack}
            currentEmotion={currentEmotion}
          />
        </>
      )}
      
      {/* Playback controls */}
      <div className="w-full h-px bg-white bg-opacity-10"></div>
      <Controls
        playbackState={playbackState}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSeek={handleSeek}
        onVolumeChange={handleVolumeChange}
        onToggleMute={handleToggleMute}
        onToggleLoop={handleToggleLoop}
        onToggleShuffle={handleToggleShuffle}
      />
    </div>
  );
};

export default MusicPlayer;