
import styled from 'styled-components'

// LeftDiv //
export const Graphs = styled.div.attrs(( ) => ({tabIndex: 0}))`
    width: 93%;
    height: 70%;

    border-radius: 20px;

    background-color: ${props => props.theme.light ? "white" : "black"};
    box-shadow: ${({ theme }) => theme.light ? "0px 0px 13px -8px black":"0px 0px 13px -8px  white"};
    color: black;
    transition: all 0.4s, box-shadow 0.5s;

    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;



    &:hover {
        box-shadow: ${({ theme }) => theme.light ? "0 0 20px black" : "0px 0px 10px white"};
        border-radius: 15px/50%;
    }
`


// Pool Info Sidebar //
interface ButtonProps {
    active?: string
    types?: string
}
export const Button = styled.button<ButtonProps>`
    width: ${ props => props.types === "year" || props.types === "month" ? "80px" : "177px"};
    height: ${ props => props.types === "year" || props.types === "month" ? "74px" : props.types === "week" ? "85px" : "50px"};
    
    align-self: center;
    border-radius: 15px;
    border: none !important;

    margin: ${props => props.types === "year" || props.types === "month" ? "5px" : "0px"};
    
    box-shadow: inset ${({active, types, theme}) => active === types && theme.light ? "0px 0px 20px 10px  #B8FF71" 
                                                    : active === types ? "0px 0px 10px #B8FF71" 
                                                    : theme.light ? "0 0 20px -10px black" 
                                                    : "0 0 20px -10px white"};
    background-color: ${({ theme }) => theme.light ? "#F0F0F0" : "black"};
    color: ${({ theme }) => theme.light ? "black" : "white"};
    
    font-size: ${props => props.types === "year" || props.types === "month" ? "15px" : "25px"};
    font-family: Orbitron, sans-serif;
`

export const GraphButtonGroup = styled.div`
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

interface GraphButtonProps {
    readonly name?: string; 
    readonly action?: string;
}; 

export const GraphButton = styled.button<GraphButtonProps>`
    width: 50%;
    height: 30px;
    border: none;

    font-family: 'Orbitron';
    font-size: 12px;
    z-index: ${props => props.action === props.name ? "1" : "2"};

    ${props => props.name === "return" ? 
    "border-radius: 0px 3px 3px 0px;" 
    : "border-radius: 3px 0px 0px 3px; "}

    background-color: ${props => props.theme.light ?  "#F0F0F0" :"#000000"};
    color: ${props => props.theme.light ?  "black" : "white" };

    ${props => props.action === props.name ? "box-shadow: inset 0 0 18px -8px #B8FF71; border: none !important;" : ""}
`
