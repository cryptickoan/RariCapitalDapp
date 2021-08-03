import { useRari } from '../../context/RariProvider'
import { useQuery } from 'react-query'
import { Pool, getAccountBalance} from '../../context/PoolProvider'

export const useAccountBalance = (pool: Pool) => {
    const { state } = useRari()

    const balance = useQuery(state.address + " " + pool + " account balance", async () => {
        const balance = await getAccountBalance(pool, state.rari, state.address)
        return balance
    }, {refetchOnMount: false})

    return balance
}
