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
    text-align: ${props => props.textAlign}

    margin-bottom: ${props => props.marginBottom ?? "0"};
    margin: ${props => props.margin};
    padding: ${props => props.padding};
`

interface CardProps {
    borderRadius?: string
    backgroundColor?: string
}

export const Card = styled(SpacingContainer).attrs(( ) => ({tabIndex: 0}))<CardProps>`
    background-color: ${props => props.theme.light ? "white" : "black"};
    color: ${props => props.theme.light ? "black" : "white"};

    border-radius: ${props => props.borderRadius};

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
}

export const StyledP = styled.p<PProps>`
    font-size: ${props => props.size};
    line-height: ${props => props.separate};
    text-shadow: ${props => props.glow ? "0 0 18px #B8FF71" : ""};
    font-family: ${props => props.neuropolNova ? "neuropol-nova" : ""};
    text-align: center;
`