import React, { useEffect, useState } from "react";
import Game from "./Game";
import Leaderboard from "./Leaderboard";
import SoundControl from "./SoundControl";
import InfoBox from "./InfoBox";
import { checkActiveGame } from "../store/wallet";
import { useGlobalState } from "../store/Data";
import { HiOutlineStatusOffline, HiOutlineStatusOnline } from "react-icons/hi";
const GamePlay = () => {
  const [maker] = useGlobalState("maker");
  const [breaker] = useGlobalState("breaker");
  const [activegame] = useGlobalState("activegame");
  const [makerscore] = useGlobalState("makerscore");
  const [breakerscore] = useGlobalState("breakerscore");

  const codeMakerScore = makerscore;
  const codeBreakerScore = breakerscore;

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const loadData = async () => {
      console.log("Board Loaded");
      setLoaded(true);
      await checkActiveGame();
    };
    loadData();
  }, []);
  const gameStatus = activegame ? (
    <div>
      <HiOutlineStatusOnline
        size={32}
        className="text-green-600 animate-pulse "
      />
    </div>
  ) : (
    <div>
      <HiOutlineStatusOffline size={32} className="text-red-500" />
    </div>
  );

  return (
    <div className="w-screen h-screen text-white flex items-center relative">
      <div className="p-28"></div>
      <div className="py-4 ">
        <Game />
      </div>
      <Leaderboard />
      <div className="fixed top-24 left-10">
        <InfoBox title="Code Maker" address={maker} score={codeMakerScore} />
      </div>
      <div className="fixed top-24 right-10">
        <InfoBox
          title="Code Breaker"
          address={breaker}
          score={codeBreakerScore}
        />
      </div>

      <div className="fixed top-[10%] left-[60%] items-center flex">
        {gameStatus}
      </div>
      <SoundControl />
    </div>
  );
};

export default GamePlay;
