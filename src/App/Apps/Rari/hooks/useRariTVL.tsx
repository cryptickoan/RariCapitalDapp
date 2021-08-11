// Rari
import { useRari } from "../../../../context/RariProvider"
import { Pool, getPoolAllocation } from "../../../../context/PoolProvider"

// Hooks
import { useFuseTVL } from "../../../../hooks/useFuseTVL"

// React Query
import { useQueries } from "react-query"



export const useRariTVL = () => {
    const { state } = useRari()

    // Get TVL for YieldAggregator
    const queries = Object.values(Pool).map(pool => {
        return {
            queryKey: pool + " pool strategy allocation",
            queryFn: (): any => getPoolAllocation(pool, state.rari) 
        }
    })

    queries.push({
      queryKey: 'rgt',
      queryFn: async () => await state.rari.governance.rgt.sushiSwapDistributions.totalStakedUsd()
    })

    queries.push({
      queryKey:'Yield',
      queryFn: async () => await state.rari.pools.yield.balances.getTotalSupply()
    })

    const [
            {data: USDCTotal  }, 
            {data: ETHTotal }, 
            {data: DAITotal },
            {data: RGTTotal },
            {data: YieldTotal }
          ] = useQueries(queries)
    
    //GetTVL for Fuse
    const { data: fuseTVL } = useFuseTVL();
    
    
    let TVL = undefined
    let YieldTVL = undefined
    let formatedRGT = undefined

    if (USDCTotal && ETHTotal && DAITotal && YieldTotal && RGTTotal) {
      
      //@ts-ignore
      formatedRGT = parseFloat(state.rari.web3.utils.fromWei(RGTTotal))

      //@ts-ignore
      const formatedYield = parseFloat(state.rari.web3.utils.fromWei(YieldTotal))

      //@ts-ignore
      YieldTVL = USDCTotal.total + ETHTotal.total + DAITotal.total + formatedYield

      //@ts-ignore
      TVL = YieldTVL + fuseTVL + formatedRGT
    }
    

    return { TVL: TVL, YieldTVL: YieldTVL, fuseTVL: fuseTVL, formatedRGT: formatedRGT }
}

