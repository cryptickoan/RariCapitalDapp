// Rari
import { RariState } from "../../context/RariProvider/utils/RariState";
import { Pool, getBalanceHistory } from "../../context/PoolProvider";

// Dependencies
import { useQueries } from "react-query";
import Rari from "../../sdk/rari-sdk";

// Var
const blocksPerDay = 6500;

// Function used by query
export const getBalanceHistoryFunc = async (address: string, title: Pool, timerange: string, rari: Rari): Promise<{categories: string[], data: number[]}> => {
    const latestBlock = await rari.web3.eth.getBlockNumber()
    console.log(latestBlock)
    
    const blockStart =
        timerange === "month"
        ? latestBlock - blocksPerDay * 31
        : timerange === "year"
        ? latestBlock - blocksPerDay * 365
        : timerange === "week"
        ? latestBlock - blocksPerDay * 10
        : 0;

    const balance = await getBalanceHistory( title, rari, address, blockStart)

    const categories = (balance).map((point: any) => {
      return new Date(point.timestamp * 1000).toLocaleDateString("en-US")
      }
    )

    const data = (balance.map((point: any) => {
      return parseFloat(point.balance) / 1e18
    }))

    return { categories: categories, data: data}
  }

// Hook
const useBalanceHistory = (address: string, title: Pool, timerange: string[], state: RariState) => {
  const results: any = useQueries([
    { queryKey: address + " " + title + " " + timerange[0] + " balance history", queryFn: (): any => getBalanceHistoryFunc(address, title, timerange[0], state.rari), refetchOnMount: false },
    { queryKey: address + " " + title + " " + timerange[1] + " balance history", queryFn: (): any => getBalanceHistoryFunc(address, title, timerange[1], state.rari),  refetchOnMount: false},
    { queryKey: address + " " + title + " " + timerange[2] + " balance history", queryFn: (): any => getBalanceHistoryFunc(address, title, timerange[2], state.rari),  refetchOnMount: false}
  ])
  return results
}

export default useBalanceHistory