import React from "react";
import Game from "./components/Game";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCodemaker, getContract, isWalletConnected } from "./store/wallet";
import Player from "./components/Player";
const App = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      console.log("Blockchain loaded");
      setLoaded(true);
      const result = await isWalletConnected();
      await getContract();
      await getCodemaker();
    };
    loadData();
  }, []);
  return (
    <div className="bg-[#0F1116]">
      <Navbar />
      <Player />
      <Routes>
        <Route path="/" exact element={<Hero />} />
        <Route path="/Game" exact element={<Game />} />
      </Routes>
    </div>
  );
};

export default App;
