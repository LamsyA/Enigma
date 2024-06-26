import React from "react";
import { FaEthereum, FaTimes } from "react-icons/fa";
import { useGlobalState, setGlobalState } from "../store/Data";
import { setCodeMakerAddress, setCodeBreakerAddress } from "../store/wallet";

const Player = () => {
  const [active] = useGlobalState("active");

  const handleCodeMaker = async () => {
    setGlobalState("active", "scale-0");
    console.log("newly clicked");
    try {
      await setCodeMakerAddress().catch((error) => {
        console.log("Error", error);
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleCodeBreaker = async () => {
    setGlobalState("active", "scale-0");
    console.log("newly clicked");
    try {
      await setCodeBreakerAddress().catch((error) => {
        console.log("Error", error);
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex
        items-center z-40 justify-center bg-black bg-opacity-90 transform 
        transition-transform duration-300 ${active}`}
    >
      <div
        className="bg-white shadow-lg shadow-black w-11/12 md:w-2/5
            h-7/12 p-6 rounded-xl"
      >
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Player</p>
            <button
              type="button"
              onClick={() => setGlobalState("active", "scale-0")}
              className="border-0 bg-transparent 
                        focus:outline-none "
            >
              <FaTimes />
            </button>
          </div>
          <button
            className=" flex justify-center items-center
                                shadow-lg shadow-black text-white bg-gray-500
                                hover:bg-gray-700 rounded-full mt-5 p-2 uppercase "
            onClick={handleCodeMaker}
          >
            {" "}
            CodeMaker
          </button>
          <button
            className=" flex justify-center items-center
                                shadow-lg shadow-black text-white bg-gray-500
                                hover:bg-gray-700 rounded-full mt-5 p-2 uppercase "
            onClick={handleCodeBreaker}
          >
            {" "}
            CodeBreaker
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
