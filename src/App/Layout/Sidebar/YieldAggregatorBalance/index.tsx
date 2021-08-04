import {  useEffect } from "react"
import { Pool } from "../../../../context/PoolProvider"
import { useAccountBalance } from "../../../../hooks/YieldAggregator/useAccountBalance"
import Spinner from "../../../components/Icons/Spinner"
import { useNavigate } from "react-router"
import useInterestAccrued from "../../../../hooks/YieldAggregator/useInterestAccrued"

import { Card, StyledP } from "../../../components"

const YieldAggregatorBalance = ({pool, setTotal, total}: {pool: Pool, setTotal: any, total: number}) => {
    const {isLoading, data: balance}= useAccountBalance(pool)
    
    if (typeof balance === "undefined" || isLoading) {
        <Spinner />
    }
   
    if (typeof balance !== 'undefined' && balance > 1) return (
        <UserInterest balance={balance} pool={pool} setTotal={setTotal} total={total}/>
    )

    return null
}

export default YieldAggregatorBalance


const UserInterest = ({balance, pool, setTotal, total}: {balance: number, pool: Pool, setTotal: any, total: number}) => {
    const {data: interest} = useInterestAccrued(pool, 'month')
    useEffect(() => {
        setTotal(total + balance) 
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