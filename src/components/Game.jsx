import React, { useState, useEffect } from "react";
import SecretCodeSetter from "./SecretCodeSetter";
import GuessingTable from "./GuessingTable";
import RoleSelection from "./RoleSelection";
import { useGlobalState } from "../store/Data";
import { checkActiveGame, getRole } from "../store/wallet"; // Assume these functions interact with the smart contract
import { COLORS, CODE_LENGTH } from "../store/lib";

const Game = () => {
  const [activegame, setActivegame] = useGlobalState("activegame");
  const [role, setRole] = useState(null);
  const [secretCode, setSecretCode] = useState(Array(CODE_LENGTH).fill(null));
  const [isSettingSecretCode, setIsSettingSecretCode] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    const checkGameStatus = async () => {
      const gameActive = await checkActiveGame();
      setActivegame(gameActive);

      if (gameActive) {
        const userRole = await getRole();
        setRole(userRole);
        setIsSettingSecretCode(userRole === "codeMaker" ? false : true);
      }
    };
    checkGameStatus();
  }, [setActivegame]);

  if (!role && !activegame) {
    return <RoleSelection setRole={setRole} />;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#0F1116" }}
    >
      <div className="p-4 bg-amber-800 shadow-lg rounded">
        {role === "codeMaker" && isSettingSecretCode ? (
          <SecretCodeSetter
            setSecretCode={setSecretCode}
            setIsSettingSecretCode={setIsSettingSecretCode}
          />
        ) : (
          <>
            <div className="flex items-center space-x-4 mb-4">
              {secretCode.map((color, index) => (
                <div
                  key={index}
                  className="w-10 h-10 rounded-full"
                  style={{
                    backgroundColor: gameOver ? color : "#d1d5db",
                    border: gameOver ? `2px solid ${color}` : "none",
                  }}
                ></div>
              ))}
            </div>
            <GuessingTable
              secretCode={secretCode}
              gameOver={gameOver}
              setGameOver={setGameOver}
              gameWon={gameWon}
              setGameWon={setGameWon}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Game;
