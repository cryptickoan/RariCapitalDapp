// Rari
import { useRari } from "../context/RariProvider";

// Dependencies
import { useQuery } from "react-query";
import ERC20ABI from "../sdk/rari-sdk/abi/ERC20.json";
import { ETH_TOKEN_DATA } from "./useTokenData";
import Web3 from "web3";


export const fetchTokenBalance = async (
  tokenAddress: string,
  web3: Web3,
  address: string
) => {
  let stringBalance;

  if (
    tokenAddress === ETH_TOKEN_DATA.address ||
    tokenAddress === "NO_ADDRESS_HERE_USE_WETH_FOR_ADDRESS"
  ) {
    stringBalance = await web3.eth.getBalance(address);
  } else {
    const contract = new web3.eth.Contract(ERC20ABI as any, tokenAddress);

    stringBalance = await contract.methods.balanceOf(address).call();
  }

  return web3.utils.toBN(stringBalance);
};

export function useTokenBalance(tokenAddress: string) {
  const { state } = useRari();

  return useQuery(tokenAddress + " balanceOf " + state.address, () =>
    fetchTokenBalance(tokenAddress, state.rari.web3, state.address)
  );
}
