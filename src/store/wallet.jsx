import abi from "../artifacts/contracts/Mastermind.sol/Mastermind.json";

import MASTERMID_CONTRACT_ADDRESS from "./deployedContractAddress.json";
import { getGlobalState, setGlobalState } from "./Data";
import { ethers } from "ethers";

const { ethereum } = window;
const contractAddress = MASTERMID_CONTRACT_ADDRESS;
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
    } else {
      alert("Please connect wallet.");
      console.log("No accounts found.");
    }
  } catch (error) {
    reportError(error);
  }
};
const getContract = async () => {
  const connectedAccount = getGlobalState("connectedAccount");

  if (connectedAccount) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    return contract;
  } else {
    return getGlobalState("contract");
  }
};

const registerUser = async ({
  _age,
  _nationalId,
  _phonenumber,
  _firstName,
}) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    // const connectedAccount = getGlobalState("connectedAccount");
    const contract = await getContract();
    const register = await contract._registerUser(
      _age,
      _nationalId,
      _phonenumber,
      _firstName
    );
    console.log("Created Asset:", register);
    register.wait();
    return true;
  } catch (error) {
    reportError(error);
  }
};

const verifyUser = async ({ _age, _nationalId, _phonenumber, _firstName }) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    // const connectedAccount = getGlobalState("connectedAccount");
    const contract = await getContract();
    const register = await contract._verifyUser(
      _age,
      _nationalId,
      _phonenumber,
      _firstName
    );
    console.log("Created Asset:", register);
    register.wait();
    return true;
  } catch (error) {
    reportError(error);
  }
};

const addAsset = async ({ title, description, credential, price }) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const connectedAccount = getGlobalState("connectedAccount");
    const contract = await getContract();
    price = ethers.utils.parseEther(price);
    const transaction = await contract.createAsset(
      title,
      description,
      credential,
      price
    );
    console.log("Created Asset:", transaction);
    return true;
  } catch (error) {
    reportError(error);
  }
};

const buyNewAsset = async ({ id, price }) => {
  console.log("id ", id, price);

  try {
    if (!ethereum) return alert("Please install Metamask");
    const connectedAccount = getGlobalState("connectedAccount");
    price = ethers.utils.parseEther(price.toString());
    const contract = await getContract();
    console.log("Price ", price);
    const transaction = await contract.buyAsset(id, { value: price });

    console.log("Created Asset:", transaction);
    return true;
  } catch (error) {
    reportError(error);
  }
};

const confirmAsset = async (id) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getContract();
    const confirm = await contract.confirm(id);
    // console.log("confirmation ", confirm)
  } catch (error) {
    reportError(error.message);
  }
};
const ProbeAsset = async (id) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getContract();
    const Probe = await contract.Probe(id);
    // console.log("probe ", Probe)
  } catch (error) {
    reportError(error.message);
  }
};

const ReleaseAsset = async (id) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getContract();
    const Probe = await contract.releaseAsset(id);
    // console.log("probe ", Probe)
  } catch (error) {
    reportError(error.message);
  }
};

const listAssets = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const connectedAccount = getGlobalState("connectedAccount");
    const contract = await getContract();
    const assets = await contract.getAssets();
    setGlobalState("assets", restructuredAssets(assets));
    // console.log( restructuredAssets(assets))
  } catch (error) {
    reportError(error);
  }
};
const listAsset = async (id) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getContract();
    const asset = await contract.assetArray(id);
    // console.log("asset", restructuredAssets([asset])[0])
    // setGlobalState('asset', asset)
    setGlobalState("asset", restructuredAssets([asset])[0]);
    // console.log("asset", asset)
  } catch (error) {
    reportError(error.message);
  }
};
const listBuyers = async (id) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getContract();
    const buyers = await contract.buyerMap(id);
    setGlobalState("buyers", restructuredBuyers([buyers])[0]);
    // console.log("list of Buyers:", restructuredBuyers([buyers])[0])
    return true;
  } catch (error) {
    reportError(error);
  }
};

const listRefund = async (id) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getContract();
    const refund = await contract.getRefundedBuyers(id);
    // console.log("refund ", restructuredBuyers([refund])[0])
    // setGlobalState('asset', asset)
    setGlobalState("refund", restructuredBuyers([refund])[0]);
    // console.log("asset", asset)
  } catch (error) {
    reportError(error.message);
  }
};

const refunAsset = async ({ id, price }) => {
  // console.log("id " , id , price)

  try {
    if (!ethereum) return alert("Please install Metamask");
    const connectedAccount = getGlobalState("connectedAccount");
    price = ethers.utils.parseEther(price.toString());
    const contract = await getContract();
    // console.log("Price ", price)
    const transaction = await contract.refund(id);

    // console.log("Created Asset:", transaction)
    return true;
  } catch (error) {
    reportError(error.message);
  }
};

const getOwner = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getContract();
    const owner = await contract.owner();
    setGlobalState("owner", owner.toLowerCase());
    return true;
  } catch (error) {
    reportError(error.message);
  }
};

const getVerify = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getContract();
    const connectedAccount = getGlobalState("connectedAccount");
    const verified = await contract.verified(connectedAccount);
    console.log("verified: ", verified);
    // const NumberOFBuyer = await contract.AssetBought();
    // console.log("refund ", owner.toLowerCase())
    setGlobalState("verified", verified);
    // setGlobalState("NumberOfAsset", NumberOfAsset.toNumber());
    // setGlobalState("NumberOFBuyer", NumberOFBuyer.toNumber());
    return true;
  } catch (error) {
    reportError(error.message);
  }
};

const restructuredAssets = (assets) =>
  assets
    .map((asset) => ({
      id: asset.id.toNumber(),
      price: parseInt(asset.price._hex) / 10 ** 18,
      seller: asset.seller.toLowerCase(),
      title: asset.title,
      description: asset.description,
      //   timestamp: new Date(asset.timestamp.toNumber()).getTime(),
      timestamp: getDateTimeFromTimestamp(asset.timestamp.toNumber() * 1000),
      credential: asset.credential,
      status: asset.status,
      bought: asset.bought,
    }))
    .reverse();

const restructuredBuyers = (buyers) =>
  buyers
    .map((buy) => ({
      id: buy.id.toNumber(),
      amountpaid: parseInt(buy.amountpaid._hex) / 10 ** 18,
      owner: buy.owner.toLowerCase(),
      timestamp: getDateTimeFromTimestamp(buy.timestamp.toNumber() * 1000),
      credential: buy.credential,
      status: buy.status,
      paid: buy.paid,
      checked: buy.checked,
    }))
    .reverse();

// const toDate = (timestamp) => {
//   const date = new Date(timestamp)
//   const dd = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
//   const mm =
//     date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
//   const yyyy = date.getFullYear()
//   return `${yyyy}-${mm}-${dd}`
// }

function getDateTimeFromTimestamp(timestamp) {
  let date = new Date(timestamp);
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  let hours = ("0" + date.getHours()).slice(-2);
  let minutes = ("0" + date.getMinutes()).slice(-2);
  let seconds = ("0" + date.getSeconds()).slice(-2);

  return (
    year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
  );
}

const reportError = (error) => {
  console.log(error.message);
  throw new Error("Error", error);
};

export {
  connectWallet,
  isWalletConnected,
  getContract,
  addAsset,
  listAssets,
  listBuyers,
  listAsset,
  buyNewAsset,
  refunAsset,
  confirmAsset,
  listRefund,
  getOwner,
  ProbeAsset,
  ReleaseAsset,
  registerUser,
  verifyUser,
  getVerify,
};
