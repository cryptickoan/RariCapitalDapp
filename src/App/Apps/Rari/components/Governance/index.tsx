// Styled Components
import { Card, SpacingContainer, StyledP, StyledSpan } from '../../../../Shared'
import Spinner from '../../../../Shared/Icons/Spinner'
import {TVL as SecondaryTVL} from '../../styles'

// Hooks
import useGovernance from "./hooks/useGovernance"

const Governance = ({RGT}: {RGT: any}) => {
    const Snap = useGovernance()

    console.log('snap', Snap)
    return (
        <Card borderRadius="15px" alignItems="flex-start" padding="5% 0 0 0">
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
        </Card>
    )
}

export default Governance