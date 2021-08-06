import styled from "styled-components"


type SimulationInputProps = {
    width?: string
}

export const SimulationInput = styled.input<SimulationInputProps>`
width: ${props => props.width ?? "90%"};
background-color:${props => props.theme.light ? "white" : "black" };
color: ${props => props.theme.light ? "black" : "white" };
box-shadow: ${props => props.theme.light ? "0 0 15px -3px black" : "0 0 10px -6px #F0F0F0" };
transition: all 0.3s;

border: none;
border-radius: 15px;
text-align: center;
`