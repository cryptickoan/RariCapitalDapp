
// Rari
import { Pool } from "../../../../../../context/PoolProvider"

// ReactQuery
import { useQuery } from 'react-query'
import axios from 'axios'

const useSupply = (pool: Pool) => {
    const {data: supply } = useQuery(pool + 'supply history', async () => {
        return (await axios.get(`https://rariapi.herokuapp.com/history/supply/${pool}`)).data
    })
    
    let parsedInfo
    if(supply) {
        parsedInfo = {name: '', data: supply.map((item: any) =>  ({x: item['date'], y: item['totalSupply']}))}
    }

    return parsedInfo
}

export default useSupply