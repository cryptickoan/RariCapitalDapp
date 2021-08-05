import Fuse from "../sdk/fuse-sdk/src";

export const turboGethURL = `https://eth-mainnet.alchemyapi.io/v2/2Mt-6brbJvTA4w9cpiDtnbTo6qOoySnN`;

// Types
declare global {
    interface Window {
        ethereum: any,
        web3: any
    }
}

export function chooseBestWeb3Provider() {
    if (typeof window === "undefined") {
        return turboGethURL
    }


    if(window.ethereum) {
        return window.ethereum
    } else if (window.web3) {
        return window.web3.currentProvider
    } else {
        return turboGethURL
    }
}

export const initFuseWithProviders = (provider = chooseBestWeb3Provider()) => {
    const fuse = new Fuse(provider)

    // @ts-ignore
    fuse.contracts.FusePoolLens.setProvider(turboGethURL)

    return fuse
}