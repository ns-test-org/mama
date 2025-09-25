'use client';

import { useState, useEffect } from 'react';

const poems = [
  {
    title: "Morning Light",
    content: `Your gentle hands that held me close,
Your voice that sang me through the night,
In every dawn, I see you most,
My guiding star, my morning light.`
  },
  {
    title: "Heart of Gold",
    content: `Through scraped knees and broken dreams,
You kissed away each tear that fell,
Your love flows deeper than the streams,
A heart of gold that knows me well.`
  },
  {
    title: "Forever Home",
    content: `No matter where life takes me far,
Your wisdom echoes in my soul,
You are my compass, my North Star,
The love that makes my spirit whole.`
  }
];

export default function Home() {
  const [currentPoem, setCurrentPoem] = useState(poems[0]);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSignature, setShowSignature] = useState(false);

  useEffect(() => {
    // Select a random poem on component mount
    const randomPoem = poems[Math.floor(Math.random() * poems.length)];
    setCurrentPoem(randomPoem);
  }, []);

  useEffect(() => {
    setDisplayedText('');
    setShowSignature(false);
    setIsTyping(true);
    
    const fullText = currentPoem.content;
    let currentIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        setTimeout(() => setShowSignature(true), 500);
        clearInterval(typeInterval);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [currentPoem]);

  const selectNewPoem = () => {
    const availablePoems = poems.filter(poem => poem.title !== currentPoem.title);
    const randomPoem = availablePoems[Math.floor(Math.random() * availablePoems.length)];
    setCurrentPoem(randomPoem);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900 dark:to-orange-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Letter Paper */}
        <div className="bg-white dark:bg-gray-100 shadow-2xl rounded-lg p-8 md:p-12 relative">
          {/* Paper texture overlay */}
          <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="0.1"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] rounded-lg"></div>
          
          {/* Letter Header */}
          <div className="text-center mb-8 relative z-10">
            <h1 className="text-3xl md:text-4xl font-serif text-gray-800 mb-2">
              {currentPoem.title}
            </h1>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto"></div>
          </div>

          {/* Poem Content */}
          <div className="relative z-10 mb-8">
            <div className="font-serif text-lg md:text-xl leading-relaxed text-gray-700 whitespace-pre-line min-h-[200px] flex items-center">
              <p className="w-full text-center italic">
                {displayedText}
                {isTyping && <span className="animate-pulse">|</span>}
              </p>
            </div>
          </div>

          {/* Signature */}
          <div className={`text-right relative z-10 transition-opacity duration-1000 ${showSignature ? 'opacity-100' : 'opacity-0'}`}>
            <p className="font-serif text-lg text-gray-600 italic mb-4">
              With Love,
            </p>
            <p className="font-serif text-xl text-gray-700 font-medium">
              Your Family ❤️
            </p>
          </div>

          {/* New Poem Button */}
          <div className="text-center mt-8 relative z-10">
            <button
              onClick={selectNewPoem}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium px-6 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-300"
            >
              Read Another Poem
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-8 h-8 bg-amber-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-8 right-8 w-6 h-6 bg-orange-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-4 w-4 h-4 bg-amber-300 rounded-full opacity-25 animate-pulse delay-500"></div>
      </div>
    </div>
  );
}

