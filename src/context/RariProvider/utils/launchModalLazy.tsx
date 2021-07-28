async function launchModalLazy(cacheProvider: boolean = true) {
    const [
      WalletConnectProvider,
      Web3Modal,
    ] = await Promise.all([
      import("@walletconnect/web3-provider"),
      import("web3modal"),
    ]);
  
    const providerOptions = {
      injected: {
        display: {
          description: "Connect with a browser extension",
        },
        package: null,
      },
      walletconnect: {
        package: WalletConnectProvider, 
        options: {
          infuraId: "INFURA_ID" // required
        }
      }
    };
  
    if (!cacheProvider) {
      localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
    }
  
    const web3Modal = new Web3Modal.default({
      cacheProvider,
      providerOptions,
    });
  
    return web3Modal.connect();
  }
export default launchModalLazy