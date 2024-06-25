import React from "react";
import Game from "./components/Game";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <div className="bg-[#0F1116]">
      <Navbar />
      {/* <Game /> */}

      <Routes>
        <Route path="/" exact element={<Hero />} />
        <Route path="/Game" exact element={<Game />} />
      </Routes>
    </div>
  );
};

export default App;
