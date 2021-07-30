// Rari //
import { usePool, getInterestAccrued, getAccountBalance, getPoolToken } from '../../../../../context/PoolProvider'
import { useRari } from '../../../../../context/RariProvider'

// Dependencies //
import { useQuery } from 'react-query'
import { Banner } from '../../../../components'

// Components
import InfoPair from '../../../../components/InfoPair'

const millisecondsPerDay = 86400000

const UserStats = ({timeRange}: {timeRange: string}) => {
    // Pool and Rari
    const { title } = usePool()
    const { state } = useRari()

    let address = "0x29c89a6cb342756e63a6c78d21adda6290eb5cb1"
    //let address = "0x29683db5189644d8c4679b801af5c67e6769ecef"

    // Get interest earned
    const { data: interestEarned } = useQuery(
        address + " " + title + " interest", async () => {
            
            const startingBlock =
                timeRange === "month"
                ? Date.now() - millisecondsPerDay * 30
                : timeRange === "year"
                ? Date.now() - millisecondsPerDay * 365
                : timeRange === "week"
                ? Date.now() - millisecondsPerDay * 7       
                : 0;

            const interestRaw = await getInterestAccrued(title, state.rari, address, startingBlock )
            const parsed = parseFloat(state.rari.web3.utils.fromWei(interestRaw))
            return parsed
        }
    )

    
    // Get Account Allocation
    const { data: accountAllocation } = useQuery(title + " account allocation", async () => {
        const allocation = await getAccountBalance(title, state.rari, address)
        return allocation
    })

     const { data: rsptBalance} = useQuery(state.address + "" + title + " token balance", async () => {
        const balance = await getPoolToken(title, state.rari, address)
        return parseFloat(state.rari.web3.utils.fromWei(balance))
    })

    console.log(rsptBalance)

    const { data: exRate } = useQuery(title + " rate", async () => {
       const rate = await state.rari.pools.dai.rdpt.getExchangeRate()
       return state.rari.web3.utils.fromWei(rate)
    })

    console.log(interestEarned, accountAllocation, exRate)


    return (
        <>
        <Banner>
            <InfoPair 
                direction="column" 
                width="100%"
                justifyContent="center"
                glow={true}
                numberSize="25px"
                number={`$${accountAllocation?.toLocaleString()}`}
                altSize="15px"
                alt="account balance"
                main="30px"
                secondary="10px"
                />
            <InfoPair 
                direction="column" 
                width="100%"
                justifyContent="center"
                glow={true}
                numberSize="35px"
                number={`$${interestEarned?.toLocaleString()}`}
                altSize="15px"
                alt={`interest earned last ${timeRange}`}
                main="35px"
                secondary="10px"
                />
            <InfoPair 
                direction="column" 
                width="100%"
                justifyContent="center"
                glow={true}
                numberSize="25px"
                number={`${rsptBalance?.toLocaleString()}`}
                altSize="15px"
                alt={title === 'DAI' ? 'RDPT balance' : title === 'USDC' ? 'RSPT balance' : 'REPT balance'}
                main="30px"
                secondary="10px"
                />
        </Banner>
        </>
    )
}

export default UserStats