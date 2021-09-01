import { Pool } from "../../../../../../context/PoolProvider"

// ReactQuery
import { useQuery } from 'react-query'
import axios from 'axios'

const useAPY = (pool:  Pool) => {
    const {data: supply } = useQuery(pool + 'apy history', async () => {
        return (await axios.get(`https://rariapi.herokuapp.com/history/apy/${pool}`)).data
    })

    let parsedInfo
    if(supply) {
        parsedInfo = {name: '', data: supply.map((item: any) =>  ({x: item['date'], y: item['poolAPY']}))}
    }


    return parsedInfo
}

export default useAPY