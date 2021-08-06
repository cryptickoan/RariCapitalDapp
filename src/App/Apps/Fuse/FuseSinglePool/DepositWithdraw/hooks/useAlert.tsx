import BigNumber from "bignumber.js";

const useAlert = (amount: BigNumber | null, action: string) => {
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

    return depositOrWithdrawAlert
}

export default useAlert