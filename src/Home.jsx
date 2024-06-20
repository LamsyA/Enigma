import React from "react";

const Home = ({ onStartGame }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brown-900 text-white p-4">
      <h1 className="text-5xl mb-6 animate__animated animate__bounceInDown">
        Welcome to Mastermind Game
      </h1>
      <div className="text-center mb-8 animate__animated animate__fadeInUp">
        <h2 className="text-2xl mb-4">How to Play:</h2>
        <p className="mb-2">1. Set the secret code using the color pegs.</p>
        <p className="mb-2">
          2. Try to guess the secret code by placing the pegs in each row.
        </p>
        <p className="mb-2">3. After each guess, you will receive feedback:</p>
        <p className="mb-2"> - Black peg: Correct color and position.</p>
        <p className="mb-2"> - White peg: Correct color but wrong position.</p>
        <p className="mb-2">4. Try to guess the secret code in 10 attempts.</p>
      </div>
      <button
        onClick={onStartGame}
        className="px-6 py-3 bg-blue-500 text-white rounded-full text-xl animate__animated animate__pulse"
      >
        Start Game
      </button>
    </div>
  );
};

export default Home;
