// Hooks
import useRGTInfo from './hooks/useRGTInfo'

// Styled Components
import { SpacingContainer, StyledP, Card } from '../../../../Shared'

// Icons
import Spinner from '../../../../Shared/Icons/Spinner'

const RGTInfo = () => {
    const {RGTPrice, RGTSupply, RGTVol} = useRGTInfo()
     return (
        <SpacingContainer direction="column" height="100%" justifyContent="space-evenly">
            <StyledP>Rari Governance Token Overview</StyledP>
            <SpacingContainer  width="90%" justifyContent="space-evenly">
                <Card flexBasis="25%" height="5vw" borderRadius="15px" direction="column"> 
                    {!RGTPrice ? <Spinner /> :  
                        <>
                            <StyledP size="1.5vw" separate="1.6vw" glow>${ RGTPrice.substring(0, 5) }</StyledP>
                            <StyledP size="0.8vw" separate="0.9vw">RGT Price</StyledP>
                        </>
                    }
                </Card>
                <Card flexBasis="40%" height="5vw" direction="column" borderRadius="15px">
                 {!RGTSupply ? <Spinner /> :  
                        <>
                            <StyledP size="1.5vw" separate="1.6vw" glow>{ RGTSupply.toLocaleString() }</StyledP>
                            <StyledP size="0.8vw" separate="0.9vw">RGT Supply</StyledP>
                        </>
                    }
                </Card> 
            </SpacingContainer>
            <SpacingContainer flexBasis="50%" width="90%" height="50%" justifyContent="space-evenly">
                <Card flexBasis="40%" height="5vw" direction="column" borderRadius="15px">
                    {!RGTVol ? <Spinner /> :  
                            <>
                                <StyledP size="1.5vw" separate="1.6vw" glow>${ RGTVol.toLocaleString() }</StyledP>
                                <StyledP size="0.8vw" separate="0.9vw">Trading Volume</StyledP>
                            </>
                        }
                </Card>
            </SpacingContainer>
        </SpacingContainer>
    )
}

export default RGTInfo