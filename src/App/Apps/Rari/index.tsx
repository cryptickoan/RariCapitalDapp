// Styled Components
import { SpacingContainer, StyledP, Card } from '../../Shared'
import { TVL } from '../../Apps/Fuse/FusePoolsDisplay/styles'

// Hooks
import { useRariTVL } from './hooks/useRariTVL'

// Icons
import Spinner from '../../Shared/Icons/Spinner'

const Rari = () => {
    const TVLNumber = useRariTVL()
    
    return (
        <SpacingContainer width="80%" height="90%">
                <SpacingContainer>
                    <Card width="80%" borderRadius="15px" alignItems="flex-start" padding="5% 0 0 0">
                        <TVL width="80%" height="15%">   

                        </TVL>
                    </Card>

                </SpacingContainer>
                <SpacingContainer direction="column">
                    <SpacingContainer height="30%" alignItems="flex-start">
                        <Card width="100%" height="80%" borderRadius="15px">
                            <TVL width="100%" height="100%">  
                            {TVLNumber ?
                                    <>
                                    <StyledP size="1vw" separate="1vw" glow>Total value locked</StyledP>
                                    <StyledP size="2vw" separate="2vw" glow>${TVLNumber.toLocaleString()}</StyledP>
                                    </> 
                                : 
                                    <Spinner/> }
                            </TVL>
                        </Card>
                    </SpacingContainer>
                    <Card borderRadius="15px" alignItems="flex-start" padding="5% 0 0 0">
                        <TVL width="80%" height="15%">   

                        </TVL>
                    </Card>
                </SpacingContainer>
                <SpacingContainer>
                    <Card width="80%" borderRadius="15px" alignItems="flex-start" padding="5% 0 0 0">
                        <TVL width="80%" height="15%">   

                        </TVL>
                    </Card>
                </SpacingContainer>
        </SpacingContainer>
    )
}

export default Rari