import styled from 'styled-components'

export const TotalBar = styled.div`
    background-color: transparent;
    min-width: 70%;
    height: 20%;
    display: flex;
    align-self: center;
    justify-content: flex-start;
    border-radius: 15px;
`

interface fillProps {
    percentage: number 
    position?: string
}

export const Fill = styled.span.attrs(( ) => ({tabIndex: 0}))<fillProps>`
    width: ${(props) => props.percentage > 1 ? props.percentage : "2"}%;
    max-height: 100%;
    box-shadow: ${(props) => props.theme.light ? "inset 0 0 20px -3px black" : "inset 0 0 20px -3px white"};
    transition: box-shadow 0.3s, width 0.3s;
    border-radius: ${props => props.position === "only" ? "18px" : props.position === "initial" ? "18px 0px 0px 18px" : props.position === "last" ? "0px 18px 18px 0px" : ""};

    overflow: hidden;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 12px;

    &:hover {
        box-shadow: inset 0 0 12px #B8FF71;
        width: ${(props) => props.percentage + 30}%;
    }
`

export const FillKey = styled.span`
    color: ${props => props.theme.light ? "black" : "white"};
    font-family: 'Orbitron';
    font-size: 15px;
`

export const FillKeyNumbers = styled.p`
    color: #B8FF71;
    font-family: 'Orbitron', sans-serif;
    font-size: 15px;
    display: inline;
`

export const Type = styled.p`
    font-size: 20px;
    line-height: 20px;
    font-family: 'neuropol-nova', sans-serif;
    color: ${({theme}) => theme.light ? "black": "white"} !important;
    opacity: 0.8;

`   