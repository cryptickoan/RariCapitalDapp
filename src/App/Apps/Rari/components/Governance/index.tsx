// React Bootstrap
import Carousel from 'react-bootstrap/Carousel'

// Styled Components
import { Card, SpacingContainer, StyledP, StyledSpan } from '../../../../Shared'
import { StyledCarousel } from '../../../YieldAggregator/PoolInformation/InfoCarousel/styles'
import { TVL as SecondaryTVL } from '../../styles'

// Components
import Proposals from './Proposals'
import RGTInfo from './RGTInfo'
import RGTChart from './RGTChart'

// Icons
import Spinner from '../../../../Shared/Icons/Spinner'




const Governance = ({RGT}: {RGT: any}) => {
    return (
        <Card borderRadius="15px" justifyContent="flex-start" padding="5% 0 0 0" direction="column">
            <TVL RGT={RGT} />
            <InfoCarousel/>
        </Card>
    )
}

export default Governance


const TVL = ({RGT}: {RGT:any}) => {
    return (
        <SecondaryTVL width="80%" height="20%">
            {RGT ?
                    <>
                    <SpacingContainer height="20%" width="65%" justifyContent="space-evenly">
                        <StyledP size="1vw" separate="1vw" opacity="0.8" glow>Staked RGT on </StyledP>
                        <StyledSpan>
                            <StyledSpan color="#3390f4" fontSize="1vw">Sushi</StyledSpan>
                            <StyledSpan color="#d515ca" fontSize="1vw">Swap</StyledSpan>
                        </StyledSpan>
                    </SpacingContainer>
                    <StyledP size="1.7vw" separate="1.7vw" glow>${RGT.toLocaleString()}</StyledP>
                    </>
                    :
                    <Spinner/>
                }
        </SecondaryTVL>
    )
}

const InfoCarousel = () => {
    return (
        <SpacingContainer height="75%">
            <StyledCarousel
                indicators={false}
                interval={10000}
            >
                <Carousel.Item>
                    <RGTInfo/>
                </Carousel.Item>

                <Carousel.Item>
                    <Proposals />
                </Carousel.Item>

                <Carousel.Item>
                    <RGTChart />
                </Carousel.Item>
            </StyledCarousel>
        </SpacingContainer>
    )
}

