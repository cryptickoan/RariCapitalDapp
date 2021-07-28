// Styles for Gas Icon //
import './styles.css'

// Dependencies //
import styled from 'styled-components'
import { useQuery } from 'react-query'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

// Icons //
import Gas from '../../components/Icons/Gas'
import Block from '../../components/Icons/Block'
import Spinner from '../../components/Icons/Spinner'
import { SpacingContainer } from '../../components'

const getGas = async () => {
    const gasRaw = await fetch(
        "https://data-api.defipulse.com/api/v1/egs/api/ethgasAPI.json?api-key=215a01e387e8469239b02beb84e5b8d7c540c3f501171564ad19e50266b1"
                                ).then((res) => res.json())
    return gasRaw
}

const Footer = ({themeSwitcher}: {themeSwitcher: Function}) => {

    const {isLoading, data: gas} = useQuery('gas', () => {
        return getGas()
    })


    return (
        <SpacingContainer height="10%" margin="0px 20px 0px 20px" justifyContent="space-between">
            <SpacingContainer flexBasis="10%" justifyContent="space-evenly">
                {isLoading ? <Spinner/> : <SpacingContainer width="35px"> <GasButton gas={gas}/> </SpacingContainer> }
            </SpacingContainer>

            <SpacingContainer flexBasis="30%" justifyContent="space-around">
                
                <a href="/">
                    Notion 
                </a>

                <ThemeToggleButton onClick={() => themeSwitcher()}/>
            
                <a href="/users">
                    Docs
                </a>
                
            </SpacingContainer>
                
            <SpacingContainer flexBasis="10%" justifyContent="space-evenly">
                {isLoading ? <Spinner/> : <SpacingContainer width="35px" direction="column"> <BlockButton gas={gas}/> </SpacingContainer> }   
            </SpacingContainer>
        </SpacingContainer>
    )
}

export default Footer

export const ThemeToggleButton = styled.button`

    width: 25px;
    height: 25px;
    border-radius: 15px;
    border: none !important;

    background-color:  ${({ theme }) => theme.light ? "black" : "white"};
`

export const StyledToolTip = styled.div`
    color: ${({theme})=> theme.light ? "black" : "white"};
    margin: 0 10px 10px 10px;
`

const GasButton = ({gas}: any) =>{
    return (
        <OverlayTrigger
            key='right'
            placement='right'
            overlay={
                <StyledToolTip>
                    {gas.fastest/10} | {gas.fast/10} | {gas.average/10}
                </StyledToolTip>
            }
        >
                <a href="https://ethgasstation.info/" target="_blank" rel="noreferrer">
                    <Gas className="GasIcon"/>
                </a>
        </OverlayTrigger>
    )
} 

const BlockButton = ({gas}: any) => {
    return (
        <OverlayTrigger
            key='left'
            placement='left'
            overlay={
                <StyledToolTip>
                    {gas.blockNum.toLocaleString()}
                </StyledToolTip>
            }
        >
            <a href="https://ethgasstation.info/txPoolReport.php" target="_blank" rel="noreferrer">
                <Block className="GasIcon"/>
            </a>
        </OverlayTrigger>
    )
}