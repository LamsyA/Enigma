import { ConnectButton } from "thirdweb/react";
import { chain, client, factoryAddress } from "../utils/const";
import { createWallet, inAppWallet } from "thirdweb/wallets";


const ConnectWallet = () => {
    const wallets = [inAppWallet(), createWallet("io.metamask")]

    return (
        <ConnectButton
            client={client}
            connectModal={
                { size: "compact" }
            }
            accountAbstraction={{
                chain: chain,
                sponsorGas: true,
                factoryAddress: factoryAddress,
            }}
            wallets={wallets} />
    )
};

export default ConnectWallet