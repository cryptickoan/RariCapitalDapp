import { Pool } from "../../../../context/PoolProvider"
import { useAccountBalance } from "../../../../hooks/YieldAggregator/useAccountBalance"
import Spinner from "../../../components/Icons/Spinner"
import { useNavigate } from "react-router"
import useInterestAccrued from "../../../../hooks/YieldAggregator/useInterestAccrued"

import { Card, StyledP } from "../../../components"

const UserBalance = ({pool}: {pool: Pool}) => {
    const {isLoading, data: balance}= useAccountBalance(pool)
    
    if (typeof balance === "undefined" || isLoading) {
        <Spinner />
    }
   
    if (typeof balance !== 'undefined' && balance > 1) return (
        <UserInterest balance={balance} pool={pool} />
    )

    return null
}

export default UserBalance


const UserInterest = ({balance, pool}: {balance: number | undefined, pool: Pool}) => {
    const {data: interest} = useInterestAccrued(pool, 'month')

    const navigate = useNavigate()

    const toPoolInfo = () => {
        navigate(`../pools/${pool}`)
    } 


    return (
        <Card onClick={toPoolInfo} flexBasis="10%" cursor="pointer" diffOnHover borderRadius="15px" justifyContent="space-evenly">
                <StyledP>{pool.toString()}</StyledP>
                <StyledP>${balance?.toLocaleString()}</StyledP>
                <StyledP>${interest?.toLocaleString()}</StyledP>
        </Card>
    )
}