const hre = require("hardhat");

async function main() {
  const PrimeAssets = await hre.ethers.getContractFactory("PrimeAssets");
  const primeAssets = await PrimeAssets.deploy();

  await primeAssets.deployed();

  console.log(`PrimeAssets deployed to ${primeAssets.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
