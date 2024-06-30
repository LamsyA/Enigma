import React from "react";
import { useGlobalState } from "../store/Data";

const Leaderboard = () => {
  const [makerscore] = useGlobalState("makerscore");
  const [breakerscore] = useGlobalState("breakerscore");
  const [maker] = useGlobalState("maker");
  const [breaker] = useGlobalState("breaker");

  const leaderboardData = [
    { name: "Player1", score: 20000 },
    { name: "Player2", score: 15000 },
    { name: "Player3", score: 14590 },
    { name: "Player5", score: 12000 },
    {
      name: `${maker?.slice(0, 5)}...${maker?.slice(-5, -1)}` || "codemaker",
      score: makerscore,
    },
    {
      name:
        `${breaker?.slice(0, 5)}...${breaker?.slice(-5, -1)}` || "codebreaker",
      score: breakerscore,
    },
  ];

  const sortedLeaderboard = leaderboardData
    .sort((a, b) => b.score - a.score)
    .map((player, index) => ({ ...player, position: index + 1 }));

  return (
    <div className="w-full max-w-md mx-auto border border-white bg-[#0F1116] rounded-2xl shadow-lg mt-8">
      <h2 className="text-center border-b rounded-full shadow-md shadow-zinc-500 text-2xl font-bold text-yellow-600 p-4 border-gray-300">
        Leaderboard
      </h2>
      <ul className="divide-y divide-gray-200">
        {sortedLeaderboard.map((player) => (
          <li
            key={player.position}
            className="flex justify-between p-4 text-white rounded-full shadow-md shadow-zinc-500 bg-[#1E1E1E] m-2"
          >
            <span className="font-semibold">
              {player.position}. {player.name}
            </span>
            <span className="font-bold text-yellow-500">{player.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
