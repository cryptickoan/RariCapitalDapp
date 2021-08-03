import { useQuery } from "react-query"
import { Pool, getInterestAccrued } from "../../context/PoolProvider"
import { useRari } from "../../context/RariProvider"

const millisecondsPerDay = 86400000

const useInterestAccrued = (pool: Pool, timeRange: string) => {
    const { state } = useRari()

    const startingBlock =
    timeRange === "month"
    ? Date.now() - millisecondsPerDay * 30
    : timeRange === "year"
    ? Date.now() - millisecondsPerDay * 365
    : timeRange === "week"
    ? Date.now() - millisecondsPerDay * 7       
    : 0;

    const interest = useQuery(state.address + " " + pool + " interest from last " + timeRange, async () => {
        const interestRaw = await getInterestAccrued(pool, state.rari, state.address, startingBlock )
        const parsed = parseFloat(state.rari.web3.utils.fromWei(interestRaw))
        return parsed
    }) 

    return interest
}

export default useInterestAccrued