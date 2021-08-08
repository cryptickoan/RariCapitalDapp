// Styled Components
import styled from 'styled-components'
import { Card } from '../Card'

type OnOffButtonProps = {
    active?: boolean
    fontSize?: string
}

export const OnOffButton = styled(Card).attrs(( ) => ({tabIndex: 0}))<OnOffButtonProps>`
    background-color: ${({ theme }) => theme.light ? "white" : "black"};
    color: ${({ theme }) => theme.light ? "black" : "white"};
    box-shadow: inset ${({theme, active }) => active ? "0 0 20px #B8FF71" : theme.light ? "0 0 20px -10px black"  : "0px 0px 20px -10px white" } ;
    
    transition: all 0.3s;

    font-size: ${props => props.fontSize};
    cursor: pointer;

    &:hover {
        box-shadow: inset ${({ theme }) => theme.light ? "0 0 15px black" : "0 0 15px white"};
    }
    `