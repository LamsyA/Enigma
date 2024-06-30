import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useGlobalState } from "../store/Data";
import Modal from "./Modal";
import "./styles.css";
import { useActiveAccount } from "thirdweb/react";
// import { connectWallet } from "../store/wallet";

const Hero = () => {
  const navigate = useNavigate();
  const account = useActiveAccount();
//   const [connectedAccount] = useGlobalState("connectedAccount");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleStartGame = async () => {
    if (!account) {
      setModalContent("Wallet is not connected. Please connect your wallet.");
      setShowModal(true);
    //   await connectWallet();
    } else {
      setIsLoading(true);
      setModalContent(
        <div className="loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      );
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        setIsLoading(false);
        navigate("/GamePlay");
      }, 1500);
    }
  };

  useEffect(() => {
    if (account) {
      setShowModal(false);
      setIsLoading(false);
    }
  }, [account]);

  return (
    <div className="w-full h-screen bg-[#0F1116] flex flex-col">
      <div className="flex-grow flex flex-col items-center cursor-pointer">
        <main className="flex-grow flex flex-col justify-center items-center relative">
          <div className="relative p-10 rounded-lg shadow-lg mt-10">
            <div className="absolute left-1/2 transform cursor-pointer -translate-x-1/2 flex items-center space-x-2 mt-32 z-10">
              <h2
                className="uppercase border-4 border-r-fuchsia-400 border-l-fuchsia-400
               border-b-purple-900 border-t-purple-900 text-5xl text-[#b5ba25] font-bold"
              >
                Mastermind
              </h2>
            </div>

            <div
              className="bg-[url('./assets/newcastle.webp')] bg-cover bg-center bg-no-repeat rounded-t-[50px] 
            opacity-40 border-8 border-gray-700  w-[874px] h-[486px] flex flex-col items-center justify-center space-y-50"
            ></div>

            <div className="absolute inset-0 flex items-center justify-center text-center mt-60 space-y-50 p-4">
              <button
                onClick={handleStartGame}
                className="bg-yellow-600 font-medium text-white px-6 py-3 mt-6 rounded shadow hover:bg-blue-700 transition duration-200 z-20"
              >
                Start Game
              </button>
            </div>
          </div>
        </main>
        <footer className="w-full flex justify-center items-center text-white text-center py-20">
          © {new Date().getFullYear()} Mastermind Game. All rights reserved.
        </footer>
      </div>

      <Modal
        show={showModal}
        title={
          isLoading ? <i>Starting game, please wait...</i> : "Wallet Connection"
        }
        content={modalContent}
        onClose={isLoading ? null : () => setShowModal(false)}
      />
    </div>
  );
};

export default Hero;
