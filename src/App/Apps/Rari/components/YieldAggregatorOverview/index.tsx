// Rari
import { Pool } from '../../../../../context/PoolProvider'

// Styled Components
import { SpacingContainer, Card, StyledP } from '../../../../Shared'
import { TVL as SecondaryTVL } from '../../styles'

// Icons
import Spinner from '../../../../Shared/Icons/Spinner'

// Components
import PoolOverview from './PoolOverview'

const YieldAggregatorOverview = ({YieldTVL}: {YieldTVL: any}) => {
    return (
        <SpacingContainer>
            <Card width="80%" borderRadius="15px" padding="5% 0 0 0" direction="column">
                <SecondaryTVL width="80%" height="15%">   
                    {YieldTVL ?
                        <>
                        <StyledP size="1vw" separate="1vw" glow>Total value locked in Pools</StyledP>
                        <StyledP size="1.5vw" separate="1.5vw" glow>${YieldTVL.toLocaleString()}</StyledP>
                        </>
                        :
                        <Spinner/>
                    }
                </SecondaryTVL>
                <PoolOverview pool={Pool.USDC}/>
                <PoolOverview pool={Pool.DAI}/>
            </Card>
        </SpacingContainer>
    )
}

export default YieldAggregatorOverview