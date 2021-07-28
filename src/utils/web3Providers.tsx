export const turboGethURL = `https://turbogeth.crows.sh`;

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
