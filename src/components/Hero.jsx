import React, { useState } from "react";
import profile from "../assets/profile.jpg";
import { Instagram } from "lucide-react";

const Hero = ({ isMobile }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <img
          src="/bg1.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <section className="relative min-h-screen px-4">
        {/* Profile button */}
        <a
          href="https://www.instagram.com/renn.india?igsh=MXV0d3pndTR5dzZ6Mg=="
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 z-10 group"
        >
          <div
            className={`rounded-full border-2 border-white/80 shadow-lg overflow-hidden transition-all ${
              isMobile ? "w-10 h-10" : "w-16 h-16"
            }`}
          >
            {imgError ? (
              <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Instagram className="text-white w-5 h-5" />
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

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
          <h1
            className={`font-playfair font-extrabold tracking-wide drop-shadow-lg mb-2 ${
              isMobile ? "text-3xl" : "text-6xl"
            }`}
          >
            Renn India
          </h1>
          <p
            className={`italic text-white/90 max-w-md ${
              isMobile ? "text-sm" : "text-xl"
            }`}
          >
            Professional Video Editor • Transforming clips into cinematic stories
          </p>

          {/* Show stat cards below text on mobile */}
          {isMobile && (
            <div className="mt-6 space-y-3 w-full max-w-xs">
              <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg">
                <p className="text-white text-sm">Current Reel Views</p>
                <p className="text-white text-2xl font-bold">2.1M</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500/80 to-pink-500/80 p-4 rounded-lg">
                <p className="text-white text-sm">Highest Viewed Reel</p>
                <p className="text-white text-2xl font-bold">4.0M</p>
              </div>
            </div>
          )}
        </div>

        {/* Desktop version of stat cards (bottom left) */}
        {!isMobile && (
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
        )}
      </section>
    </div>
  );
};

export default Hero;
