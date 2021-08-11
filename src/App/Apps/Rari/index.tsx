// Styled Components
import { SpacingContainer } from '../../Shared'

// Hooks
import { useRariTVL } from './hooks/useRariTVL'

// Icons
import Spinner from '../../Shared/Icons/Spinner'

// Components
import YieldAggregatorOverview from './components/YieldAggregatorOverview'
import TVL from './components/TVL'
import Governance from './components/Governance'
import FuseOverview from './components/FuseOverview'

const Rari = () => {
    const {TVL: TVLNumber, YieldTVL, fuseTVL, formatedRGT: RGT } = useRariTVL()
    
    if (!TVLNumber) return <Spinner />

    return (
        <SpacingContainer width="90%" height="90%">
                <YieldAggregatorOverview YieldTVL={YieldTVL}/>

                <SpacingContainer direction="column">
                    <TVL TVLNumber={TVLNumber}/>
                    <Governance RGT={RGT}/>
                </SpacingContainer>
                
                <FuseOverview fuseTVL={fuseTVL}/>
        </SpacingContainer>
    )
}

export default Rari
