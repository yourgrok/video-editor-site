import React from "react";
import Hero from "./components/Hero";
import Reels from "./components/Reels";
import "./index.css";

function App() {
  return (
    <main className="relative z-10 text-white font-inter">
      <Hero />
      <Reels />
      {/* Removed <WorkedWith /> since it's now inside Reels.jsx */}
    </main>
  );
}

export default App;