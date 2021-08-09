// Rari //
import { usePool, getInterestAccrued, getAccountBalance, getPoolToken } from '../../../../../context/PoolProvider'
import { useRari } from '../../../../../context/RariProvider'

// React Query
import { useQuery } from 'react-query'

// Components
import { InfoPair, Banner } from '../../../../Shared'

const millisecondsPerDay = 86400000

const UserStats = ({timeRange}: {timeRange: string}) => {
    // Pool and Rari
    const { title } = usePool()
    const { state } = useRari()

    // Get interest earned
    const { data: interestEarned } = useQuery(
        state.address + " " + title + " interest " + timeRange, async () => {
            
            const startingBlock =
                timeRange === "month"
                ? Date.now() - millisecondsPerDay * 30
                : timeRange === "year"
                ? Date.now() - millisecondsPerDay * 365
                : timeRange === "week"
                ? Date.now() - millisecondsPerDay * 7       
                : 0;

            const interestRaw = await getInterestAccrued(title, state.rari, state.address, startingBlock )
            const parsed = parseFloat(state.rari.web3.utils.fromWei(interestRaw))
            return parsed
        }
    )

    
    // Get Account Allocation
    const { data: accountAllocation } = useQuery(state.address + " " + title + " account balance", async () => {
        const allocation = await getAccountBalance(title, state.rari, state.address)
        return allocation
    })

     const { data: rsptBalance} = useQuery(state.address + " " + title + " token balance", async () => {
        const balance = await getPoolToken(title, state.rari, state.address)
        return parseFloat(state.rari.web3.utils.fromWei(balance))
    })

    console.log(rsptBalance)

    const { data: exRate } = useQuery(title + " pool token exchange rate", async () => {
       const rate = await state.rari.pools.dai.rdpt.getExchangeRate()
       return state.rari.web3.utils.fromWei(rate)
    })

    return (
        <>
        <Banner>
            <InfoPair 
                direction="column" 
                width="100%"
                justifyContent="center"
                glow={true}
                numberSize="1.7vw"
                number={`$${accountAllocation?.toLocaleString()}`}
                altSize="0.8vw"
                alt="account balance"
                main="1.7vw"
                secondary="1vw"
                />
            <InfoPair 
                direction="column" 
                width="100%"
                justifyContent="center"
                glow={true}
                numberSize="2.3vw"
                number={`$${interestEarned?.toLocaleString()}`}
                altSize="1vw"
                alt={`interest earned last ${timeRange}`}
                main="2vw"
                secondary="1.2vw"
                />
            <InfoPair 
                direction="column" 
                width="100%"
                justifyContent="center"
                glow={true}
                numberSize="1.7vw"
                number={`${rsptBalance?.toLocaleString()}`}
                altSize="0.8vw"
                alt={title === 'DAI' ? 'RDPT balance' : title === 'USDC' ? 'RSPT balance' : 'REPT balance'}
                main="1.7vw"
                secondary="1vw"
                />
        </Banner>
        </>
    )
}

export default UserStats