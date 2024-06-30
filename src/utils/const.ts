import { contractABI } from "./abi";

import { createThirdwebClient, defineChain, getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";

const clientId = import.meta.env.VITE_TEMPLATE_CLIENT_ID;

export const client = createThirdwebClient({
  clientId: clientId,
});

export const chain = defineChain(baseSepolia);

export const factoryAddress = "0x1b3050d2D7Aae67C282Bf0a20cBF6195eadC00C8"

export const contractAddress = "0x94D297273Ca3AB70952DEE77A7093963A4a13880"

export const CONTRACT = getContract({
    client: client,
    chain: chain,
    address: contractAddress,
    abi: contractABI,
})


