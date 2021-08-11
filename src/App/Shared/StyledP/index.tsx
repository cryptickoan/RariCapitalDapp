import styled from 'styled-components'

interface PProps {
    size?: string
    separate?: string
    glow?: boolean
    neuropolNova?: boolean
    margin?: string
    opacity?: string
    color?: string
}

export const StyledP = styled.p<PProps>`
    font-size: ${props => props.size};
    line-height: ${props => props.separate};

    color: ${props => props.color ?? props.theme.light ? 'black' : 'white'};

    text-align: center;
    margin: ${props => props.margin};

    text-shadow: ${props => props.glow ? props.theme.light ? "0 0 4px black" : "0 0 18px #B8FF71" : ""};
    font-family: ${props => props.neuropolNova ? "neuropol-nova" : ""};

    opacity: ${props => props.opacity};
`

type StyledSpanProps = {
    color?: string
    opacity?: string
    fontSize?: string 
}

export const StyledSpan = styled.span<StyledSpanProps>`
    color: ${props => props.color};
    opacity: ${props => props.opacity};
    text-shadow: ${props => props.color ? `0 0 8px ${props.color}` : ''};
    font-size: ${props => props.fontSize};
`