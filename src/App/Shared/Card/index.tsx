import styled from 'styled-components'
import { SpacingContainer } from '../SpacingContainer'

interface CardProps {
    borderRadius?: string
    boxShadow?: string

    backgroundColor?: string

    position?: string
    right?: string
    
    cursor?: string
    diffOnHover?: boolean
}

export const Card = styled(SpacingContainer).attrs(( ) => ({tabIndex: 0}))<CardProps>`
    background-color: ${props => props.backgroundColor ?? props.theme.light ? "white" : "black"};
    color: ${props => props.theme.light ? "black" : "white"};

    border-radius: ${props => props.borderRadius};
    position: ${props => props.position};
    right: ${props => props.right};

    box-shadow: ${props => props.boxShadow ? props.boxShadow : props.theme.light ? "0 0 15px -3px black" : "0 0 10px -3px #F0F0F0" };
    transition: all 0.3s;

    cursor: ${props => props.cursor};

    &: hover {
        background-color: ${props => props.diffOnHover ? props.theme.light ? "#CFCFCF" : "#2D2D2D" : ""};
    }
`