import React from "react";
import Game from "./components/Game";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Route, Routes } from "react-router-dom";
import GamePlay from "./components/GamePlay";
import { useEffect, useState } from "react";
import {
  getCodemaker,
  checkActiveGame,
  getContract,
  isWalletConnected,
  _getLatestFeedback,
  getCodebreaker,
  getcodebreakerscore,
  getcodemakerscore,
} from "./store/wallet";

const App = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      console.log("Blockchain loaded");
      setLoaded(true);
      const result = await isWalletConnected();
      await getContract();
      await checkActiveGame();
      await getCodemaker();
      await getcodemakerscore();
      await getcodebreakerscore();
      await getCodebreaker();
      await _getLatestFeedback();
    };
    loadData();
  }, []);
  return (
    <div className="bg-[#0F1116]">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Hero />} />
        <Route path="/Game" exact element={<Game />} />
        <Route path="/GamePlay" exact element={<GamePlay />} />
      </Routes>
    </div>
  );
};

export default App;
