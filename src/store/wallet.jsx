import abi from "../abis/contracts/Mastermind.sol/Mastermind.json";

import MASTERMID_CONTRACT_ADDRESS from "./deployedContractAddress.json";
import { getGlobalState, setGlobalState } from "./Data";
import { ethers } from "ethers";

const contractAddress = MASTERMID_CONTRACT_ADDRESS.MASTERMID_CONTRACT_ADDRESS;
console.log(contractAddress);
const contractAbi = abi.abi;

// const contractAddress = import.meta.env.VITE_INFURA_CONTRACT_ADDRESS;
const connectWallet = async () => {
  try {
    if (!ethereum) return alert("Wallet not found");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
  } catch (error) {
    reportError(error);
  }
};
const isWalletConnected = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_accounts" });
    setGlobalState("connectedAccount", accounts[0]?.toLowerCase());

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async () => {
      setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
      await isWalletConnected();
    });

    if (accounts.length) {
      setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
      return true;
    } else {
      //   alert("Please connect wallet.");
      console.log("No accounts found.");
      return false;
    }
  } catch (error) {
    reportError(error);
  }
};
const getContract = async () => {
  const connectedAccount = getGlobalState("connectedAccount");

  if (connectedAccount) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const provider = new ethers.JsonRpcProvider("");
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    return contract;
  } else {
    return getGlobalState("contract");
  }
};

const _startGame = async ({ code1, code2, code3, code4 }) => {
  console.log("testing code ", code1, code2, code3, code4);
  try {
    if (!ethereum) return alert("Please install Metamask");
    // const connectedAccount = getGlobalState("connectedAccount");
    const contract = await getContract();
    console.log("Code ", [code1, code2, code3, code4]);
    const start = await contract.startGame([code1, code2, code3, code4]);
    console.log("Created start Game:", start);
    await start.wait();
    return true;
  } catch (error) {
    console.log(error);
    reportError(error);
  }
};

const _makeGuess = async ({ code1, code2, code3, code4 }) => {
  console.log("testing code ", code1, code2, code3, code4);
  try {
    if (!ethereum) return alert("Please install Metamask");
    // const connectedAccount = getGlobalState("connectedAccount");
    const contract = await getContract();
    console.log("Code ", [code1, code2, code3, code4]);
    const start = await contract.makeGuess([code1, code2, code3, code4]);
    console.log("Created start Game:", start);
    await start.wait();
    return true;
  } catch (error) {
    console.log(error);
    reportError(error);
  }
};

const setCodeMakerAddress = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const connectedAccount = getGlobalState("connectedAccount");
    const contract = await getContract();
    console.log("connected account ", connectedAccount);
    const codemaker = await contract.setCodemaker();
    console.log(" code maker address:", codemaker);
    await codemaker.wait();
    return true;
  } catch (error) {
    console.log(error);
    reportError(error);
  }
};
const setCodeBreakerAddress = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const connectedAccount = getGlobalState("connectedAccount");
    const contract = await getContract();
    console.log("connected account ", connectedAccount);
    const breaker = await contract.setCodebreaker();

    console.log("code breaker address:", breaker);
    await breaker.wait().then((res) => {
      console.log("result :", res);
    });
    return true;
  } catch (error) {
    console.log(error);
    reportError(error);
  }
};

const setCodebreaker = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const connectedAccount = getGlobalState("connectedAccount");
    const contract = await getContract();
    console.log("connected account ", connectedAccount);
    const codemaker = await contract.setCodebreaker();
    console.log("code breaker address:", codemaker);
  } catch (error) {
    console.log(error);
    reportError(error);
  }
};

const setCodemaker = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const connectedAccount = getGlobalState("connectedAccount");
    const contract = await getContract();
    console.log("connected account ", connectedAccount);
    const codemaker = await contract.setCodemaker();
    console.log("code breaker address:", codemaker);
  } catch (error) {
    console.log(error);
    reportError(error);
  }
};
const getCodemaker = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getContract();
    const maker = await contract.codemaker();
    console.log("maker", maker);
    setGlobalState("maker", maker);
    if (maker === "0x0000000000000000000000000000000000000000") {
      setGlobalState("ismaker", false);
      return false;
    } else {
      setGlobalState("ismaker", true);
      return true;
    }
  } catch (error) {
    reportError(error.message);
  }
};
const getCodebreaker = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getContract();
    const breaker = await contract.codebreaker();
    setGlobalState("breaker", breaker);
    console.log("breaker", breaker);
  } catch (error) {
    reportError(error.message);
  }
};

const checkActiveGame = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getContract();
    const active = await contract.gameActive();
    console.log("activegame", active);
    setGlobalState("activegame", active);
  } catch (error) {
    reportError(error.message);
  }
};

const getcodemakerscore = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getContract();
    const makerscore = await contract.getMakerScore();
    console.log("makerscore", Number(makerscore));
    setGlobalState("makerscore", Number(makerscore));
  } catch (error) {
    reportError(error.message);
  }
};

const getcodebreakerscore = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getContract();
    const breakerscore = await contract.getBreakerScore();
    console.log("breakerscore", Number(breakerscore));
    setGlobalState("breakerscore", Number(breakerscore));
  } catch (error) {
    reportError(error.message);
  }
};

const getRole = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getContract();
    const codemaker = await contract.codemaker();
    const codebreaker = await contract.codebreaker();
    if (account.toLowerCase() === codemaker.toLowerCase()) {
      return "codeMaker";
    }
    if (account.toLowerCase() === codebreaker.toLowerCase()) {
      return "codeBreaker";
    }
    return null;
  } catch (error) {
    reportError(error.message);
  }
};

const _getLatestFeedback = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getContract();
    const feedback = await contract.getLatestFeedback();
    const feedbacks = feedback
      ? [feedback.blackPegs.toString(), feedback.whitePegs.toString()]
      : [0, 0];
    console.log("feedback: ", feedbacks);
    return feedback;
  } catch (error) {
    reportError(error.message);
  }
};
const _getAllGuessesAndFeedback = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getContract();
    const allGuesses = await contract.getGuessesCodes();
    const feedback = await contract.getAllFeedback();

    const allFeedback = feedback.map((fb) => [fb[0], fb[1]]);

    console.log("all guesses and feedback: ", allGuesses, allFeedback);
    return { allGuesses, allFeedback };
  } catch (error) {
    console.error("Error fetching guesses and feedback:", error);
    return { allGuesses: [], allFeedback: [] };
  }
};

const _getSecretCode = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getContract();
    const secretCode = await contract.getSecret();
    console.log("secret code: ", secretCode);
    return secretCode;
  } catch (error) {
    reportError(error.message);
  }
};

const _getGuessesCodes = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getContract();
    const feedback = await contract.getAllGuesses();
    const feedbacks = feedback
      ? [feedback.blackPegs.toString(), feedback.whitePegs.toString()]
      : [0, 0];
    console.log("code guessess ...: ", feedbacks);
    return feedback;
    // if (feedback === 0) {
    //   return false;
    // } else {
    //   return true;
    // }
  } catch (error) {
    reportError(error.message);
  }
};

const getGuess = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getContract();
    const guesses = await contract.getGuessesCodes();
    console.log("guesses", guesses);
    setGlobalState("guesses", guesses);
  } catch (error) {
    reportError(error.message);
  }
};

const reportError = (error) => {
  console.log(error.message);
  throw new Error("Error", error);
};

export {
  connectWallet,
  isWalletConnected,
  getContract,
  getCodemaker,
  _makeGuess,
  _startGame,
  setCodeMakerAddress,
  setCodeBreakerAddress,
  getGuess,
  checkActiveGame,
  _getLatestFeedback,
  _getGuessesCodes,
  setCodebreaker,
  setCodemaker,
  getRole,
  _getAllGuessesAndFeedback,
  _getSecretCode,
  getCodebreaker,
  getcodebreakerscore,
  getcodemakerscore,
};
