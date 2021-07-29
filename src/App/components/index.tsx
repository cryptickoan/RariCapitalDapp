import styled from "styled-components";

interface SpacingContainerProps {
    width?: string
    height?: string
    
    flexBasis?: string

    display?: string
    direction?: string
    justifyContent?: string
    alignContent?: string
    alignItems?: string

    marginBottom?: string
    margin?: string
    padding?: string
    
    overflowY?: string
    overflowX?: string

    color?: string
    textAlign?: string
}

export const SpacingContainer = styled.div<SpacingContainerProps>`
    width: ${props => props.width ?? "100%"};
    height: ${props => props.height ?? "100%"};

    display: ${props => props.display ?? "flex"};
    flex-direction ${props => props.direction ?? "row"};
    align-content:  ${props => props.alignContent ?? "center"};
    align-items:  ${props => props.alignItems ?? "center"};
    justify-content: ${props => props.justifyContent ?? "center"};

    flex-basis: ${props => props.flexBasis};

    overflow-y: ${props => props.overflowY};
    overflow-x: ${props => props.overflowX};

    color: ${props => props.color ?? props.theme.light ? "black" :"white" };
    text-align: ${props => props.textAlign};

    margin-bottom: ${props => props.marginBottom ?? "0"};
    margin: ${props => props.margin};
    padding: ${props => props.padding};
`

interface CardProps {
    borderRadius?: string
    backgroundColor?: string
    position?: string
    right?: string
}

export const Card = styled(SpacingContainer).attrs(( ) => ({tabIndex: 0}))<CardProps>`
    background-color: ${props => props.theme.light ? "white" : "black"};
    color: ${props => props.theme.light ? "black" : "white"};

    border-radius: ${props => props.borderRadius};
    position: ${props => props.position};
    right: ${props => props.right};

    box-shadow: ${props => props.backgroundColor ? props.backgroundColor : props.theme.light ? "0 0 15px -3px black" : "0 0 10px -3px #F0F0F0" };
    transition: all 0.3s;
`

interface ButtonProps {
    active?: boolean
    borderRadius?: string
}

export const Button = styled(SpacingContainer).attrs(( ) => ({tabIndex: 0}))<ButtonProps>`
    box-shadow: ${props => props.active 
                            ? props.theme.light ? "inset 0 0 25px -3px #B8FF71" : "inset 0 0 10px -3px #B8FF71" 
                            :  props.theme.light ? "0 0 15px -3px black" : "0 0 10px -3px #F0F0F0"};
    border-radius: ${props => props.borderRadius};
`

interface PProps {
    size?: string
    separate?: string
    glow?: boolean
    neuropolNova?: boolean
    margin?: string
    opacity?: string
}

export const StyledP = styled.p<PProps>`
    font-size: ${props => props.size};
    line-height: ${props => props.separate};

    text-align: center;
    margin: ${props => props.margin};

    text-shadow: ${props => props.glow ? "0 0 18px #B8FF71" : ""};
    font-family: ${props => props.neuropolNova ? "neuropol-nova" : ""};

    opacity: ${props => props.opacity};


`

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

export const InfoPair = ({ direction, flexBasis, glow, width, marginBottom, height, justifyContent, number, numberSize, alt, altSize, main, secondary, margin}: InfoPairProps) => {
    return (
        <SpacingContainer margin={margin} flexBasis={flexBasis} direction={direction} width={width} height={height} justifyContent={justifyContent} marginBottom={marginBottom}>
            <StyledP glow={glow} size={numberSize} separate={main}>{number}</StyledP>
            <StyledP size={altSize} separate={secondary}>{alt}</StyledP>
        </SpacingContainer>
    )
}

interface BannerProps {
    carousel?: boolean
    fuse?: boolean
}

export const Banner = styled.div.attrs(( ) => ({tabIndex: 0}))<BannerProps>`
    max-height: 15%;
    width: 93%;

    flex-basis: 80%;
    border-radius: 20px;

    display: flex;
    justify-content: ${props => props.carousel ? "center" : "space-evenly"};
    align-items: center;
    align-content: center;

    background-color: ${props => props.theme.light ? "white" : "black"};
    box-shadow: ${props => props.fuse ? "" : props.theme.light ? "0px 0px 10px -8px black":"0px 0px 13px -8px  white"};
    color: ${props => props.theme.light ? "white" : "black"};
    transition: all 0.4s, box-shadow 0.5s;


    &:hover {
        box-shadow: ${props => props.fuse? "" : props.theme.light ? "0 0 20px black" : "0px 0px 10px white"};
        border-radius: 15px/50%;
    }
`