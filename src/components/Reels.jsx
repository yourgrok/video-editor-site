import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Youtube,
  RotateCw,
} from 'lucide-react';
import reel1 from '../assets/reel1.mp4';
import reel2 from '../assets/reel2.mp4';

const Reels = ({ isMobile }) => {
  const collaborators = [
    {
      name: 'Aur Music',
      insta: 'https://www.instagram.com/aurmusic__?igshid=OGQ5ZDc2ODk2ZA%3D%3D',
      youtube: 'https://www.youtube.com/channel/UCrHQf1k-GtPByMHRsJjxO5g',
    },
    {
      name: 'Real Ridi',
      insta: 'https://www.instagram.com/realridi/',
      youtube: 'https://www.youtube.com/@Realridi',
    },
    {
      name: 'THENBHD',
      insta: 'https://www.instagram.com/thenbhd?igsh=cXdycXZ2c2ltcHVq',
      youtube: 'https://www.youtube.com/channel/UCDAXusYwRJpiSP2CHnXnVnw',
    },
  ];

  const reels = [
    {
      src: reel1,
      instaLink: 'https://www.instagram.com/reel/DCWK6DvM-Nv/?igsh=MnJ4cGUzZGltYWpq',
    },
    {
      src: reel2,
      instaLink: 'https://www.instagram.com/reel/DIOwFsFzPKF/?igsh=ajI3YmR4ZW9xNmxu',
    },
  ];

  const SHEET_URL =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSmmaNvlNyLYAEkHJOJZMldDGqbyqm-bEjRFVFePKZhPMWU83dNCBUUMykPswlhE5aRRdrvFfUKkZgZ/pub?output=csv';

  const [totalViews, setTotalViews] = useState('0');
  const [lastUpdated, setLastUpdated] = useState('');
  const [isLoadingViews, setIsLoadingViews] = useState(true);

  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef(null);

  const formatViews = (num) => {
    const numValue = parseInt(num.replace(/,/g, ''), 10);
    if (numValue >= 1000000) return (numValue / 1000000).toFixed(1) + 'M';
    if (numValue >= 1000) return (numValue / 1000).toFixed(1) + 'K';
    return numValue.toString();
  };

  const fetchViews = async () => {
    setIsLoadingViews(true);
    try {
      const response = await fetch(SHEET_URL);
      const csvData = await response.text();
      const rawValue = csvData.split('\n')[1] || '0';
      setTotalViews(formatViews(rawValue));
      setLastUpdated(new Date().toLocaleDateString());
    } catch (error) {
      setTotalViews('Error');
      console.error('Failed to fetch views:', error);
    } finally {
      setIsLoadingViews(false);
    }
  };

  const handleSwitch = (index) => {
    setIsPlaying(false);
    setCurrent(index);
    setProgress(0);
    if (videoRef.current) videoRef.current.currentTime = 0;
  };

  const nextReel = () => handleSwitch((current + 1) % reels.length);
  const prevReel = () => handleSwitch((current - 1 + reels.length) % reels.length);

  const togglePlay = () => {
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgress = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      const currentTime = videoRef.current.currentTime;
      setProgress((currentTime / duration) * 100);
    }
  };

  useEffect(() => {
    fetchViews();
    const interval = setInterval(fetchViews, 86400000); // 24hr
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      {/* Collaborators Section */}
      <section className="w-full px-4 py-20 bg-gradient-to-b from-black/70 to-black/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className={`font-playfair font-bold mb-14 ${isMobile ? 'text-3xl' : 'text-4xl'}`}>
            Worked With
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collaborators.map((collab, idx) => (
              <div
                key={idx}
                className="bg-white/5 p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 group"
              >
                <h3 className="text-2xl font-bold mb-6 font-playfair">{collab.name}</h3>
                <div className="flex justify-center space-x-6">
                  <a
                    href={collab.insta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-full shadow-lg group-hover:scale-110 transition-all"
                  >
                    <Instagram size={20} className="text-white" />
                  </a>
                  <a
                    href={collab.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 p-3 rounded-full shadow-lg group-hover:scale-110 transition-all"
                  >
                    <Youtube size={20} className="text-white" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reels Section */}
      <section className="w-full px-4 py-20 bg-gradient-to-b from-black/30 to-black/70">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-center font-playfair font-bold mb-10 ${isMobile ? 'text-3xl' : 'text-4xl'}`}>
            🎬 Top Reels
          </h2>

          <div className="relative w-full flex justify-center">
            <div
              className="relative group rounded-2xl overflow-hidden shadow-2xl"
              style={{
                width: isMobile ? '260px' : '360px',
                height: isMobile ? '460px' : '640px',
              }}
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
            >
              <video
                ref={videoRef}
                src={reels[current].src}
                loop
                muted={isMuted}
                onClick={togglePlay}
                onTimeUpdate={handleProgress}
                className="w-full h-full object-cover"
              />

              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent ${
                  showControls ? 'opacity-100' : 'opacity-0'
                } transition-opacity duration-300`}
              />

              {(showControls || !isPlaying) && (
                <div
                  className={`absolute bottom-0 left-0 right-0 p-4 space-y-2 ${
                    showControls ? 'opacity-100' : 'opacity-0'
                  } transition-opacity duration-300`}
                >
                  <div className="h-1.5 bg-white/30 rounded-full w-full">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                      <button onClick={togglePlay} className="text-white hover:text-purple-300 transition-colors">
                        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                      </button>
                      <button onClick={toggleMute} className="text-white hover:text-purple-300 transition-colors">
                        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                      </button>
                    </div>

                    <a
                      href={reels[current].instaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-white hover:text-pink-500 transition-colors"
                    >
                      <Instagram size={24} className="mr-2" />
                      <span className="text-sm font-medium">Instagram</span>
                    </a>
                  </div>
                </div>
              )}

              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 m-auto w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                >
                  <Play size={32} className="text-white pl-1" />
                </button>
              )}
            </div>

            {!isMobile && (
              <>
                <button
                  onClick={prevReel}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/20 text-white p-3 rounded-full shadow hover:bg-white/30 transition z-10 backdrop-blur-sm"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextReel}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/20 text-white p-3 rounded-full shadow hover:bg-white/30 transition z-10 backdrop-blur-sm"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* 30-Day Views */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                {isLoadingViews ? '...' : totalViews}
              </div>
              <span className="ml-2 text-white/80">views in last 30 days</span>
              <button
                onClick={fetchViews}
                className={`ml-3 p-1 rounded-full ${isLoadingViews ? 'animate-spin' : 'hover:bg-white/10'}`}
                disabled={isLoadingViews}
              >
                <RotateCw size={16} className="text-white/50" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Updated: {lastUpdated || 'Never'} • Tap reel to watch on Instagram
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reels;
