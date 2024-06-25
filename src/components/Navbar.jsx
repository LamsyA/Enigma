import React from "react";
import nftLogo from "../assets/logo.png";
import { connectWallet } from "../store/wallet";
import { slice, useGlobalState } from "../store/Data";

const Navbar = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  return (
    <div className="relative w-4/5 flex md:justify-center justify-between items-center py-4 mx-auto ">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <div className="flex items-center space-x-2">
          <img className=" w-6 cursor-pointer" src={nftLogo} alt="Logo" />
          <p className="text-xs font-bold text-gray-300 uppercase">
            mastermind
          </p>
        </div>
      </div>

      <div className="md:flex-[0.5] flex-initial justify-center items-center"></div>
      {connectedAccount ? (
        <button className="shadow-xl shadow-blue-900 text-white ml-8 bg-[#b5ba25] hover:bg-[#D3EE70] md:text-xs p-2 rounded-full ">
          {slice(connectedAccount, 4, 4, 11)}
        </button>
      ) : (
        <div>
          <button
            className="shadow-xl shadow-blue-900 text-white ml-8 bg-[#b5ba25] hover:bg-[#D3EE70] md:text-xs p-2 rounded-full"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        </div>
      )}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 opacity-90 bg-[#0F1116] text-white px-28 py-4 rounded-b-full groove-outline">
        <div className="flex items-center space-x-2">
          {/* <img className=" w-6 cursor-pointer" src={nftLogo} alt="Logo" /> */}
          {/* <p className="text-xs font-bold text-gray-300 uppercase">
            mastermind
          </p> */}
        </div>
        <p className="flex text-yellow-500 uppercase justify-end text-xs font-bold ">
          Welcome
        </p>
      </div>
    </div>
  );
};

export default Navbar;
