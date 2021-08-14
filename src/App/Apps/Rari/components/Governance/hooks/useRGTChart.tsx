import axios from "axios"
import { useQuery } from "react-query"

const useRGTChart = () => {
    const {data: RGTChartInfo}= useQuery('RGT Chart info', async () => {
        const ChartInfo = await axios.get('https://api.coingecko.com/api/v3/coins/rari-governance-token/market_chart?vs_currency=usd&days=30&interval=daily')
        return ChartInfo.data
    })

    let price

    if(RGTChartInfo) {
        price = {name: '', data: RGTChartInfo.prices.map((item: any[] ) => ({ x: item[0], y: item[1].toLocaleString()}))}
    }

    return price
}

export default useRGTChart