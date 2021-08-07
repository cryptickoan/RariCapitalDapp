import BigNumber from "bignumber.js";

const useAlert = (amount: BigNumber | null, action: string, isAmountValid: boolean | undefined, symbol: string) => {
    let depositOrWithdrawAlert = null;

    
    if (amount === null || amount.isZero()) {
        switch (action) {
            case "Supply":
                depositOrWithdrawAlert = "Enter a valid amount to supply."
                break
            case "Borrow":
                depositOrWithdrawAlert = "Enter a valid amount to borrow."
                break
            case "Withdraw":
                depositOrWithdrawAlert = "Enter a valid amount to withdraw."
                break
            default:
                depositOrWithdrawAlert = "Enter a valid amount to repay."
                break
        }
    } 
    
    else if (isAmountValid === undefined) {
        depositOrWithdrawAlert = `Loading your balance of ${symbol}`
    } 
    
    else if (!isAmountValid) {
        switch (action) {
            case "Supply":
                depositOrWithdrawAlert = `You don't have enough ${symbol}`
                break;
            case "Borrow":
                depositOrWithdrawAlert = `You cannot borrow this much!`
                break
            case "Repay":
                depositOrWithdrawAlert = `You don't have enough ${symbol}, or you're over-paying`
                break
            case "Withdraw":
                depositOrWithdrawAlert = `You cannot withdraw this much`
                break
            default:
                break;
        }
    }
    
    else {
        depositOrWithdrawAlert = null
    }

    return depositOrWithdrawAlert
}

export default useAlert