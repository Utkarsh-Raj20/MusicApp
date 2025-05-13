import React from "react";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Emotion-Based Music Player
          </h1>
          <p className="text-gray-400 max-w-md mx-auto">
            Let your emotions guide your music experience. We'll detect how
            you're feeling and play the perfect track.
          </p>
        </header>

        <MusicPlayer />

        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>Note: This app requires camera access for emotion detection.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
