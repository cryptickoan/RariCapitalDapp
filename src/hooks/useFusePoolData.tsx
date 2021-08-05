// Rari
import { useRari } from "../context/RariProvider"
import Rari from '../sdk/rari-sdk'
import Fuse from '../sdk/fuse-sdk/src'

// Dependencies
import { useQuery } from "react-query"
import { filterOnlyObjectProperties } from "../utils/filterOnlyObjectProperties"
import { createComptroller  } from "../utils/createComptroller"
import { useDispatch } from 'react-redux'
import { resetGraph } from '../App/Apps/Fuse/FuseSinglePool/redux/reducer'

export interface FuseAsset {
    cToken: string;
  
    borrowBalance: number;
    supplyBalance: number;
    liquidity: number;
  
    membership: boolean;
  
    underlyingName: string;
    underlyingSymbol: string;
    underlyingToken: string;
    underlyingDecimals: number;
    underlyingPrice: number;
    underlyingBalance: number;
  
    collateralFactor: number;
    reserveFactor: number;
  
    adminFee: number;
    fuseFee: number;
  
    borrowRatePerBlock: number;
    supplyRatePerBlock: number;
  
    totalBorrow: number;
    totalSupply: number;
  }

export interface USDPricedFuseAsset extends FuseAsset {
    supplyBalanceUSD: number;
    borrowBalanceUSD: number;
  
    totalSupplyUSD: number;
    totalBorrowUSD: number;
  
    liquidityUSD: number;
  
    isPaused: boolean;
  }

export const fetchFusePoolData = async (poolId: string | undefined, address: string, fuse: Fuse, rari: Rari ) => {
    if (!poolId) return undefined

    const { comptroller, name, isPrivate } = await fuse
        .contracts
        .FusePoolDirectory
        .methods
        .pools(poolId)
        .call({ from: address })
    

    let assets: USDPricedFuseAsset[] = ( await fuse
        .contracts
        .FusePoolLens
        .methods
        .getPoolAssetsWithData(comptroller)
        .call({ from: address, gas: 1e18 })
    ).map(filterOnlyObjectProperties)
    

    let totalLiquidityUSD = 0

    let totalSupplyBalanceUSD = 0
    let totalBorrowBalanceUSD = 0 

    let totalSupplied = 0
    let totalBorrowed = 0 

    const ethPrice: number = fuse.web3.utils.fromWei(
        await rari.getEthUsdPriceBN()
    ) as any

    let promises = []

    const comptrollerContract = createComptroller(comptroller, fuse)
    for (let i = 0; i < assets.length; i++) {

        let asset = assets[i]

        promises.push(
            comptrollerContract.methods
              .borrowGuardianPaused(asset.cToken)
              .call()
              // TODO: THIS WILL BE BUILT INTO THE LENS
              .then((isPaused: boolean) => (asset.isPaused = isPaused))
          );
      

        asset.supplyBalanceUSD =
        ((asset.supplyBalance * asset.underlyingPrice) / 1e36) * ethPrice;
    
        asset.borrowBalanceUSD =
          ((asset.borrowBalance * asset.underlyingPrice) / 1e36) * ethPrice;
    
        totalSupplyBalanceUSD += asset.supplyBalanceUSD;
        totalBorrowBalanceUSD += asset.borrowBalanceUSD;
    
        asset.totalSupplyUSD =
          ((asset.totalSupply * asset.underlyingPrice) / 1e36) * ethPrice;
        asset.totalBorrowUSD =
          ((asset.totalBorrow * asset.underlyingPrice) / 1e36) * ethPrice;
    
        totalSupplied += asset.totalSupplyUSD;
        totalBorrowed += asset.totalBorrowUSD;
    
        asset.liquidityUSD =
          ((asset.liquidity * asset.underlyingPrice) / 1e36) * ethPrice;
    
        totalLiquidityUSD += asset.liquidityUSD;
    }

    await Promise.all(promises)

    return {
        assets: assets.sort((a, b) => (b.liquidityUSD > a.liquidityUSD ? 1 : -1)),
        comptroller,
        name,
        isPrivate,

        totalLiquidityUSD,

        totalSupplied,
        totalBorrowed,

        totalSupplyBalanceUSD,
        totalBorrowBalanceUSD
    }
}


export const useFusePoolData = (poolId: string) => {
    const { state } = useRari()

    // This would only be called if singlePoolInfo is rendered, so reset graph.
    const dispatch = useDispatch()
     dispatch(resetGraph())
    
    const data = useQuery(poolId + " poolData" + state.address, () => {
      return fetchFusePoolData(poolId, state.address, state.fuse, state.rari)
    })
    
    return data
}