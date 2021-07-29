import { fetchFuseTVL } from "../utils/fetchTVL"
import Rari from "../sdk/rari-sdk"
import Fuse from "../sdk/fuse-sdk/src"
import { useRari } from "../context/RariProvider"
import { useQuery } from "react-query"

export const fetchFuseNumberTVL = async (rari: Rari, fuse: Fuse) => {
    const tvlETH = await fetchFuseTVL(fuse)

    const ethPrice = rari.web3.utils.fromWei(await rari.getEthUsdPriceBN()) as any

    return (parseInt(tvlETH.toString()) / 1e18) * ethPrice
}

export const useFuseTVL = () => {
    const { state } = useRari()

    return useQuery("fuseTVL", async () => {
        return fetchFuseNumberTVL(state.rari, state.fuse)
    })
}