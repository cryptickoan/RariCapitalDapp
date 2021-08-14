// Hooks
import useRGTInfo from './hooks/useRGTInfo'

// Styled Components
import { SpacingContainer, StyledP, Card } from '../../../../Shared'

// Icons
import Spinner from '../../../../Shared/Icons/Spinner'

const RGTInfo = () => {
    const {RGTPrice, RGTSupply, RGTVol, RGTLow, RGTHigh} = useRGTInfo()

     return (
         <>
        <SpacingContainer height="10%" margin="3% 0 0 0">
            <StyledP size="1vw" opacity="0.4"><strong>Rari Governance Token Overview</strong></StyledP>
        </SpacingContainer>
        <SpacingContainer direction="column" height="80%" justifyContent="space-evenly">
            <SpacingContainer height="50%"  width="90%" justifyContent="space-evenly">
                <Card flexBasis="25%" height="50%" borderRadius="15px" direction="column"> 
                    {!RGTLow ? <Spinner /> :  
                        <>
                            <StyledP size="1.5vw" separate="1.6vw" glow>${ RGTLow }</StyledP>
                            <StyledP size="0.8vw" separate="0.9vw">24h Low</StyledP>
                        </>
                    }
                </Card>
                <Card flexBasis="25%" height="50%" borderRadius="15px" direction="column"> 
                    {!RGTPrice ? <Spinner /> :  
                        <>
                            <StyledP size="1.5vw" separate="1.6vw" glow>${ RGTPrice.substring(0, 5) }</StyledP>
                            <StyledP size="0.8vw" separate="0.9vw">RGT Price</StyledP>
                        </>
                    }
                </Card>
                <Card flexBasis="25%" height="50%" borderRadius="15px" direction="column"> 
                    {!RGTHigh ? <Spinner /> :  
                        <>
                            <StyledP size="1.5vw" separate="1.6vw" glow>${ RGTHigh }</StyledP>
                            <StyledP size="0.8vw" separate="0.9vw">24h High</StyledP>
                        </>
                    }
                </Card>
                
            </SpacingContainer>

            <SpacingContainer width="90%" height="50%" justifyContent="space-evenly" alignItems="flex-start"> 
                <Card flexBasis="40%" height="60%" direction="column" borderRadius="15px">
                    {!RGTVol ? <Spinner /> :  
                            <>
                                <StyledP size="1.5vw" separate="1.6vw" glow>${ RGTVol.toLocaleString() }</StyledP>
                                <StyledP size="0.8vw" separate="0.9vw">Trading Volume</StyledP>
                            </>
                        }
                </Card>
                <Card flexBasis="40%" height="60%" direction="column" borderRadius="15px">
                 {!RGTSupply ? <Spinner /> :  
                        <>
                            <StyledP size="1.5vw" separate="1.6vw" glow>{ RGTSupply.toLocaleString() }</StyledP>
                            <StyledP size="0.8vw" separate="0.9vw">RGT Supply</StyledP>
                        </>
                    }
                </Card> 
            </SpacingContainer>
        </SpacingContainer>
        </>
    )
}

export default RGTInfo