// Rari
import Fuse from '../../../../../../sdk/fuse-sdk/src';

// Types
import { USDPricedFuseAsset } from '../../../../../../hooks/useFusePoolData';

// Depencies
import { useQuery } from 'react-query'
import BigNumber from "bignumber.js"
import { createComptroller } from '../../../../../../utils/createComptroller'
import { fetchTokenBalance } from '../../../../../../hooks/useTokenBalance'
import { useRari } from '../../../../../../context/RariProvider';

async function fetchMaxAmount(
    action: string,
    fuse: Fuse,
    address: string,
    asset: USDPricedFuseAsset,
    comptrollerAddress: string
  ) {
    if (action === "Supply") {
      const balance = await fetchTokenBalance(
        asset.underlyingToken,
        fuse.web3,
        address
      );
  
      return balance;
    }
  
    if (action === "Repay") {
      const balance = await fetchTokenBalance(
        asset.underlyingToken,
        fuse.web3,
        address
      );
      const debt = fuse.web3.utils.toBN(asset.borrowBalance);
  
      if (balance.gt(debt)) {
        return debt;
      } else {
        return balance;
      }
    }
  
    if (action === "Borrow") {
      const comptroller = createComptroller(comptrollerAddress, fuse);
  
      const { 0: err, 1: maxBorrow } = await comptroller.methods
        .getMaxBorrow(address, asset.cToken)
        .call();
  
      if (err !== 0) {
        return fuse.web3.utils.toBN(
          new BigNumber(maxBorrow).multipliedBy(0.75).toFixed(0)
        );
      } else {
        throw new Error("Could not fetch your max borrow amount! Code: " + err);
      }
    }
  
    if (action === "Withdraw") {
      const comptroller = createComptroller(comptrollerAddress, fuse);
  
      const { 0: err, 1: maxRedeem } = await comptroller.methods
        .getMaxRedeem(address, asset.cToken)
        .call();
  
      if (err !== 0) {
        return fuse.web3.utils.toBN(maxRedeem);
      } else {
        throw new Error("Could not fetch your max withdraw amount! Code: " + err);
      }
    }
  }

const useIsAmountValid = (amount: BigNumber | null, action: string, asset: USDPricedFuseAsset, comptrollerAddress: string ) => {
    const { state } = useRari()

    const { data: amountIsValid } = useQuery(
        (amount?.toString() ?? "null") + " " + action + " isValid",
        async () => {
          if (amount === null || amount.isZero()) {
            return false;
          }
    
          try {
            const max = await fetchMaxAmount(
              action,
              state.fuse,
              state.address,
              asset,
              comptrollerAddress
            );
    
            return amount.lte(max!.toString());
          } catch (e) {
            console.log(e.message)
            return false;
          }
        }
      );
    return amountIsValid
}

export default useIsAmountValid