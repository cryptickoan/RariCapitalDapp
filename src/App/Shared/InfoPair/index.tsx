import { SpacingContainer, StyledP } from ".."

// Type
interface InfoPairProps {
    direction?: string
    width?: string
    height?: string
    marginBottom?: string
    justifyContent?: string
    flexBasis?: string
    numberSize?: string
    number?:string | undefined
    alt?: string
    altSize?: string
    main?: string
    secondary?: string
    glow?: boolean
    margin?: string
}

const InfoPair = ({ direction, flexBasis, glow, width, marginBottom, height, justifyContent, number, numberSize, alt, altSize, main, secondary, margin}: InfoPairProps) => {
    return (
        <SpacingContainer 
            margin={margin} 
            flexBasis={flexBasis} 
            direction={direction} 
            width={width} 
            height={height} 
            justifyContent={justifyContent} 
            marginBottom={marginBottom}
        >
            <StyledP 
                glow={glow}
                size={numberSize} 
                separate={main}
            >
                {number}
            </StyledP>
            <StyledP 
                size={altSize} 
                separate={secondary}
            >{alt}</StyledP>
        </SpacingContainer>
    )
}

export default InfoPair