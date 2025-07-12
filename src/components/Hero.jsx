// Updated Hero.jsx
import React, { useState } from "react";
import profile from "../assets/profile.jpg";
import { Instagram } from "lucide-react";

const Hero = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative">
      {/* Fixed background */}
      <div className="fixed inset-0 -z-10">
        <img
          src="/bg1.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <section className="relative min-h-screen">
        {/* Top right container - Profile only */}
        <a
          href="https://www.instagram.com/renn.india?igsh=MXV0d3pndTR5dzZ6Mg=="
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-6 right-6 z-10 group"
          aria-label="Instagram Profile"
        >
          <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white/80 shadow-lg group-hover:border-white transition-all duration-300 overflow-hidden">
            {imgError ? (
              <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Instagram className="text-white w-6 h-6" />
              </div>
            ) : (
              <img
                src={profile}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            )}
          </div>
        </a>

        {/* Left middle - Views count */}
        <div className="absolute left-6 bottom-1/3 z-10 space-y-2">
          <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg max-w-xs">
            <p className="text-white text-sm">Current Reel Views</p>
            <p className="text-white text-3xl font-bold">2.1M</p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500/80 to-pink-500/80 p-4 rounded-lg max-w-xs">
            <p className="text-white text-sm">Highest Viewed Reel</p>
            <p className="text-white text-3xl font-bold">4.0M</p>
          </div>
        </div>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg font-playfair mb-2">
            Renn India
          </h1>
          <p className="text-white/90 text-lg md:text-xl italic max-w-md">
            Professional Video Editor • Transforming clips into cinematic stories
          </p>
        </div>
      </section>
    </div>
  );
};

export default Hero;