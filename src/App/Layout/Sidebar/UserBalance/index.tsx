import { Pool } from "../../../../context/PoolProvider"
import { useAccountBalance } from "../../../../hooks/ProfileSidebar/useProfile"
import Spinner from "../../../components/Icons/Spinner"
import InfoBar from "../../../components/InfoBar"
import { useNavigate } from "react-router"

const UserBalance = ({pool}: {pool: Pool}) => {
    const {isLoading, data: balance}= useAccountBalance(pool)
    const navigate = useNavigate()

    const toPoolInfo = () => {
        navigate(`../pools/${pool}`)
    } 
    
    if (balance === undefined || isLoading) {
        <Spinner />
    }

    if (typeof balance !== 'undefined' && balance < 1) return null

    const data = [pool.toString(), `$${balance?.toLocaleString()}`]
    return (
        <InfoBar data={data} width="100%" height="5%" onClick={toPoolInfo} diffOnHover/>
    )
}

export default UserBalance