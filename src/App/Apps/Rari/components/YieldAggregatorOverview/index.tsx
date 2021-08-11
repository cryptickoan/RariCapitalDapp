// Styled Components
import { SpacingContainer, Card, StyledP } from '../../../../Shared'
import { TVL as SecondaryTVL } from '../../styles'

// Icons
import Spinner from '../../../../Shared/Icons/Spinner'

const YieldAggregatorOverview = ({YieldTVL}: {YieldTVL: any}) => {
    return (
        <SpacingContainer>
            <Card width="80%" borderRadius="15px" alignItems="flex-start" padding="5% 0 0 0">
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
            </Card>

        </SpacingContainer>
    )
}

export default YieldAggregatorOverview