// Styled Components
import { SpacingContainer, StyledP, Card } from "../../../../Shared"
import { TVL as SecondaryTVL } from "../../styles"

// Icons
import Spinner from "../../../../Shared/Icons/Spinner"

const FuseOverview = ({fuseTVL}: {fuseTVL: any}) => {
    return (

        <SpacingContainer>
            <Card width="80%" borderRadius="15px" alignItems="flex-start" padding="5% 0 0 0">
                <SecondaryTVL width="80%" height="15%">
                    <StyledP size="1vw" separate="1vw" glow>Total value locked in Fuse</StyledP>
                    <StyledP size="1.5vw" separate="1.5vw" glow>${fuseTVL.toLocaleString()}</StyledP>
                </SecondaryTVL>
            </Card>
        </SpacingContainer>
    )
}

export default FuseOverview