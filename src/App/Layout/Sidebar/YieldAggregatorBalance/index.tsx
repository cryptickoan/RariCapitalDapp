// Pool
import { Pool } from "../../../../context/PoolProvider"

// React
import { useEffect } from "react"

// Dependencies
import { useNavigate } from "react-router"

// Styled Components
import { Card, StyledP } from "../../../components"
import Spinner from "../../../components/Icons/Spinner"

// Hooks
import useInterestAccrued from "../../../../hooks/YieldAggregator/useInterestAccrued"
import useAccountBalance from "../../../../hooks/YieldAggregator/useAccountBalance"


const YieldAggregatorBalance = ({renderCount, pool, setTotal, total}: {renderCount: number, pool: Pool, setTotal: any, total: number}) => {
    const {isLoading, data: balance}= useAccountBalance(pool)
    
    if (typeof balance === "undefined" || isLoading) {
        <Spinner />
    }
   
    if (typeof balance !== 'undefined' && balance > 1) return (
        <UserInterest renderCount={renderCount} balance={balance} pool={pool} setTotal={setTotal} total={total}/>
    )

    return null
}

export default YieldAggregatorBalance


const UserInterest = ({renderCount, balance, pool, setTotal, total}: {renderCount: number, balance: number, pool: Pool, setTotal: any, total: number}) => {
    const {data: interest} = useInterestAccrued(pool, 'month')
    useEffect(() => {
        if (renderCount === 0) {
            setTotal(total + balance) 
        }
    },[])

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