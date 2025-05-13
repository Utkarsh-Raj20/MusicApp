import { Emotion, Track } from "../types";

// Default tracks if no custom music is found
const defaultTracks: Record<Emotion, Track[]> = {
  happy: [
    {
      id: "happy-1",
      title: "Dil Dhadakne Do",
      artist: "Pritam",
      emotion: "happy",
      path: "/music/happy/Dil Dhadakne Do.mp3",
      cover:
        "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "happy-2",
      title: "Mera Mann Kehne Laga",
      artist: "Pritam",
      emotion: "happy",
      path: "/music/happy/Mera Mann Kehne Laga.mp3",
      cover:
        "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "happy-3",
      title: "Kabhi Kabhi Aditi",
      artist: "Pritam",
      emotion: "happy",
      path: "/music/happy/Kabhi Kabhi Aditi.mp3",
      cover:
        "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ],
  sad: [
    {
      id: "sad-1",
      title: "Maan Jao",
      artist: "Pritam",
      emotion: "sad",
      path: "/music/sad/Maan Jao.mp3",
      cover:
        "https://images.pexels.com/photos/561463/pexels-photo-561463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "sad-2",
      title: "Maand",
      artist: "Pritam",
      emotion: "sad",
      path: "/music/sad/Maand.mp3",
      cover:
        "https://images.pexels.com/photos/561463/pexels-photo-561463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "sad-3",
      title: "Jhol",
      artist: "Pritam",
      emotion: "sad",
      path: "/music/sad/Jhol.mp3",
      cover:
        "https://images.pexels.com/photos/561463/pexels-photo-561463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ],
  angry: [
    {
      id: "angry-1",
      title: "Jee Karda",
      artist: "Pritam",
      emotion: "angry",
      path: "/music/angry/Jee Karda.mp3",
      cover:
        "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "angry-2",
      title: "Brothers Anthem",
      artist: "Pritam",
      emotion: "angry",
      path: "/music/angry/Brothers Anthem.mp3",
      cover:
        "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "angry-3",
      title: "Saadda Haq",
      artist: "Pritam",
      emotion: "angry",
      path: "/music/angry/Saadda Haq.mp3",
      cover:
        "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ],
  surprised: [
    {
      id: "surprised-1",
      title: "Blinding Lights",
      artist: "The Weeknd",
      emotion: "surprised",
      path: "/music/surprised/Blinding Lights.mp3",
      cover:
        "https://images.pexels.com/photos/3807743/pexels-photo-3807743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "surprised-2",
      title: "One Dance",
      artist: "Drake",
      emotion: "surprised",
      path: "/music/surprised/One Dance.mp3",
      cover:
        "https://images.pexels.com/photos/3807743/pexels-photo-3807743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "surprised-3",
      title: "Counting Stars",
      artist: "OneRepublic",
      emotion: "surprised",
      path: "/music/surprised/Counting Stars.mp3",
      cover:
        "https://images.pexels.com/photos/3807743/pexels-photo-3807743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ],
  neutral: [
    {
      id: "neutral-1",
      title: "Winning Speech",
      artist: "Karan Aujla",
      emotion: "neutral",
      path: "/music/neutral/Winning Speech - Karan Aujla.mp3",
      cover:
        "https://i.scdn.co/image/ab67616d0000b273bb0a8916e30754d2e08f28bb",
    },
    {
      id: "neutral-2",
      title: "ANTIDOTE",
      artist: "Karan Aujla",
      emotion: "neutral",
      path: "/music/neutral/ANTIDOTE - Karan Aujla.mp3",
      cover:
        "https://images.pexels.com/photos/1231230/pexels-photo-1231230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "neutral-3",
      title: "Wavy",
      artist: "Karan Aujla",
      emotion: "neutral",
      path: "/music/neutral/Wavy - Karan Aujla.mp3",
      cover:
        "https://images.pexels.com/photos/1231230/pexels-photo-1231230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ],
};

// Helper function to get all music files from a directory
const getMusicFiles = (emotion: Emotion): Track[] => {
  // For now, we'll return the default tracks since we can't directly access the filesystem in the browser
  // In a real implementation, you would:
  // 1. Either pre-build this list during build time
  // 2. Or have an API endpoint that returns the list of available files
  return defaultTracks[emotion];
};

// This is the music data structure that you'll customize
const musicData: Record<Emotion, Track[]> = {
  happy: getMusicFiles("happy"),
  sad: getMusicFiles("sad"),
  angry: getMusicFiles("angry"),
  surprised: getMusicFiles("surprised"),
  neutral: getMusicFiles("neutral"),
};

// Combine custom music with default tracks, preferring custom music when available
Object.keys(musicData).forEach((emotion) => {
  const customTracks = musicData[emotion as Emotion];
  if (customTracks.length === 0) {
    musicData[emotion as Emotion] = defaultTracks[emotion as Emotion];
  }
});

export default musicData;
