import React, { useState } from "react";
// import { _startGame } from "../store/wallet";
import { useGlobalState } from "../store/Data";
import { COLORS, CODE_LENGTH } from "../store/lib";
import { useContractContext } from "../store/wallet";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const SecretCodeSetter = ({ setSecretCode, setIsSettingSecretCode }) => {
  const { _startGame } = useContractContext();

  const [activegame] = useGlobalState("activegame");
  const [secretCode, setLocalSecretCode] = useState(
    Array(CODE_LENGTH).fill(null)
  );
  const [colorPicker, setColorPicker] = useState({ pegIndex: null });
  const [loading, setLoading] = useState(false);

  const selectColor = (color) => {
    const { pegIndex } = colorPicker;
    if (pegIndex !== null) {
      const newSecretCode = [...secretCode];
      newSecretCode[pegIndex] = color;
      setLocalSecretCode(newSecretCode);
    }
    setColorPicker({ pegIndex: null });
  };

  const handleSecretCodeSubmit = () => {
    if (secretCode.every((color) => color !== null)) {
      const convertedSecretCode = secretCode.map((color) => {
        return Object.keys(COLORS).find((key) => COLORS[key] === color);
      });
      
      _startGame({
        code1: convertedSecretCode[0],
        code2: convertedSecretCode[1],
        code3: convertedSecretCode[2],
        code4: convertedSecretCode[3],
      });
      setLoading(true);

      setSecretCode(secretCode);
      setIsSettingSecretCode(activegame);
      setLoading(false);
    } else {
      toast("Please select a color for all pegs in the secret code.", {
        position: "top-center"
      });
    }
  };

  if (activegame) return null;

  return (
    <div>
      <div className="text-center mb-5">Set the Secret Code</div>
      <div className="flex items-center justify-center space-x-4 mb-5">
        {secretCode.map((color, pegIndex) => (
          <div key={pegIndex} className="relative">
            <div
              onClick={() => setColorPicker({ pegIndex })}
              className={`w-10 h-10 rounded-full cursor-pointer`}
              style={{
                backgroundColor: color ? color : "#d1d5db",
                border: color ? `2px solid ${color}` : "none",
              }}
            ></div>
            {colorPicker.pegIndex === pegIndex && (
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
      </div>
      <button
        onClick={handleSecretCodeSubmit}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        {loading ? <ClipLoader color="white" size={16}/> : "Set Secret Code"}
      </button>
    </div>
  );
};

export default SecretCodeSetter;
