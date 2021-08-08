import styled from 'styled-components'

type APYprops = {
    card?: boolean,
    current?: boolean,
    glow?:boolean,
}

export const APYDisplayer = styled.div.attrs(( ) => ({tabIndex: 0}))<APYprops>`
    width: ${props => props.card ? "80px" : props.current ? "177px" : "80px"};
    height: ${props => props.card ? "30px" : props.current ? "85px" : "74px"};

    padding: 0;
    border-radius: ${ props => props.card ? "10px" : "15px"};
    border: none !important;
    align-self: center;

    margin: ${props => props.current ? "0px" : "5px"};

    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    text-align: center;

    background-color: ${({ theme, card }) => card ? "#B8FF71;" : theme.light ? "#F0F0F0" : "black"};
    color: ${({ theme, card}) => card ? "black" : theme.light ? "black" : "white"};
    box-shadow: inset ${({theme, glow}) => glow && theme.light ? "0px 0px 20px 10px  #B8FF71" 
                                : glow ? "0px 2px 10px #B8FF71" 
                                : theme.light ? "0 0 20px -10px black" 
                                : "0px 0px 20px -10px white"
                            } ;
    line-height: 12px;
    transitions: all 0.3s;


    &:hover {
        box-shadow: inset ${({theme, glow}) =>  theme.light && glow ? 
                                "0px 0px 30px 3px  #B8FF71" 
                                : glow ? "0px 2px 20px #B8FF71" 
                                : theme.light ? "0 0 20px black" : "0 0 25px white"};
        padding: 10px;
    }
    `

type APYProps = {
    current?: boolean
    card?: boolean
}

export const APY = styled.p<APYProps>`
    font-size: ${props => props.current ? props.card ? "13px" :"35px": "20px"};
    text-shadow: ${props => props.current ? "0px 2px 18px #B8FF71, 2px 0px 18px #B8FF71 " : ""};
    line-height:  ${props => props.current ?  "35px": "20px"};
    align-self: center;
    font-family: 'Orbitron', sans-serif;
    margin: 0;
`