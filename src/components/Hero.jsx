import React from "react";
import Navbar from "./Navbar";
import castleImage from "../assets/castle.webp"; // Adjust the path as necessary
import logo from "../assets/logo.png"; // Adjust the path as necessary

const Hero = () => {
  return (
    <div className="w-full h-screen bg-[#0F1116] flex flex-col">
      {/* <Navbar /> */}

      <div className="flex-grow flex flex-col items-center">
        <main className="flex-grow flex flex-col justify-center items-center relative">
          <div className="relative p-10 rounded-lg shadow-lg mt-10">
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-2 mt-32 z-10">
              <img src={logo} alt="Mastermind Logo" className="w-12 h-12" />
              <h2 className="text-4xl text-yellow-600 font-bold">Mastermind</h2>
            </div>
            <div
              className="bg-[url('./assets/castle.webp')] bg-cover bg-center bg-no-repeat rounded-t-[50px] 
            opacity-40 border-8 border-gray-700  w-[874px] h-[486px] flex flex-col items-center justify-center space-y-50"
            ></div>
            {/* <img
              src={castleImage}
              alt="Castle"
              className="w-full h-3/5 object-cover rounded-t-[50px] opacity-40 border-8 border-gray-700"
            /> */}
            <div className="absolute inset-0 flex items-center justify-center text-center mt-60 space-y-50 p-4">
              <button className="bg-yellow-600 text-white px-6 py-3 mt-6 rounded shadow hover:bg-blue-700 transition duration-200 z-20">
                Start Game
              </button>
            </div>
          </div>
        </main>
        <footer className=" w-full text-white text-center py-4">
          <div className="flex justify-center items-center gap-2 text-sm">
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
