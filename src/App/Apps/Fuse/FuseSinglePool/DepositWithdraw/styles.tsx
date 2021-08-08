import styled from 'styled-components'

type OnOffButtonProps = {
    width: string
    height: string
    active: boolean
}

export const OnOffButton = styled.div.attrs(( ) => ({tabIndex: 0}))<OnOffButtonProps>`
    width: ${props => props.width };
    height: ${props => props.height};

    padding: 0;
    border-radius: 15px;
    border: none !important;
    align-self: center;

    margin: 0;

    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    text-align: center;

    background-color: ${({ theme }) => theme.light ? "white" : "black"};
    color: ${({ theme }) => theme.light ? "black" : "white"};
    box-shadow: inset ${({theme, active }) => active ? "0 0 20px #B8FF71" : theme.light ? "0 0 20px -10px black"  : "0px 0px 20px -10px white" } ;
    line-height: 12px;
    transition: all 0.3s;

    font-size: 0.6vw;
    cursor: pointer;


    &:hover {
        box-shadow: inset ${({ theme }) => theme.light ? "0 0 15px black" : "0 0 15px white"};
    }
    `