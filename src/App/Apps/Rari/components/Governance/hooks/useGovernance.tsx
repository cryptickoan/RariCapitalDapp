// React Query
import { useQuery } from 'react-query'
import {request, gql} from 'graphql-request'

const useGovernance = () => {
    const endpoint = 'https://hub.snapshot.page/graphql'

    const {data: Snap} = useQuery('snapshow', async () => { 
        const data = await request(
            endpoint, 
            gql`
                query {
                    space(id: "rari") {
                        id
                        name
                        about
                        network
                        symbol
                        members
                    }
                }
            `
        ) 
        return data
    })

    return Snap
}

export default useGovernance