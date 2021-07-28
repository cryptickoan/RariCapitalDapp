// Rari //
import { usePool, getInterestAccrued, getAccountBalance, getRSPT} from '../../../../../context/PoolProvider'
import { useRari } from '../../../../../context/RariProvider'

// Dependencies //
import { useQuery } from 'react-query'
import { Banner } from '../../../../components'

// Components
import InfoPair from '../../../../components'

const millisecondsPerDay = 86400000

const UserStats = ({timeRange}: {timeRange: string}) => {
    // Pool and Rari
    const { title } = usePool()
    const { state } = useRari()

    let address = "0x7bD772b5cEcfb11b562690321761973B1b405002"


    // Get interest earned
    const { data: interestEarned } = useQuery(
        state.address + " " + title + "interest", async () => {
            
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
    const { data: accountAllocation } = useQuery(title + "account allocation", async () => {
        const allocation = await getAccountBalance(title, state.rari, address)
        return allocation
    })

     const { data: rsptBalance} = useQuery(state.address + " " + "RSPT balance", async () => {
        const balance = await getRSPT(title, state.rari, address)
        return parseFloat(state.rari.web3.utils.fromWei(balance))
    })

    console.log(rsptBalance)

    //const { data: exRate } = useQuery("rate", async () => {
    //    const rate = await state.rari.pools.stable.rspt.getExchangeRate()
    //    return state.rari.web3.utils.fromWei(rate)
    //})

    console.log(interestEarned, accountAllocation)


    return (
        <>
        <Banner>
            <InfoPair 
                direction="column" 
                width="100%"
                justifyContent="center"
                numberSize="35px"
                number={`$${accountAllocation?.toLocaleString()}`}
                altSize="15px"
                alt="account balance"
                main="45px"
                secondary="10px"
                />
            <InfoPair 
                direction="column" 
                width="100%"
                justifyContent="center"
                numberSize="35px"
                number={`$${interestEarned?.toLocaleString()}`}
                altSize="15px"
                alt={`interest earned last ${timeRange}`}
                main="45px"
                secondary="10px"
                />
        </Banner>
        </>
    )
}

export default UserStats