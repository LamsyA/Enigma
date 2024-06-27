// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";
import "./Counters.sol";

contract Mastermind is ERC721 {

    error Mastermind__GameAlreadyStarted();
    using Counters for Counters.Counter;

    Counters.Counter private _tokenId;
    address public codemaker;
    address public codebreaker;
    bytes32 private secretCodeHash;
    uint8[] private secretCode;
    uint public guessCount;
    bool public gameActive;

    uint8 constant CODE_LENGTH = 4;
    uint8 constant MAX_GUESSES = 10;

    enum GameStatus { InSession, Won, Lost }
    GameStatus public gameStatus;

    struct Guess {
        uint8[] code;
        uint8 blackPegs;
        uint8 whitePegs;
        bool correct;
    }

    Guess[] public guesses;

    uint public scoreCodebreaker;
    uint public scoreCodemaker;

    event GameStarted(address indexed codemaker, uint256 timestamp);
    event GuessMade(address indexed codebreaker, uint8[] guess, uint8 blackPegs, uint8 whitePegs, bool correct, uint256 timestamp);
    event GameStatusChanged(GameStatus status, uint256 timestamp);
    event GameEnded(address indexed winner, uint256 timestamp);
    event ScoreUpdated(uint scoreCodebreaker, uint scoreCodemaker, uint256 timestamp);
    event CodebreakerSet(address indexed codebreaker, uint256 timestamp);
    event CodemakerSet(address indexed codemaker, uint256 timestamp);

    modifier onlyCodemaker() {
        require(msg.sender == codemaker, "Only the codemaker can call this function");
        _;
    }

    modifier onlyCodebreaker() {
        require(msg.sender == codebreaker, "Only the codebreaker can call this function");
        _;
    }

    constructor() ERC721("MasterMind", "MSM") {
        gameActive = false;
    }

    function setCodebreaker() public {
        require(!gameActive, "Game in session");
        codebreaker = msg.sender;
        emit CodebreakerSet(codebreaker, block.timestamp);
    }

    function setCodemaker() public {
        require(!gameActive, "Game in session");
        codemaker = msg.sender;
        emit CodemakerSet(codemaker, block.timestamp);
    }

    function startGame(uint8[] memory _secretCode) public onlyCodemaker {
        require(codemaker != address(0), "codemaker address must be set");
        require(codebreaker != address(0), "Codebreaker address must be set");
        require(_secretCode.length == CODE_LENGTH, "Secret code must be 4 digits long");
        if(gameActive == true) {
            revert Mastermind__GameAlreadyStarted();
        }
        secretCode = _secretCode;
        secretCodeHash = keccak256(abi.encodePacked(_secretCode));
        guessCount = 0;
        delete guesses;
        gameActive = true;
        gameStatus = GameStatus.InSession;
        scoreCodebreaker = 0;
        scoreCodemaker = 0;

        emit GameStarted(codemaker, block.timestamp);
        emit GameStatusChanged(gameStatus, block.timestamp);
        emit ScoreUpdated(scoreCodebreaker, scoreCodemaker, block.timestamp);
    }

    function makeGuess(uint8[] memory _guess) public onlyCodebreaker {
        require(gameActive, "Game is not active");
        require(_guess.length == CODE_LENGTH, "Guess must be 4 digits long");
        require(guessCount < MAX_GUESSES, "Maximum number of guesses reached");

        (uint8 blackPegs, uint8 whitePegs) = evaluateGuess(_guess);
        bool correctGuess = blackPegs == CODE_LENGTH;

        guesses.push(Guess({
            code: _guess,
            blackPegs: blackPegs,
            whitePegs: whitePegs,
            correct: correctGuess
        }));

        emit GuessMade(codebreaker, _guess, blackPegs, whitePegs, correctGuess, block.timestamp);

        if (correctGuess) {
            gameActive = false;
            gameStatus = GameStatus.Won;
            scoreCodebreaker += 10000;
            _tokenId.increment();

            uint256 tokenId = _tokenId.current();
            _safeMint(codebreaker, tokenId);

            emit GameStatusChanged(gameStatus, block.timestamp);
            emit GameEnded(codebreaker, block.timestamp);
            emit ScoreUpdated(scoreCodebreaker, scoreCodemaker, block.timestamp);
        } else {
            scoreCodemaker += 100;
            guessCount++;
            if (guessCount >= MAX_GUESSES) {
                gameActive = false;
                gameStatus = GameStatus.Lost;
                _tokenId.increment();

                uint256 tokenId = _tokenId.current();
                _safeMint(codemaker, tokenId);

                emit GameStatusChanged(gameStatus, block.timestamp);
                emit GameEnded(codemaker, block.timestamp);
                emit ScoreUpdated(scoreCodebreaker, scoreCodemaker, block.timestamp);
            }
        }
    }

    function evaluateGuess(uint8[] memory _guess) internal view returns (uint8 blackPegs, uint8 whitePegs) {
        uint8[CODE_LENGTH] memory codeFlags;
        uint8[CODE_LENGTH] memory guessFlags;

        for (uint8 i = 0; i < CODE_LENGTH; i++) {
            if (_guess[i] == secretCode[i]) {
                blackPegs++;
                codeFlags[i] = 1;
                guessFlags[i] = 1;
            }
        }

        for (uint8 i = 0; i < CODE_LENGTH; i++) {
            if (guessFlags[i] == 0) {
                for (uint8 j = 0; j < CODE_LENGTH; j++) {
                    if (codeFlags[j] == 0 && _guess[i] == secretCode[j]) {
                        whitePegs++;
                        codeFlags[j] = 1;
                        break;
                    }
                }
            }
        }
    }

    

function tokenURI(uint256 tokenId) public view override returns (string memory) {
    string memory gameResult = gameStatus == GameStatus.Won ? "Won" : "Lost";
    string memory svgImage = generateSVGImage(gameResult, tokenId);
    address owner = ownerOf(tokenId); // Get the owner's address
    
    string memory json = Base64.encode(
        bytes(
            abi.encodePacked(
                '{"name":"Mastermind #',
                uintToString(tokenId),
                '", "description":"An NFT that reflects the outcome of a Mastermind game", ',
                '"attributes": [{"trait_type": "game_result", "value": "',
                gameResult,
                '"}, {"trait_type": "owner", "value": "',
                toAsciiString(owner),
                '"}], "image":"',
                svgImage,
                '"}'
            )
        )
    );

    return string(abi.encodePacked(_baseURI(), json));
}

function toAsciiString(address x) internal pure returns (string memory) {
    bytes memory s = new bytes(40);
    for (uint i = 0; i < 20; i++) {
        bytes1 b = bytes1(uint8(uint(uint160(x)) / (2**(8*(19 - i)))));
        bytes1 hi = bytes1(uint8(b) / 16);
        bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
        s[2*i] = char(hi);
        s[2*i+1] = char(lo);            
    }
    return string(s);
}

function char(bytes1 b) internal pure returns (bytes1 c) {
    if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
    else return bytes1(uint8(b) + 0x57);
}

function generateSVGImage(string memory gameResult, uint256 tokenId) internal pure returns (string memory) {
    string memory svg = string(
        abi.encodePacked(
            '<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">',
            '<rect width="300" height="300" fill="#3c0a63" rx="40" ry="40" stroke="#ffd700" stroke-width="20"/>',
            '<circle cx="150" cy="60" r="30" fill="#00cfff"/>',
            '<circle cx="60" cy="150" r="30" fill="#00ff57"/>',
            '<circle cx="150" cy="240" r="30" fill="#ff5c5c"/>',
            '<circle cx="240" cy="150" r="30" fill="#b25cff"/>',
            '<circle cx="60" cy="60" r="30" fill="#ff9b00"/>',
            '<circle cx="240" cy="60" r="30" fill="#ff5cf2"/>',
            '<circle cx="240" cy="240" r="30" fill="#ff9b00"/>',  
            '<circle cx="60" cy="240" r="30" fill="#ffcf00"/>',  
            '<text x="150" y="165" font-family="Arial" font-size="72" fill="#c568ff" text-anchor="middle" dominant-baseline="middle">m</text>',
            '<text x="40" y="280" font-family="Roboto" font-size="16" fill="white">',
            'Game Result: ',
            gameResult,
            '</text>',
            '<text x="40" y="295" font-family="Roboto" font-size="16" fill="white">',
            'Token ID: ',
            uintToString(tokenId),
            '</text>',
            '</svg>'
        )
    );

    string memory svgBase64Encoded = string(
        abi.encodePacked(
            "data:image/svg+xml;base64,",
            Base64.encode(bytes(svg))
        )
    );

    return svgBase64Encoded;
}



    function uintToString(uint256 v) internal pure returns (string memory) {
        uint256 maxLength = 78;
        bytes memory reversed = new bytes(maxLength);
        uint256 i = 0;
        while (v != 0) {
            uint256 remainder = v % 10;
            v = v / 10;
            reversed[i++] = bytes1(uint8(48 + remainder));
        }
        bytes memory s = new bytes(i);
        for (uint256 j = 0; j < i; j++) {
            s[j] = reversed[i - j - 1];
        }
        string memory str = string(s);
        return str;
    }

    function getGuesses() public view returns (Guess[] memory) {
        return guesses;
    }

    function getMakerScore() public view returns (uint) {
        return scoreCodemaker;
    }

    function getBreakerScore() public view returns (uint) {
        return scoreCodebreaker;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "data:application/json;base64,";
    }

    function getGuessesCodes() public view returns (uint8[][] memory) {
        uint8[][] memory codes = new uint8[][](guesses.length);
        for (uint i = 0; i < guesses.length; i++) {
            codes[i] = guesses[i].code;
        }
        return codes;
    }
    function getLatestFeedback() public view returns (uint8 blackPegs, uint8 whitePegs) {
        require(guesses.length > 0, "No guesses made yet");
        Guess memory latestGuess = guesses[guesses.length - 1];
        return (latestGuess.blackPegs, latestGuess.whitePegs);
    }

    function getAllFeedback() public view returns (uint8[2][] memory) {
        uint8[2][] memory allFeedback = new uint8[2][](guesses.length);
        for (uint i = 0; i < guesses.length; i++) {
            allFeedback[i] = [guesses[i].blackPegs, guesses[i].whitePegs];
        }
        return allFeedback;
    }
   
    function getSecret() public view  returns( uint8[] memory _secret) {
        if(gameStatus == GameStatus.Won) {
         return secretCode;
        } else if(gameStatus == GameStatus.Lost)  {
         return secretCode;
     } else return new uint8[](CODE_LENGTH);
     }
        
}
