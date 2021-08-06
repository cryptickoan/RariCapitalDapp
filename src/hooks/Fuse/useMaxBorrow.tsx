// React
import { useMemo } from 'react'

// Types
import { USDPricedFuseAsset } from '../useFusePoolData';

export const useBorrowLimit = (
    assets: USDPricedFuseAsset[],
    options?: { ignoreIsEnabledCheckFor: string }
  ) => {
    const maxBorrow = useMemo(() => {
      let maxBorrow = 0;
      for (let i = 0; i < assets.length; i++) {
        let asset = assets[i];
  
        if (
          options?.ignoreIsEnabledCheckFor === asset.cToken ||
          asset.membership
        ) {
          maxBorrow += asset.supplyBalanceUSD * (asset.collateralFactor / 1e18);
        }
      }
      return maxBorrow;
    }, [assets, options?.ignoreIsEnabledCheckFor]);
  
    return maxBorrow;
  };