import { useQuery } from "react-query";

export interface TokenData {
    name: string | null;
    symbol: string | null;
    address: string | null;
    decimals: number | null;
    color: string | null;
    overlayTextColor: string | null;
    logoURL: string | undefined;
  }

export const ETH_TOKEN_DATA = {
    symbol: "ETH",
    address: "0x0000000000000000000000000000000000000000",
    name: "Ethereum Network Token",
    decimals: 18,
    color: "#627EEA",
    overlayTextColor: "#fff",
    logoURL:
      "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/64/Ethereum-ETH-icon.png",
  };

export const fetchTokenData = async (address: string) => {
    let data;
  
    if (address !== ETH_TOKEN_DATA.address) {
      try {
        data = {
          ...(await fetch(
            "https://app.rari.capital/api/tokenData?address=" + address
          ).then((res) => res.json())),
          address: address,
        };
      } catch (e) {
        data = {
          name: null,
          address: null,
          symbol: null,
          decimals: null,
          color: null,
          overlayTextColor: null,
          logoURL: undefined,
        };
      }
    } else {
      data = ETH_TOKEN_DATA;
    }
  
    return data as TokenData;
  };
  

export const useTokenData = (address: string) => {
    const { data: tokenData } = useQuery(
      address + " tokenData",
      async () => await fetchTokenData(address)
    , {refetchOnMount: false});
    return tokenData;
  };
  