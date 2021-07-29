import styled from 'styled-components'

export const Title = styled.h1`
    font-size:50px;
    font-family: 'neuropol-nova';
    text-shadow:${props => props.theme.light ? "0 0 10px #B8FF71, 10px 0 13px black, 0 10px 10px #B8FF71": "0 0 10px #B8FF71"}; 
    color: ${props => props.theme.light ? "black": "white"};
    line-height: 50px;
`

export const FusePoolContainer = styled.div`
    height: 100%;
    width: 100%;

    display: flex;
`

export const FuseSideBar = styled.div`
    height: 100%;
    width: 25%;

    color: ${props => props.theme.light ? "black" :"white"};
`
interface SideBarSpanProps {
    markets?: boolean
}
export const SideBarSpan = styled.div<SideBarSpanProps>`
    height: ${props => props.markets ? "70%": "20%"};
    width: 100%;

    display: flex; 
    flex-direction: column;
    justify-content: ${props => props.markets ? "flex-start": "center"};
    align-items: center;

    overflow: scroll;

`

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

export const FuseGraph = styled.div`
    width: 50%;
    height: 100%;

`

export const Totals = styled.h1`
    font-size: 20px;
    text-shadow: 0 0 18px #B8FF71;
    line-height: 30px;
`

export const SimulationInput = styled.input`
    width: 90%;
    background-color:${props => props.theme.light ? "white" : "black" };
    color: ${props => props.theme.light ? "black" : "white" };
    box-shadow: ${props => props.theme.light ? "0 0 15px -3px black" : "0 0 10px -6px #F0F0F0" };
    transition: all 0.3s;

    border: none;
    border-radius: 15px;
    text-align: center;
`