import React, { useState } from "react";
import SecretCodeSetter from "./SecretCodeSetter";
import GuessingTable from "./GuessingTable";
import { useGlobalState } from "../store/Data";
import { COLORS, NUM_ROWS, CODE_LENGTH } from "../store/lib"; // Define these in a separate file

const Game = () => {
  const [activegame] = useGlobalState("activegame");
  console.log("activegame.........", activegame);
  const active = activegame;
  console.log("active", active);
  const [secretCode, setSecretCode] = useState(Array(CODE_LENGTH).fill(null));
  const [isSettingSecretCode, setIsSettingSecretCode] = useState(!active);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#0F1116" }}
    >
      <div className="p-4 bg-amber-800 shadow-lg rounded">
        {isSettingSecretCode ? (
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
              setGameWon={setGameWon}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Game;
