import React from "react";
const leaderboardData = [
  { position: 1, name: "Player1", score: 20000 },
  { position: 2, name: "Player2", score: 15000 },
  { position: 3, name: "Player3", score: 14590 },
  { position: 4, name: "Player4", score: 14000 },
  { position: 5, name: "Player5", score: 12000 },
];

const Leaderboard = () => {
  return (
    <div className="w-full max-w-md mx-auto border border-white bg-[#0F1116] rounded-lg shadow-lg mt-8">
      <h2 className="text-center text-2xl font-bold text-yellow-600 p-4 border-b border-gray-300">
        Leaderboard
      </h2>
      <ul>
        {leaderboardData.map((player) => (
          <li
            key={player.position}
            className="flex justify-between p-4 text-white border-b border-gray-200"
          >
            <span>
              {player.position}. {player.name}
            </span>
            <span>{player.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
