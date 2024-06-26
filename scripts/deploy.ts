import hre from "hardhat";
import path from "path";
import fs from "fs";

async function main() {
  const Mastermind = await hre.ethers.getContractFactory("Mastermind");
  const contract = await Mastermind.deploy();

  const contractAddress = await contract.deployed();

  console.log(`contract deployed to ${contract.address}`);
  const filePath = path.join(__dirname, "deployedContractAddress.json");

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    console.log(
      "File already exists. Updating the file with the new contract address."
    );
  } else {
    console.log(
      "File does not exist. Creating a new file with the contract address."
    );
  }

  // Save the contract address to a JSON file
  const addressData = {
    MASTERMID_CONTRACT_ADDRESS: contractAddress.address,
  };

  fs.writeFileSync(filePath, JSON.stringify(addressData, null, 2));

  console.log("Contract address saved to deployedContractAddress.json");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
