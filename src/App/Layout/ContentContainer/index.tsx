// Dependencies
import { Routes, Route } from 'react-router-dom'
import styled from 'styled-components'

// Apps
import YieldAggregator from '../../Apps/YieldAggregator'
import Fuse from '../../Apps/Fuse'

// Styled Components
import { SpacingContainer, StyledP, Card } from '../../Shared'
import { TVL } from '../../Apps/Fuse/FusePoolsDisplay/styles'

// Hooks
import { useRariTVL } from '../../../hooks/useRariTVL'

// Icons
import Spinner from '../../Shared/Icons/Spinner'


export const StyledContentContainer = styled.main`   
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    overflow: hidden;
`

const ContentContainer = () => {
    return (
        <StyledContentContainer>
            <Routes>
                <Route path="" element={<Rari/>}/>
                <Route path="/pools/*" element={<YieldAggregator/>}/>
                <Route path="/fuse/*" element={<Fuse/>}/>
            </Routes>
        </StyledContentContainer>
    )
}

export default ContentContainer

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