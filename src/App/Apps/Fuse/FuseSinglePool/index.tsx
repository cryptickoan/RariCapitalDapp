// Fuse
import {  useFusePoolData } from '../../../../hooks/useFusePoolData'

// Dependencies
import { useParams } from "react-router"

// Styled Components
import { SpacingContainer} from '../../../components'

// Components
import FusePoolInfo from './FusePoolInfo'
import TokenArea from './TokenArea'
import GraphArea from './GraphArea'

// Icons 
import Spinner from "../../../components/Icons/Spinner"
import { useFusePools } from '../../../../hooks/useFusePool'

const FuseSinglePool = () => {
    // Get pool info based on ID
    const { id } = useParams()
    
    const fusePools = useFusePools(null)

    const { data: poolInfo }  = useFusePoolData(id)
    console.log(poolInfo)

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
                    

                            <GraphArea/>

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
