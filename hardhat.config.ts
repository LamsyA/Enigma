import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { vars } from "hardhat/config";

const INFURA_API_KEY = vars.get("INFURA_API_KEY");
const PRIVATE_KEY = vars.get("PRIVATE_KEY");

const LINEASCAN_API_KEY = vars.get("LINEASCAN_API_KEY");

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
      linea: LINEASCAN_API_KEY,
    },
    customChains: [
      {
        network: "linea",
        chainId: 59141,
        urls: {
          apiURL: "https://api-sepolia.lineascan.build/api",
          browserURL: "https://sepolia.lineascan.build/address",
        },
      },
    ],
  },
  networks: {
    linea: {
      url: INFURA_API_KEY,
      accounts: [PRIVATE_KEY],
      gasPrice: 200000000,
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
// account factory: 0x9AEE3332FC634A982172F2010a3116abC4Ddd0e9
// contract deployed to 0x9D22c2ac1428117AE5b797092A5995A4e9957072
// Token deployed to 0x357421A38AD67C365913f3daBa6DD480EfBd0cf4

export default config;
