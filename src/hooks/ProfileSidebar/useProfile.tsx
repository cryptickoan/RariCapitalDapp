import { useRari } from '../../context/RariProvider'
import { useQueries } from 'react-query'
import { Pool, getAccountBalance} from '../../context/PoolProvider'

export const useProfile = () => {
    const { state } = useRari()

    const queries: {}[] = Object.values(Pool).map((pool) => 
        (
            { 
            queryKey: state.address + " " + pool + " account balance", 
            queryFn: async () => {
                const allocation = await getAccountBalance(pool, state.rari, state.address)
                return allocation
                }, 
            refetchOnMount: false 
            }
        )
    )

    console.log(queries)
    const hey = useQueries(queries)
    console.log(hey, 'its here')
}
