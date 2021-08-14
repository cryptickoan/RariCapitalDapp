import axios from "axios"
import { useQuery } from "react-query"
import { useRari } from "../../../../../../context/RariProvider"

const useRGTInfo = () => {
    const { state } = useRari()

    const {data: RGTPrice} = useQuery('RGT Price', async (): Promise<any> => {
        const rawRGTPrice = await state.rari.governance.rgt.getExchangeRate()
        return state.rari.web3.utils.fromWei(rawRGTPrice) 
    },{refetchOnMount: false})

    const {data: RGTSupply} = useQuery('RGT Supply', async () =>{
        // @ts-ignore
        const rawRGTSupply = await state.rari.governance.contracts.RariGovernanceToken.methods.totalSupply().call()
        return (parseFloat(rawRGTSupply)/1e18)
    })  
    
    const {data: RGTInfo} = useQuery('RGT Info', async () => {
        const RGT = await axios.get('https://api.coingecko.com/api/v3/coins/rari-governance-token?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false')
        return RGT.data.market_data
    })
    let RGTVol 
    let RGTHigh
    let RGTLow

    if(RGTInfo) {
        RGTVol = RGTInfo.total_volume.usd
        RGTHigh = RGTInfo.high_24h.usd
        RGTLow = RGTInfo.low_24h.usd
    }
    
    return { RGTPrice, RGTSupply, RGTVol, RGTHigh, RGTLow}
}

export default useRGTInfo