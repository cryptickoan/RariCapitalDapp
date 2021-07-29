import styled from 'styled-components'

export const TopBar = styled.div`
    width: 100%;
    min-height: 65%;

    display: flex;
`

export const FusePool = styled.div.attrs(( ) => ({tabIndex: 0}))<FusePoolProps>`
    width: 90%;
    min-height: ${props => props.tablehead ? "30%" : "12%"};
    margin-top:  ${props => props.tablehead ? "0" : "12px"};

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    border-radius: 15px;
    background-color: ${props => props.theme.light ? "white" : "black"};
    box-shadow: ${props => props.theme.light ? "0 0 9px -3px black" : " 0 0 6px -3px white"};

    font-size: ${props => props.tablehead ? "13px" : "11px"};

    &: hover {
        background-color: ${props => props.tablehead ? "" : props.theme.light ? "#CFCFCF" : "#2D2D2D"};
    }
`

export const FusePoolSpan = styled.div<FusePoolProps>`
    flex-basis: ${props => props.tablehead ? "40%" : "15%"};
`


export const PoolListDiv = styled.div<FusePoolProps>`
    width: 100%;
    min-height: ${props => props.tablehead ? "25%" : "75%"};


    overflow-y: scroll !important;

    display: flex;
    flex-direction: column;
    justify-content: ${props => props.tablehead ? "center" : "flex-start" };
    align-content: center;
    align-items: center;

    color: ${props => props.theme.light ? "black" : "white" };

`

interface BarSpanProps {
    tvl?: boolean
}

export const BarSpan = styled.div<BarSpanProps>`
    height: 100%; 
    width: ${props => props.tvl ? "50%" : "25%"};

    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center
`
export const SearchBar = styled.div.attrs(( ) => ({tabIndex: 0}))`
    height: 45%;
    max-width: 80%; 

    display: flex;
    justify-content: space-between;
    align-items: center;

    border-radius: 15px;
    box-shadow: ${props => props.theme.light ? "0 0 15px -3px black": "0 0 15px -3px white"};

    transition: all 0.3s;

    
    &:hover {
        box-shadow ${props => props.theme.light ? "0 0 25px -3px white": "0 0 25px -3px black"};

        border: none !important;
    }
`
export const SearchBarIcon = styled.div`
    max-width: 23%;
    width: 23%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: grey;
    color: black;
    border-radius: 15px 0px 0px 15px;
`
export const SearchBarInput = styled.input`
    max-width: 77%;
    height: 100%;
    border-radius: 0px 15px 15px 0px;
    border: none !important;

    background-color: ${props => props.theme.light ? "white" : "black" };
    color: ${props => props.theme.light ? "black" : "white" };
`


export const SelectPool = styled.select.attrs(( ) => ({tabIndex: 0}))`
    width: 80%;
    height: 45%;

    border-radius: 15px;
    text-align: center;
    border: none !important;

    background-color:${props => props.theme.light ? "white" : "black" };
    color: ${props => props.theme.light ? "black" : "white" };
    box-shadow: ${props => props.theme.light ? "0 0 15px -3px black" : "0 0 15px -3px #F0F0F0" };
    transition: all 0.3s;

    &:hover {
        box-shadow: ${props => props.theme.light ? "0 0 20px -3px white" : "0 0 20px -3px black"};
    }
`

export const TVL = styled.div.attrs(( ) => ({tabIndex: 0}))`
    width: 80%;
    height: 75%;

    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    border-radius: 15px;
    box-shadow: ${props => props.theme.light ? "inset 0 0 55px #B8FF71" : "inset 0 0 15px -3px #B8FF71"};

    background-color: ${props => props.theme.light ? "white" : "black" };
    color: ${props => props.theme.light ? "black" : "white" };
    transition: all 0.3s;
    &:hover {
        box-shadow: ${props => props.theme.light ? "inset 0 0 65px #B8FF71" : "inset 0 0 25px #B8FF71"};
    }
`
interface FusePoolProps {
    tablehead?: boolean
}

