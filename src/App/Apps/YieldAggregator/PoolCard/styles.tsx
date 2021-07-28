import styled from 'styled-components'


interface PoolCardProps {
    readonly isOpen: boolean; 
};

// Pool Card layout //
export const PoolCards = styled.div.attrs(( ) => ({tabIndex: 0}))`
    height: 90%;
    width: 22%;
    border-radius: 15px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;

    

    background-color: ${({ theme }) => theme.light ?  "#F0F0F0" : "black"};
    box-shadow: ${({ theme }) => theme.light ? "0px 0px 120px -93px black":" 0px 0px 120px -93px white"};
    color: ${({ theme }) => theme.light ? "black": "white"};
    transition: all 0.4s, box-shadow 0.5s;

    &:hover {
        box-shadow: ${({ theme }) => theme.light ? "0 0 20px black" : "0 0 25px white"};
        height: 95%;
        width: 23%;
        border-radius: 15px/50%;
        padding: 10px;
    }
`;

export const PoolContent = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;   
`

// Pool Header display //
export const PoolHeader = styled.div<PoolCardProps>`
    display: flex;
    flex-direction: ${props => props.isOpen ? "row" : "column"};
    align-items: center;
    justify-content: center;

    font-family: neuropol-nova, sans-serif;
    font-weight: 400;
    font-style: normal;
    
`

// Pool text i.e title, description, subtitle //
export const PoolText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 90%;
    margin: 4px 0px
`

export const OpenTitle = styled.div<PoolCardProps>`
    display: flex;
    flex-direction: ${props => props.isOpen ? "row" : "column"};
    align-items: center;
    margin: 0px;
    font-size: 30px;
    line-height:  ${props => props.isOpen ? "40px" : "20px"};
`

export const PoolTitle = styled.p`
    font-size: 50px;
    line-height: 27px;
    margin: 0 !important;
    margin-bottom: 0 !important;
`

export const PoolSub = styled.p`
    font-size: 20px;
    margin: 0;
`

export const PoolDescription = styled.p<PoolCardProps>`
    display: ${props => props.isOpen ? "" : "none"};
    opacity: 0.4;
    line-height: 2px;
    font-size: 18px;
    margin: 2px 0 10px;
`

//  if closed show open button, if open show deposit withdraw //
export const OpenDiv = styled.div<PoolCardProps>`
    display: ${props => props.isOpen ? "none" : ""};
`

export const DepositWithdrawDiv = styled.div<PoolCardProps>`
    display: ${props => props.isOpen ? "" : "none"};
`







