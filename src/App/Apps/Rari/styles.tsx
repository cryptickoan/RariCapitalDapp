// Styled Components
import styled from 'styled-components'
import { SpacingContainer, Card } from "../../Shared"

export const TVL = styled(SpacingContainer).attrs(( ) => ({tabIndex: 0}))`
    box-shadow: ${props => props.theme.light ? "inset 0 0 15px -5px black" : "inset 0 0 15px -3px white"};

    flex-direction: column;
    border-radius: 15px;
    background-color: ${props => props.theme.light ? "white" : "black" };
    color: ${props => props.theme.light ? "black" : "white" };
    transition: all 0.3s;

    &:hover {
        box-shadow: ${props => props.theme.light ? "inset 0 0 50px #98D35E" : "inset 0 0 25px #98D35E"};
    }

    ${Card}:hover &{
        box-shadow: ${props => props.theme.light ? "inset 0 0 50px #98D35E" : "inset 0 0 25px #98D35E"};
    }
`