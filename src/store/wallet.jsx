import React, { createContext, useContext } from "react";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { CONTRACT } from "../utils/const";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { getGlobalState, setGlobalState } from "./Data";
import { toast } from "react-toastify";
// import toast from "react-toastify";

const ContractContext = createContext({
    activeAccount: null,
    _startGame: () => {},
    _makeGuess: () => {},
    _setCodeMakerAddress: () => {},
    _setCodeBreakerAddress: () => {},
    getCodemaker: () => {},
    getCodebreaker: () => {},
    checkActiveGame: () => {},
    getcodemakerscore: () => {},
    getcodebreakerscore: () => {},
    getRole: () => {},
    _getLatestFeedback: () => {},
    _getAllGuessesAndFeedback: () => {},
    _getSecretCode: () => {},
    _getGuessesCodes: () => {},
    getGuess: () => {}
});

const ContractProvider = ({ children }) => {

    const activeAccount = useActiveAccount();

    const codemakerData = useReadContract({
        contract: CONTRACT,
        method: "codemaker",
    });
    const codebreakerData = useReadContract({
        contract: CONTRACT,
        method: "codebreaker",
    });
    const gameActiveData = useReadContract({
        contract: CONTRACT,
        method: "gameActive",
    });
    const makerScoreData = useReadContract({
        contract: CONTRACT,
        method: "getMakerScore",
    });
    const breakerScoreData = useReadContract({
        contract: CONTRACT,
        method: "getBreakerScore",
    });
    const latestFeedbackData = useReadContract({
        contract: CONTRACT,
        method: "getLatestFeedback",
    });
    const allGuessesData = useReadContract({
        contract: CONTRACT,
        method: "getGuessesCodes",
    });
    const allFeedbackData = useReadContract({
        contract: CONTRACT,
        method: "getAllFeedback",
    });
    const secretCodeData = useReadContract({
        contract: CONTRACT,
        method: "getSecret",
    });
    const guessesData = useReadContract({
        contract: CONTRACT,
        method: "getGuessesCodes",
    });

    const _startGame = async ( {code1, code2, code3, code4} ) => {
        try {
            // toast.loading("Executing...", { duration: 5000 });
            const tx = prepareContractCall({
                contract: CONTRACT,
                method: "startGame",
                params: [code1,code2,code3,code4],
            });
            const { transactionHash } = await sendTransaction({
                transaction: tx,
                account: activeAccount,
            });
            console.log({ transactionHash });
            // toast.success("Transaction successful!");
            return true;
        } catch (error) {
            // toast.error("Transaction failed!");
            console.log({ error });
            console.error(error);
        }
    };

    const _makeGuess = async ({ code1, code2, code3, code4 }) => {
        try {
            // toast.loading("Executing...", { duration: 5000 });
            const tx = prepareContractCall({
                contract: CONTRACT,
                method: "makeGuess",
                params: [code1, code2, code3, code4],
            });
            const { transactionHash } = await sendTransaction({
                transaction: tx,
                account: activeAccount,
            });
            console.log({ transactionHash });
            // toast.success("Transaction successful!");
            return true;
        } catch (error) {
            // toast.error("Transaction failed!");
            console.log({ error });
            console.error(error);
        }
    };

    const _setCodeMakerAddress = async () => {
        try {
            // toast.loading("Executing...", { duration: 5000 });
            const tx = prepareContractCall({
                contract: CONTRACT,
                method: "setCodemaker",
            });
            const { transactionHash } = await sendTransaction({
                transaction: tx,
                account: activeAccount,
            });
            console.log({ transactionHash });
            toast.success("Codemaker address set!");
            return true;
        } catch (error) {
            // toast.error("Transaction failed!");
            console.log({ error });
            console.error(error);
        }
    };

    const _setCodeBreakerAddress = async () => {
        try {
            // toast.loading("Executing...", { duration: 5000 });
            const tx = prepareContractCall({
                contract: CONTRACT,
                method: "setCodebreaker",
            });
            const { transactionHash } = await sendTransaction({
                transaction: tx,
                account: activeAccount,
            });
            console.log({ transactionHash });
            toast.success("Codebreaker address set!");
            return true;
        } catch (error) {
            // toast.error("Transaction failed!");
            console.log({ error });
            console.error(error);
        }
    };

    const getCodemaker = async () => {
        try {
            const { data: maker } = codemakerData;
            setGlobalState("maker", maker);
            if (maker === "0x0000000000000000000000000000000000000000") {
                setGlobalState("ismaker", false);
                return false;
            } else {
                setGlobalState("ismaker", true);
                return true;
            }
        } catch (error) {
            // toast.error("Transaction failed!");
            console.log({ error });
            console.error(error);
        }
    };

    const getCodebreaker = async () => {
        try {
            const { data: breaker } = codebreakerData;
            setGlobalState("breaker", breaker);
        } catch (error) {
            // toast.error("Transaction failed!");
            console.log({ error });
            console.error(error);
        }
    };

    const checkActiveGame = async () => {
        try {
            const { data: active } = gameActiveData;
            setGlobalState("activegame", active);
        } catch (error) {
            // toast.error("Transaction failed!");
            console.log({ error });
            console.error(error);
        }
    };

    const getcodemakerscore = async () => {
        try {
            const { data: makerscore } = makerScoreData;
            setGlobalState("makerscore", Number(makerscore));
        } catch (error) {
            // toast.error("Transaction failed!");
            console.log({ error });
            console.error(error);
        }
    };

    const getcodebreakerscore = async () => {
        try {
            const { data: breakerscore } = breakerScoreData;
            setGlobalState("breakerscore", Number(breakerscore));
        } catch (error) {
            // toast.error("Transaction failed!");
            console.log({ error });
            console.error(error);
        }
    };

    const getRole = async () => {
        try {
            const { data: maker } = codemakerData;
            const { data: breaker } = codebreakerData;
            if (activeAccount.address.toLowerCase() === maker.toLowerCase()) {
                return "codeMaker";
            }
            if (activeAccount.address.toLowerCase() === breaker.toLowerCase()) {
                return "codeBreaker";
            }
            return null;
        } catch (error) {
            // toast.error("Transaction failed!");
            console.log({ error });
            console.error(error);
        }
    };

    const _getLatestFeedback = async () => {
        try {
            const { data: feedback } = latestFeedbackData;
            const feedbacks = feedback
                ? [feedback.blackPegs.toString(), feedback.whitePegs.toString()]
                : [0, 0];
            console.log("feedback: ", feedbacks);
            return feedback;
        } catch (error) {
            // toast.error("Transaction failed!");
            console.log({ error });
            console.error(error);
        }
    };

    const _getAllGuessesAndFeedback = async () => {
        try {
            const { data: allGuesses } = allGuessesData;
            const { data: feedback } = allFeedbackData;
            const allFeedback = feedback.map((fb) => [fb[0], fb[1]]);
            console.log("all guesses and feedback: ", allGuesses, allFeedback);
            return { allGuesses, allFeedback };
        } catch (error) {
            // toast.error("Error fetching guesses and feedback");
            console.error(error);
            return { allGuesses: [], allFeedback: [] };
        }
    };

    const _getSecretCode = async () => {
        try {
            const { data: secretCode } = secretCodeData;
            console.log("secret code: ", secretCode);
            return secretCode;
        } catch (error) {
            // toast.error("Transaction failed!");
            console.log({ error });
            console.error(error);
        }
    };

    const _getGuessesCodes = async () => {
        try {
            const { data: feedback } = guessesData;
            const feedbacks = feedback
                ? [feedback.blackPegs.toString(), feedback.whitePegs.toString()]
                : [0, 0];
            console.log("code guessess ...: ", feedbacks);
            return feedback;
        } catch (error) {
            // toast.error("Transaction failed!");
            console.log({ error });
            console.error(error);
        }
    };

    const getGuess = async () => {
        try {
            const { data: guess } = guessesData;
            setGlobalState("guesses", guess);
            console.log("guess: ", guess);
            return guess;
        } catch (error) {
            // toast.error("Transaction failed!");
            console.log({ error });
            console.error(error);
        }
    };

    return (
        <ContractContext.Provider
            value={{
                activeAccount,
                _startGame,
                _makeGuess,
                _setCodeMakerAddress,
                _setCodeBreakerAddress,
                getCodemaker,
                getCodebreaker,
                checkActiveGame,
                getcodebreakerscore,
                getcodemakerscore,
                getRole,
                _getLatestFeedback,
                _getAllGuessesAndFeedback,
                _getSecretCode,
                _getGuessesCodes,
                getGuess
            }}
        >
            {children}
        </ContractContext.Provider>
    );
};

const useContractContext = () => useContext(ContractContext);

export { ContractProvider, useContractContext };
