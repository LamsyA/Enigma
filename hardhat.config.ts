import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { vars } from "hardhat/config";

const ALCHEMY_API_KEY = vars.get("ALCHEMY_API_KEY");
const PRIVATE_KEY = vars.get("PRIVATE_KEY");

const BASE_API_KEY = vars.get("BASE_API_KEY");

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    // settings: {
    //   optimizer: {
    //     enabled: true,
    //     runs: 1000,
    //   },
    // },
  },
  etherscan: {
    apiKey: {
      base: BASE_API_KEY,
    },
    customChains: [
      {
        network: "base",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "'https://sepolia.base.org',",
        },
      },
    ],
  },
  networks: {
    base: {
      url: `https://base-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },

    localhost: {
      url: "http://127.0.0.1:8545",
      // chainId: 31337,
    },
  },

  paths: {
    artifacts: "./src/abis",
  },
};

export default config;
