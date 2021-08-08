// Fuse
import Fuse from "../sdk/fuse-sdk/src";


// Types

import { BN } from "../context/PoolProvider";

export enum CTokenErrorCodes {
  NO_ERROR,
  UNAUTHORIZED,
  BAD_INPUT,
  COMPTROLLER_REJECTION,
  COMPTROLLER_CALCULATION_ERROR,
  INTEREST_RATE_MODEL_ERROR,
  INVALID_ACCOUNT_PAIR,
  INVALID_CLOSE_AMOUNT_REQUESTED,
  INVALID_COLLATERAL_FACTOR,
  MATH_ERROR,
  MARKET_NOT_FRESH,
  MARKET_NOT_LISTED,
  TOKEN_INSUFFICIENT_ALLOWANCE,
  TOKEN_INSUFFICIENT_BALANCE,
  TOKEN_INSUFFICIENT_CASH,
  TOKEN_TRANSFER_IN_FAILED,
  TOKEN_TRANSFER_OUT_FAILED,
  UTILIZATION_ABOVE_MAX,
}

export enum ComptrollerErrorCodes {
  NO_ERROR,
  UNAUTHORIZED,
  COMPTROLLER_MISMATCH,
  INSUFFICIENT_SHORTFALL,
  INSUFFICIENT_LIQUIDITY,
  INVALID_CLOSE_FACTOR,
  INVALID_COLLATERAL_FACTOR,
  INVALID_LIQUIDATION_INCENTIVE,
  MARKET_NOT_ENTERED, // no longer possible
  MARKET_NOT_LISTED,
  MARKET_ALREADY_LISTED,
  MATH_ERROR,
  NONZERO_BORROW_BALANCE,
  PRICE_ERROR,
  REJECTION,
  SNAPSHOT_ERROR,
  TOO_MANY_ASSETS,
  TOO_MUCH_REPAY,
  SUPPLIER_NOT_WHITELISTED,
  BORROW_BELOW_MIN,
  SUPPLY_ABOVE_MAX,
}

// Functions
export const fetchGasForCall = async (
    call: any,
    amountBN: BN,
    fuse: Fuse,
    address: string
  ) => {
    const estimatedGas = fuse.web3.utils.toBN(
      (
        (await call.estimateGas({
          from: address,
          // Cut amountBN in half in case it screws up the gas estimation by causing a fail in the event that it accounts for gasPrice > 0 which means there will not be enough ETH (after paying gas)
          value: amountBN.div(fuse.web3.utils.toBN(2)),
        })) *
        // 50% more gas for limit:
        1.5
      ).toFixed(0)
    );
  
    // Ex: 100 (in GWEI)
    const { standard } = await fetch("https://gasprice.poa.network").then((res) =>
      res.json()
    );
  
    const gasPrice = fuse.web3.utils.toBN(
      // @ts-ignore For some reason it's returning a string not a BN
      fuse.web3.utils.toWei(standard.toString(), "gwei")
    );
  
    const gasWEI = estimatedGas.mul(gasPrice);
  
    return { gasWEI, gasPrice, estimatedGas };
  };

export async function testForCTokenErrorAndSend(
    txObject: any,
    caller: string,
    failMessage: string
  ) {
    let response = await txObject.call({ from: caller });
  
    // For some reason `response` will be `["0"]` if no error but otherwise it will return a string of a number.
    if (response[0] !== "0") {
      response = parseInt(response);
  
      let err;
  
      if (response >= 1000) {
        const comptrollerResponse = response - 1000;
  
        let msg = ComptrollerErrorCodes[comptrollerResponse];
  
        if (msg === "BORROW_BELOW_MIN") {
          msg =
            "As part of our guarded launch, you cannot borrow less than 1 ETH worth of tokens at the moment.";
        }
  
        // This is a comptroller error:
        err = new Error(failMessage + " Comptroller Error: " + msg);
      } else {
        // This is a standard token error:
        err = new Error(
          failMessage + " CToken Code: " + CTokenErrorCodes[response]
        );
      }
      throw err;
    }
  
    return txObject.send({ from: caller });
  }