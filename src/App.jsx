import React from "react";
import Hero from "./components/Hero";
import Reels from "./components/Reels";
import useDeviceDetect from "./hooks/useDeviceDetect";
import "./index.css";

function App() {
  const { isMobile } = useDeviceDetect();

  return (
    <main className="relative z-10 text-white font-inter">
      <Hero isMobile={isMobile} />
      <Reels isMobile={isMobile} />
    </main>
  );
}

export default App;
