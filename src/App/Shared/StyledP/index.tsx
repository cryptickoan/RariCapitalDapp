import styled from 'styled-components'

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

    text-shadow: ${props => props.glow ? props.theme.light ? "0 0 4px black" : "0 0 18px #B8FF71" : ""};
    font-family: ${props => props.neuropolNova ? "neuropol-nova" : ""};

    opacity: ${props => props.opacity};


`