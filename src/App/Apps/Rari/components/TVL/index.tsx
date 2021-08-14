// Styled Components
import { TVL as TVLContainer} from '../../../../Apps/Fuse/FusePoolsDisplay/styles'
import { SpacingContainer, StyledP } from '../../../../Shared'

const TVL = ({TVLNumber}: {TVLNumber: any}) => {
    return (
        <SpacingContainer height="30%" alignItems="flex-start">
            <TVLContainer width="100%" height="80%">  
                <StyledP size="1.2vw" separate="1.2vw" opacity="0.9" glow>Total value locked in Rari Capital</StyledP>
                <StyledP size="2.3vw" separate="2.3vw" glow>${TVLNumber.toLocaleString()}</StyledP>
            </TVLContainer>
        </SpacingContainer>
    )
}

export default TVL