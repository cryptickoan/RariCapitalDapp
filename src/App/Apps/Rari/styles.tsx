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

export const ProposalContainer = styled(SpacingContainer).attrs(( ) => ({tabIndex: 0}))<StatusDivProps>`
    border: ${props => props.theme.light ? '3px inset #dbdbdb' : '2px inset #9d9c9c'};
    border-radius: 15px/50%;
    justify-content: space-evenly;
    box-shadow: ${props => props.active === 'active' ? "inset 0 0 4px #B1E25E" : 'inset 0 0 4px #CB4242'};
    transition: ease-out 0.3s;

    &: hover{
        box-shadow: ${props => props.active === 'active' ? "inset 0 0 10px #B1E25E": "inset 0 0 10px #CB4242"};
        border-radius: 15px/20%;
    }
`

type StatusDivProps = {
    active: string;
}

export const StatusDiv = styled.div<StatusDivProps>`
    width: 20%;
    align-self: center;
    background-color: ${props => props.active === 'active' ? "#B1E25E" : '#CB4242'};
    border: none;
    border-radius: 15px;
    font-size: 1vw;
    font-family: 'Neuropol-nova', sans-serif;
`