import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import logo from "../assets/logo.png";
import { useNavigate, Link } from "react-router-dom";

const images = [newcastle1, newcastle2, newcastle3];

const Hero = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/Game");
  };

  return (
    <div className="w-full h-screen bg-[#0F1116] flex flex-col">
      {/* <Navbar /> */}

      <div className="flex-grow flex flex-col items-center cursor-pointer">
        <main className="flex-grow flex flex-col justify-center items-center relative">
          <div className="relative p-10 rounded-lg shadow-lg mt-10">
            <div className="absolute left-1/2 transform cursor-pointer -translate-x-1/2 flex items-center space-x-2 mt-32 z-10">
              <h2
                className="uppercase italic  border-4 border-r-fuchsia-400 border-l-fuchsia-400
               border-b-purple-900 border-t-purple-900 text-4xl text-[#b5ba25] font-bold"
              >
                Mastermind
              </h2>
            </div>

            <div
              className="bg-[url('./assets/newcastle.webp')] bg-cover bg-center bg-no-repeat rounded-t-[50px] 
            opacity-40 border-8 border-gray-700  w-[874px] h-[486px] flex flex-col items-center justify-center space-y-50"
            ></div>

            <div className="absolute inset-0 flex items-center justify-center text-center mt-60 space-y-50 p-4">
              <Link to="/Game">
                <button
                  // onClick={handleStartGame}
                  className="bg-yellow-600 text-white px-6 py-3 mt-6 rounded shadow hover:bg-blue-700 transition duration-200 z-20"
                >
                  Start Game
                </button>
              </Link>
            </div>
          </div>
        </main>
        <footer className="w-full flex justify-center items-center text-white text-center py-10">
          <div className="flex justify-center items-center gap-48 text-sm">
            <div>Mastermind Game vector created by Engima</div>
            <a
              href="https://www.freepik.com/free-photos-vectors/abstract"
              className="text-blue-500 hover:text-blue-700"
            >
              © {new Date().getFullYear()} Mastermind Game. All rights reserved.
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Hero;
