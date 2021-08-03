import {createContext, ReactNode, useContext} from 'react'
import Rari from '../sdk/rari-sdk'
import Web3 from "web3"
import Tokens from "../static/tokens.json"
import { AllTokens } from 'rari-tokens-generator'

export enum Pool {
    USDC = "USDC",
    ETH = "ETH",
    DAI = "DAI" 
}

type PoolInfo = {
    title: Pool
    description: string
}
const millisecondsPerDay = 86400000

// Pool SDK //
export const getPoolSDK = (pool: Pool, rari: Rari) => {
    switch(pool) {
        case Pool.USDC:
            return rari.pools.stable
        case Pool.DAI:
            return rari.pools.dai
        case Pool.ETH:
            return rari.pools.ethereum
    }
}

// Get current and past (week, year) APY //
export const getPoolAPY = async (pool: Pool, rari: Rari, type: string) => {

    const poolSDK = await getPoolSDK(pool, rari)

    switch (type) {
        case "current block":

            try { const bnCurrentAPY = await poolSDK.apy.getCurrentRawApy();
                    const poolAPY = parseFloat( 
                        rari.web3.utils.fromWei(bnCurrentAPY.mul(rari.web3.utils.toBN(100)))
                        ).toFixed(2);
                    return poolAPY
            } catch (e) {
                return Promise.reject(e)  
            }
            
        case "last week":

            const bnWeekAPY = await poolSDK.apy.getApyOverTime(Math.floor(
                (Date.now() - millisecondsPerDay * 7) / 1000)
                )
            const week = parseFloat(
                    rari.web3.utils.fromWei(bnWeekAPY.mul(rari.web3.utils.toBN(100)))
                  ).toFixed(1);    
            return week

        case "last year":

                const bnYearAPY = await poolSDK.apy.getApyOverTime(Math.floor(
                    (Date.now() - millisecondsPerDay * 365) / 1000)
                    )
                const year = parseFloat(
                        rari.web3.utils.fromWei(bnYearAPY.mul(rari.web3.utils.toBN(100)))
                      ).toFixed(1);    
                return year
                
        default:
            return ' '
    }
}

// Get Depositable Currencies // 
export const getDepositableCurrencies = async (pool: Pool, rari: Rari, ) => {
    
    const poolSDK = await getPoolSDK(pool, rari)

    const currencies = await poolSDK.getAllTokens()

    return currencies
}

// Validate deposit to Rari Pool //
export const validateDeposit = async (pool: Pool, rari: Rari, token: any, amount: any, address: any ) => {
    
    const poolSDK = await getPoolSDK(pool, rari)

    //@ts-ignore
    try {
        const amountBN = rari.web3.utils.toBN(amount!.decimalPlaces(0));
        const [amountToBeAdded,,_slippage] = await poolSDK.deposits.validateDeposit(token, amountBN, address, true)
        let quote = amountToBeAdded
        let slippage = _slippage
        return { quote: quote, slippage: slippage } 
    } catch (e) {
        return Promise.reject(e)
    }
}

// Deposit to rari pool //
export const depositToPool = async (pool: Pool, rari: Rari, token: any, amount: any, quote: any, address: any) => {
    const poolSDK = await getPoolSDK(pool, rari)

    try {
        const amountBN = rari.web3.utils.toBN(amount!.decimalPlaces(0));
        const [,,,depositReceipt] = await poolSDK.deposits.deposit(token, amountBN, quote, { from: address})

        if (!depositReceipt) {
            return Promise.reject('Prices and/or slippage have changed. Please reload the page and try again. If the problem persists, please contact us.')
        }
    } catch (e) {
        return Promise.reject(e)
    }
}

// Validate withdrawal from Rari Pool //
export const validateWithdrawal = async (pool: Pool, rari: Rari, token: any, amount: any, address: any) => {
    const poolSDK = await getPoolSDK(pool, rari)

    try {
        const amountBN = rari.web3.utils.toBN(amount!.decimalPlaces(0));
        const [amountToBeAdded,,_slippage] = await poolSDK.withdrawals.validateWithdrawal(token, amountBN, address, true)
        let quote = amountToBeAdded
        let slippage = _slippage
        return { quote: quote, slippage: slippage } 
    } catch (e) {
        return Promise.reject(e)
    }
}

// Withdraw from Rari Pool //
export const withdrawFromPool = async (pool: Pool, rari: Rari, token: any, amount: any, quote:any,  address: any) => {
    const poolSDK = await getPoolSDK(pool, rari)

    try {
        const amountBN = rari.web3.utils.toBN(amount!.decimalPlaces(0));
        await poolSDK.withdrawals.withdraw(token, amountBN, quote, { from: address})
    } catch (e) {
        return Promise.reject(e)
    }
}

// Get Token allocation //
const toBN = Web3.utils.toBN
export type BN = ReturnType<typeof toBN>
const tokens = Tokens as AllTokens

export const getTokenAllocation = async (pool: Pool, rari: Rari) => {
    const poolSDK = await getPoolSDK(pool, rari)
    const rawAllocation: ({[key: string]: BN}) = await poolSDK.allocations.getRawCurrencyAllocations()

    let dollarAmountAllocations: {[key: string]: number} = {}

    Object.keys(rawAllocation).forEach((symbol) => {
        dollarAmountAllocations[symbol] = parseFloat(rawAllocation[symbol].toString()) / 10 ** tokens[symbol].decimals
    })

    dollarAmountAllocations["total"] = Object.values(dollarAmountAllocations).reduce((a,b) => a + b)
    return dollarAmountAllocations
}

// Get Pool allocation //
export const getPoolAllocation = async (pool: Pool, rari: Rari) => {
    const poolSDK = await getPoolSDK(pool, rari)
    const poolAllocation = await poolSDK.allocations.getRawPoolAllocations()

    let allocations: {[key: string]: number} = {}

    for (const [token, amount] of Object.entries(poolAllocation)) {
        const parsedAmount = parseFloat(rari.web3.utils.fromWei(amount));

        if (parsedAmount < 5) {
          continue;
        }

        if (token === "_cash") {
          allocations["Not Deposited"] = parsedAmount;
        } else {
          allocations[token] = parsedAmount;
        }
    }

    allocations["total"] = Object.values(allocations).reduce((a,b) => a + b)
    return allocations
}

export const getInterestAccrued = async (pool: Pool, rari: Rari, address: any, startingBlock: any) => {
    const poolSDK = await getPoolSDK(pool, rari)

    const interest = await poolSDK.balances.interestAccruedBy(address, Math.floor(startingBlock / 1000))
    
    return interest
}

export const getAccountBalance = async (pool: Pool, rari: Rari, address: string): Promise<number>  => {
    const poolSDK = await getPoolSDK(pool, rari)

    const interest = await poolSDK.balances.balanceOf(address)
    const parsed = parseFloat(rari.web3.utils.fromWei(interest))

    return parsed
}

export const getBalanceHistory = async (pool: Pool, rari: Rari, address: string, blockStart: number): Promise<{number: number, timeStamp: number, balance: string}[]> => {
    const poolSDK = await getPoolSDK(pool, rari)

    const balance = await poolSDK.history.getBalanceHistoryOf(address, blockStart) 
    return balance
}

export const getPoolToken = async (pool: Pool, rari: Rari, address: string) => {

    switch (pool) {
        case Pool.USDC:
            return await rari.pools.stable.rspt.balanceOf(address)
        case Pool.DAI:
            return await rari.pools.dai.rdpt.balanceOf(address)
        case Pool.ETH:
            return await rari.pools.ethereum.rept.balanceOf(address)
        default:
            return await rari.pools.stable.rspt.balanceOf(address)
        }
            
}

// Pool strategy info
export const getInfo = (title: Pool) => {
    switch (title) {
        case Pool.DAI:
            return "Rebalances DAI between dYdX, Compound, Aave, mStable, Fuse6, Fuse7 and Fuse8"
        case Pool.ETH:
            return "Rebalances ETH between dYdX, Compound, KeeperDao, Aave, Alpha, Enxyme"
        case Pool.USDC:
            return "Rebalances USDC between dYdX, Compound, Aave, mStable, and Fuse"
        default:
            break;
    }
}


// Pool Information //
export const getPoolInfo = (pool: Pool): PoolInfo => {
    switch (pool) {
        case Pool.USDC: 
            return ({title: Pool.USDC, description: "Safe returns on USDC" });
        case Pool.DAI:
            return ({title: Pool.DAI, description: "Safe returns on Dai"});
        case Pool.ETH:
            return ({title: Pool.ETH, description: "Rreturns on ETH"});
        default:
            return ({title: Pool.USDC, description: "Default"})
    }
}






// Context Provision //
export const PoolContext = createContext<PoolInfo>({title: Pool.USDC, description: "Default" })

export const PoolContextProvider = ({pool, children}: {pool: Pool,  children: ReactNode}) => {
    const poolInfo = getPoolInfo(pool)
    return (
        <PoolContext.Provider value={poolInfo}>{children}</PoolContext.Provider>
    )
}  

export function usePool() {
    const context = useContext(PoolContext)

    return context
}