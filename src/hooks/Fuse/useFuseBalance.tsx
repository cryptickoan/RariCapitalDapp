import { useQuery } from "react-query"
import { useRari } from "../../context/RariProvider"

const useFuseBalance = () => {
    const { state } = useRari()
    const address= "0x6997060D6bA220d8A0B102e0003Fe12796b874bd"

    const balance = useQuery(state.address + " fuse balance", async () => {
        const response = await fetch("https://beta.rari.capital/api/accounts/fuse/balances?address=" + address)
        if(!response.ok) {
            throw new Error('Network request not ok')
        }
        return response
    }, {refetchOnMount: false})

    console.log(balance)

    return balance
}

export default useFuseBalance