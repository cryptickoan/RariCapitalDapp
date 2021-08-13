// React Query
import { useQuery } from 'react-query'
import {request, gql} from 'graphql-request'

const useGovernance = () => {
    const endpoint = 'https://hub.snapshot.org/graphql'

    const {data: Snap} = useQuery('snapshow', async () => {
        const data = await request(
            endpoint, 
            gql`
                query Proposals {
                    proposals (
                        skip: 0,
                        first: 8,
                        where: {
                        space_in: ["rari"],
                        },
                        orderBy: "created",
                        orderDirection: desc
                    ) {
                        id
                        title
                        body
                        start
                        end
                        state
                        author
                    }
                }
            `
        ) 
        return data
    }, {refetchOnMount: false})

    return Snap
}

export default useGovernance