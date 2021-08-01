import styled from "styled-components";

interface MarketProps {
    glow?: boolean
    active?: boolean
}

export const MarketBar = styled.div.attrs(( ) => ({tabIndex: 0}))<MarketProps>`
    width: 90%;
    min-height: 20%;

    margin: 5px;

    display: flex;
    justify-content: space-around;
    align-content: center;
    align-items: center;

    border-radius: 15px;
    text-align: center;
    border: none !important;

    background-color:${props => props.theme.light ? "white" : "black" };
    color: ${props => props.theme.light ? "black" : "white" };
    box-shadow: ${props => props.theme.light && props.glow ? ` 0 0 10px -3px #B8FF71`
                            : props.theme.light ? `0 0 15px -3px black`
                            : props.glow ? `0 0 10px -3px #B8FF71` 
                            : `0 0 10px -3px #F0F0F0` };
    transition: all 0.3s;

    font-size: 10px;

    &:hover {
        box-shadow: ${props => props.theme.light ? ` 0 0 25px -3px ${props.glow ? "#B8FF71" : "black"}` :`0 0 20px -3px ${props.glow ? "#B8FF71" : "white"}`};
    }
`

export const CollateralToggle = styled.button`
    border-radius: 15px;
    border-color: green;
    width: 20px;
    height: 20px;

`