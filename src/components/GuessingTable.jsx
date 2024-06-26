import React, { useState } from "react";
import { _makeGuess, _getLatestFeedback } from "../store/wallet";
import { COLORS, NUM_ROWS, CODE_LENGTH } from "../store/lib"; // Define these in a separate file

const GuessingTable = ({
  secretCode,
  gameOver,
  setGameOver,
  gameWon,
  setGameWon,
}) => {
  const [guesses, setGuesses] = useState(() =>
    Array.from({ length: NUM_ROWS }, () =>
      Array.from({ length: CODE_LENGTH }, () => null)
    )
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [feedback, setFeedback] = useState(() =>
    Array.from({ length: NUM_ROWS }, () =>
      Array.from({ length: CODE_LENGTH }, () => null)
    )
  );
  const [colorPicker, setColorPicker] = useState({
    rowIndex: null,
    pegIndex: null,
  });

  const handlePegClick = (rowIndex, pegIndex) => {
    if (rowIndex !== currentRow || gameOver) return;

    setColorPicker({ rowIndex, pegIndex });
  };

  const selectColor = (color) => {
    const { rowIndex, pegIndex } = colorPicker;
    if (rowIndex !== null && pegIndex !== null) {
      const newGuesses = [...guesses];
      newGuesses[rowIndex][pegIndex] = color;
      setGuesses(newGuesses);
    }
    setColorPicker({ rowIndex: null, pegIndex: null });
  };

  const fetchLatestFeedback = async () => {
    const feedbackData = await _getLatestFeedback();
    const [blackPegs, whitePegs] = feedbackData;

    const currentFeedback = Array(CODE_LENGTH).fill(null);
    for (let i = 0; i < blackPegs; i++) {
      currentFeedback[i] = "black";
    }
    for (let i = blackPegs; i < blackPegs + whitePegs; i++) {
      currentFeedback[i] = "white";
    }

    const newFeedback = [...feedback];
    newFeedback[currentRow] = currentFeedback;
    setFeedback(newFeedback);

    if (blackPegs === CODE_LENGTH) {
      setGameOver(true);
      setGameWon(true);
    } else if (currentRow < NUM_ROWS - 1) {
      setCurrentRow(currentRow + 1);
    } else {
      setGameOver(true);
    }
  };

  const handleCheck = async () => {
    const currentGuess = guesses[currentRow];
    const convertedGuess = currentGuess.map((color) => {
      return Object.keys(COLORS).find((key) => COLORS[key] === color);
    });

    const result = await _makeGuess({
      code1: convertedGuess[0],
      code2: convertedGuess[1],
      code3: convertedGuess[2],
      code4: convertedGuess[3],
    });

    if (result) {
      fetchLatestFeedback();
    } else {
      console.log("Failed to submit guess");
    }
  };

  return (
    <>
      {guesses.map((guess, rowIndex) => (
        <div key={rowIndex} className="flex items-center space-x-4 mb-4">
          {guess.map((color, pegIndex) => (
            <div key={pegIndex} className="relative">
              <div
                onClick={() => handlePegClick(rowIndex, pegIndex)}
                className={`w-10 h-10 rounded-full cursor-pointer`}
                style={{
                  backgroundColor: color ? color : "#d1d5db",
                  border: color ? `2px solid ${color}` : "none",
                }}
              ></div>
              {colorPicker.rowIndex === rowIndex &&
                colorPicker.pegIndex === pegIndex && (
                  <div className="absolute top-12 left-0 flex space-x-1 z-10 bg-white p-2 rounded shadow-lg">
                    {Object.entries(COLORS).map(([key, value]) => (
                      <div
                        key={key}
                        onClick={() => selectColor(value)}
                        className="w-8 h-8 rounded-full"
                        style={{
                          backgroundColor: value,
                          cursor: "pointer",
                        }}
                      ></div>
                    ))}
                  </div>
                )}
            </div>
          ))}
          <div className="flex space-x-2">
            {feedback[rowIndex].map((fb, fbIndex) => (
              <div
                key={fbIndex}
                className={`w-4 h-4 rounded-full`}
                style={{
                  backgroundColor:
                    fb === "black"
                      ? "#000"
                      : fb === "white"
                      ? "#f5f5f5"
                      : "#d1d5db",
                }}
              ></div>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={handleCheck}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        disabled={gameOver}
      >
        Check
      </button>
      {gameOver && (
        <div className="mt-4 text-center">
          {gameWon ? (
            <div className="text-green-500">You won! Congratulations!</div>
          ) : (
            <div className="text-red-500">
              Game over! The secret code was displayed above.
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default GuessingTable;
