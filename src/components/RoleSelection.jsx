import React from "react";
import { useGlobalState } from "../store/Data";
import {
  setCodebreaker,
  setCodemaker,
  checkActiveGame,
  getRole,
} from "../store/wallet"; // Assume these functions interact with the smart contract

const RoleSelection = ({ setRole }) => {
  const [, setActivegame] = useGlobalState("activegame");

  const handleRoleSelection = async (role) => {
    if (role === "codeMaker") {
      await setCodemaker();
    } else if (role === "codeBreaker") {
      await setCodebreaker();
    }

    const gameActive = await checkActiveGame();
    setActivegame(gameActive);
    setRole(role);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center "
      style={{ backgroundColor: "#0F1116" }}
    >
      <div className="p-4 bg-amber-800 shadow-lg justify-between space-x-4 rounded-md text-center">
        <h1 className="text-white mb-4">Select Your Role</h1>
        <button
          onClick={() => handleRoleSelection("codeMaker")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Code Maker
        </button>
        <button
          onClick={() => handleRoleSelection("codeBreaker")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Code Breaker
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;
