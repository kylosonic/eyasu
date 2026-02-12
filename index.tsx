import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// NOTE: Ensure you have these files in your project folder!
import BEZA_PICTURE_1 from "./beza1.jpg";
import BEZA_PICTURE_2 from "./beza2.jpg";

// Floating heart component for the background
const FloatingHearts = () => {
  // Create an array of hearts with random properties
  const hearts = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100, // 0-100%
    duration: Math.random() * 10 + 10, // 10-20s
    delay: Math.random() * 15, // 0-15s
    size: Math.random() * 20 + 20, // 20-40px
  }));

  return (
    <div className="hearts-container">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="floating-heart text-rose-300"
          style={{
            left: `${heart.left}%`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            fontSize: `${heart.size}px`,
          }}
        >
          {['❤️', '💖', '💕', '🌸'][Math.floor(Math.random() * 4)]}
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [yesPressed, setYesPressed] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [noButtonStyle, setNoButtonStyle] = useState<React.CSSProperties>({});

  const yesButtonSize = noCount * 15 + 16;

  // Make the No button run away!
  const moveNoButton = () => {
    const x = Math.random() * (window.innerWidth - 100); // Subtract button width approx
    const y = Math.random() * (window.innerHeight - 50); // Subtract button height approx

    setNoButtonStyle({
      position: 'fixed',
      left: `${x}px`,
      top: `${y}px`,
      transition: 'all 0.2s ease', // Smooth movement
      zIndex: 50, // Ensure it floats above everything
    });

    // Also increment count to grow the Yes button for fun if they try to chase it
    setNoCount(prev => prev + 1);
  };

  const handleNoClick = () => {
    // Just in case they manage to click it (e.g. via keyboard)
    moveNoButton();
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Catch me if you can!",
      "Think again!",
      "Last chance!",
      "Surely not?",
      "You might regret this!",
      "Give it another thought!",
      "Are you absolutely certain?",
      "This could be a mistake!",
      "Have a heart!",
      "Don't be so cold!",
      "Change of heart?",
      "Wouldn't you reconsider?",
      "Is that your final answer?",
      "You're breaking my heart ;(",
      "Please? :(",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const handleYesClick = () => {
    setYesPressed(true);
    triggerConfetti();
  };

  const triggerConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const random = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // @ts-ignore
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#ff0000', '#ffa500', '#ffff00'] }));
      // @ts-ignore
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#ffc0cb', '#ff69b4', '#ff1493'] }));
    }, 250);
  };

  if (yesPressed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden text-center p-4">
        <FloatingHearts />

        <div className="glass p-8 md:p-12 rounded-3xl z-10 fade-in border-2 border-white/50 max-w-4xl mx-auto w-full">
          <h1 className="text-5xl md:text-8xl font-romantic text-rose-600 mb-8 animate-bounce drop-shadow-md leading-tight">
            Yay! I love you Beza! <span className="inline-block animate-pulse">❤️</span>
          </h1>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 mb-10">
            {/* Picture 1 */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-4 border-white shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500 heart-beat" style={{ animationDelay: '0s' }}>
              <div className="absolute inset-0 bg-rose-500/10 mix-blend-overlay"></div>
              <img
                src={BEZA_PICTURE_1}
                alt="Beza Happy 1"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Picture 2 */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-4 border-white shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500 heart-beat" style={{ animationDelay: '0.75s' }}>
              <div className="absolute inset-0 bg-rose-500/10 mix-blend-overlay"></div>
              <img
                src={BEZA_PICTURE_2}
                alt="Beza Happy 2"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <p className="text-3xl text-rose-800 font-serif-elegant mt-6">
            Best Valentine's Day Ever!
          </p>
          <div className="mt-8 text-rose-500 font-romantic text-2xl">
            Forever & Always
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      {/* Dynamic Background */}
      <FloatingHearts />

      {/* Main Glass Card */}
      <div className="glass rounded-3xl p-8 md:p-12 max-w-4xl w-full mx-auto relative z-10 fade-in border-2 border-white/60 shadow-xl">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-6xl md:text-8xl font-romantic text-rose-600 mb-4 drop-shadow-sm leading-tight">
            Dearest Beza
          </h1>
          <p className="text-xl md:text-2xl text-rose-800 font-serif-elegant italic opacity-90">
            "You make my world brighter with every smile" ✨
          </p>
        </div>

        {/* Photo Gallery - Polaroids */}
        <div className="flex flex-col md:flex-row gap-8 mb-12 items-center justify-center perspective-1000">

          {/* Photo 1 */}
          <div className="group relative transform -rotate-2 hover:rotate-0 transition-all duration-500 ease-in-out hover:z-10 hover:scale-105">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-24 bg-rose-100/50 opacity-40 z-20 rotate-12"></div>
            <div className="bg-white p-4 pb-12 shadow-lg rounded-sm w-64">
              <div className="overflow-hidden h-64 w-full bg-gray-100 relative">
                <img
                  src={BEZA_PICTURE_1}
                  alt="Beza 1"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="text-center mt-4 font-romantic text-2xl text-gray-600">
                Beautiful
              </div>
            </div>
          </div>

          {/* Photo 2 */}
          <div className="group relative transform rotate-3 hover:rotate-0 transition-all duration-500 ease-in-out hover:z-10 hover:scale-105">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-24 bg-rose-100/50 opacity-40 z-20 -rotate-12"></div>
            <div className="bg-white p-4 pb-12 shadow-lg rounded-sm w-64">
              <div className="overflow-hidden h-64 w-full bg-gray-100 relative">
                <img
                  src={BEZA_PICTURE_2}
                  alt="Beza 2"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="text-center mt-4 font-romantic text-2xl text-gray-600">
                Memories
              </div>
            </div>
          </div>

        </div>

        {/* Question Section */}
        <div className="text-center space-y-8">
          <h2 className="text-5xl md:text-6xl font-romantic text-rose-700 leading-normal">
            Will you be my Valentine?
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-6 min-h-[100px]">
            <button
              className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl flex items-center gap-2"
              style={{ fontSize: Math.min(yesButtonSize, 100) }} // Cap size to prevent breaking layout
              onClick={handleYesClick}
            >
              <span>Yes</span>
              <span className="animate-bounce">🌹</span>
            </button>

            <button
              className={`bg-white border-2 border-rose-400 text-rose-500 hover:bg-rose-50 font-bold py-3 px-8 rounded-full shadow-md transition-all duration-300 wobble-hover`}
              style={noButtonStyle}
              onClick={handleNoClick}
              onMouseEnter={moveNoButton}
              onTouchStart={moveNoButton} // Support mobile tap attempts
            >
              {noCount === 0 ? "No" : getNoButtonText()}
            </button>
          </div>

          <div className="h-6">
            {noCount > 0 && (
              <span className="text-rose-400 text-sm font-medium animate-pulse italic">
                {noCount > 3 ? "(You can't catch it! 😉)" : " "}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 text-rose-300 text-xs font-serif-elegant opacity-50">
        Made with ❤️ for Beza
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<App />);