// Fuse
import {  useFusePoolData } from '../../../../hooks/useFusePoolData'

// Dependencies
import { useParams } from "react-router"
import { useSelector } from 'react-redux'

// Styled Components
import { SpacingContainer} from '../../../components'

// Components
import FusePoolInfo from './FusePoolInfo'
import TokenArea from './TokenArea'
import GraphArea from './GraphArea'
import DepositWithdraw from './DepositWithdraw'

// Icons 
import Spinner from "../../../components/Icons/Spinner"
import { useFusePools } from '../../../../hooks/useFusePool'

const FuseSinglePool = () => {
    // Get pool info based on ID
    const { id } = useParams()
    
    const fusePools = useFusePools(null)
    
    const { data: poolInfo }  = useFusePoolData(id)
    return (
        <>
        { poolInfo && fusePools 
        ?   ( 
        <>
                { fusePools.pools ? <FusePoolInfo creator={fusePools.pools[parseInt(id)].pool.creator} poolInfo={poolInfo}/> : <Spinner/>}

                <SpacingContainer height="90%" width="110%">
                    
                            
                            <TokenArea action="lend" 
                                assets={poolInfo?.assets} 
                                comptrollerAddress={poolInfo?.comptroller}
                                />
                    
                            <Middle />
                            

                            <TokenArea action="borrow" 
                                assets={poolInfo?.assets} 
                                comptrollerAddress={poolInfo?.comptroller}
                                />
                                
                </SpacingContainer>
        </>
            )
            : <Spinner/>
        }
        
        
        </>
    )
}

export default FuseSinglePool


const Middle = () => {
    const state = useSelector(state => state)

    // If display is in state then user is depositing, withdrawing or staking
    // If it isnt then user is looking at the simulation graph
    let display = Object.keys(state).includes("display")
    
    return (
        <>
        {display ? <DepositWithdraw/> : <GraphArea/>}
        </>
    )
}