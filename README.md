# Mastermind

## Introduction

Mastermind is a classic code-breaking game that has been enjoyed by many for decades. In this game, one player (the Code Maker) creates a secret code, and the other player (the Code Breaker) attempts to guess the code within a limited number of attempts. The Code Maker provides feedback in the form of black and white pegs:

- **Black Peg:** Indicates a correct color in the correct position.
- **White Peg:** Indicates a correct color in the wrong position.
- **No Peg:** Indicates an incorrect color.

The goal of the Code Breaker is to guess the entire code correctly within the allowed attempts.

## Project Overview

This project is a decentralized version of Mastermind, built on the Base network. It utilizes smart contracts to handle game logic and NFTs to represent game outcomes. The frontend is built with React and communicates with the smart contract to facilitate the gameplay.

## Live Project

- [How to play the Game](https://www.youtube.com/watch?v=5jtcsBERDEQ&t=1s)
- [Live Project](https://mastermind-seven-lilac.vercel.app/)

## How to Interact with the App

### Setting Up Roles

1. **Code Breaker Role:**

   - The Code Breaker must set their role before the Code Maker can set theirs.
   - To set the Code Breaker role, connect your wallet and click the button to become the Code Breaker.

2. **Code Maker Role:**
   - After the Code Breaker has set their role, the Code Maker can set their role by connecting their wallet and clicking the button to become the Code Maker.

### Starting the Game

- Once both roles are set, the Code Maker can start the game by setting a secret code consisting of four colors. The game begins immediately after the code is set.

### Making Guesses

- The Code Breaker makes guesses to decode the secret code.
- After each guess, the Code Maker provides feedback using black and white pegs:
  - **Black Peg:** Correct color in the correct position.
  - **White Peg:** Correct color in the wrong position.
  - **No Peg:** Indicates an incorrect color.
- The Code Breaker continues to guess until they either decode the secret code or exhaust their maximum number of guesses (10).

### Game Outcomes

- **Winning:** If the Code Breaker guesses the code correctly within the allowed attempts, they win the game. An NFT is minted to represent their victory.
- **Losing:** If the Code Breaker fails to guess the code within the allowed attempts, the Code Maker wins. An NFT is minted to represent the Code Maker's victory.

### Scoring

- **Code Breaker:** Earns 10,000 points for winning.
- **Code Maker:** Earns 100 points for each incorrect guess by the Code Breaker.

## Smart Contract Details

The smart contract handles:

- Setting roles for the Code Maker and Code Breaker.
- Starting the game and setting the secret code.
- Making guesses and providing feedback.
- Keeping track of scores and game status.
- Minting NFTs based on game outcomes.

### Events

- **GameStarted:** Emitted when the game starts.
- **GuessMade:** Emitted when a guess is made.
- **GameStatusChanged:** Emitted when the game status changes (e.g., won or lost).
- **GameEnded:** Emitted when the game ends.
- **ScoreUpdated:** Emitted when scores are updated.
- **CodebreakerSet:** Emitted when the Code Breaker role is set.
- **CodemakerSet:** Emitted when the Code Maker role is set.

## License

This project is licensed under the MIT License.
