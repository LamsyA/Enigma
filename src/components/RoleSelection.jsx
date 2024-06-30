import React, { useState } from "react";
import { useGlobalState } from "../store/Data";
import { useContractContext } from "../store/wallet";
import { ClipLoader } from "react-spinners";
// import {
//   setCodebreaker,
//   setCodemaker,
//   checkActiveGame,
//   getRole,
// } from "../store/wallet";

const RoleSelection = ({ setRole }) => {
  const { _setCodeBreakerAddress, _setCodeMakerAddress, checkActiveGame, getRole } = useContractContext();
  const [, setActivegame] = useGlobalState("activegame");
  const [makerLoading, setMakerLoading] = useState(false);
  const [breakerLoading, setBreakerLoading] = useState(false);

  const handleRoleSelection = async (role) => {
    if (role === "codeMaker") {
      setMakerLoading(true);
      await _setCodeMakerAddress();
    } else if (role === "codeBreaker") {
      setBreakerLoading(true);
      await _setCodeBreakerAddress();
    }
    const gameActive = await checkActiveGame();
    setActivegame(gameActive);
    setRole(role);
    setMakerLoading(false);
    setBreakerLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center uppercase justify-center "
      style={{ backgroundColor: "#0F1116" }}
    >
      <div className="p-4 bg-amber-800 shadow-lg border-amber-300 border justify-between space-x-4 rounded-md text-center text-sm font-medium py-10">
        <h1 className="text-white mb-4 uppercase text-base">Select Your Role</h1>
        <button
          onClick={() => handleRoleSelection("codeMaker")}
          className="mt-4 px-4 uppercase py-2 w-40 hover:border-white hover:border-2  bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          {makerLoading ?
          <ClipLoader color="white" size={16}/>
          : "Code Maker"}
        </button>
        <button
          onClick={() => handleRoleSelection("codeBreaker")}
          className="mt-4 px-4 uppercase py-2 w-40 bg-blue-500 hover:border-green-400 hover:border-2  text-white rounded hover:bg-blue-700"
        >
          {breakerLoading ? <ClipLoader color="white" size={16}/> : "Code Breaker"}
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;
