// Rari //
import { RariContextData, useRari } from '../../../context/RariProvider'

// React //
import { useState } from 'react'

// Dependencies //
import { Link } from 'react-router-dom'
import styled from 'styled-components'

// Images //
import logo from '../../../static/logo.jpg'
import Menu from '../../components/Icons/Menu'

// Components
import Sidebar from '../Sidebar'
import AccountModal from '../AccountModal'

// import AccountModal from '../AccountModal'
import { Card, SpacingContainer, StyledP } from '../../components'


const NavigationBar = () => {
    const {state, login}= useRari()

    // Sidebar toggle //
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

   // Account Toggle //
   const [showModal, setShowModal] = useState(false)

   const handleModalClose = () => setShowModal(false)
   const handleModalShow =  () => setShowModal(true)

    return (
        <>
        <Sidebar show={show} handleClose={handleClose}  handleModalShow={handleModalShow} />
        <SpacingContainer height="10%" margin="20px 20px 0px 20px" justifyContent="space-between">
            <SpacingContainer width="10%">
                { state.isAuthed
                ? ( 
                    <SidebarButton >
                        <Menu onClick={() => handleShow()}/>
                    </SidebarButton>
                ) : 
                null }
            </SpacingContainer>

            <SpacingContainer flexBasis="50%" justifyContent="space-evenly">
                <Link to="/pools/all">Pools</Link>
                
                <Link to="/">
                <img src={logo} width="80" height="80" alt="Rari logo"/>
                </Link>
                
                <Link to="/fuse/all">Fuse</Link>
            </SpacingContainer>

            <SpacingContainer width="10%">
                <RightSide state={state} login={login}/>
            </SpacingContainer>
        </SpacingContainer>
         <AccountModal show={showModal} close={handleModalClose}/>
       </>
    )
}

export default NavigationBar


export const RightSide = ({state, login}: Pick<RariContextData, "state" | "login">) => {
    if (state.error) {
        return <Card height="10%" width="20%" position="absolute" right="5%" backgroundColor="0 0 18px red" padding="10px" textAlign="center"> <StyledP size="15px" neuropolNova>{state.error.description}</StyledP> </Card>
    } else {
        return !state.isAuthed ? <ConnectButton onClick={login}>Connect</ConnectButton> : null 
    }
}


export const ConnectButton = styled.button.attrs(( ) => ({tabIndex: 0}))`
    min-width: 133px;
    min-height: 40px;
    font-size: 16px;
    font-family: Orbitron, sans-serif;
    border: none !important;
    border-radius: 4px;
    align-self: center;

    box-shadow: ${({ theme }) => theme.light ? "0 0 18px black" : "0 0 18px white"};
    background-color: ${({ theme }) => theme.light ? "black" : "#F0F0F0"};
    color: ${({ theme }) => theme.light ? "white" : "black"};
    transition: all 0.3s;

    margin: 0 50% 0 0;

    &:hover {
        box-shadow: ${({ theme }) => theme.light ? "0 0 20px black" : "0 0 20px white"};
    }
`

export const SidebarButton = styled.button.attrs(( ) => ({tabIndex: 0}))`
    height: 36px;
    width: 40px;

    padding: 0px;
    display: flex;
    
    background-color: transparent;
    border: none !important;

    color: ${props => props.theme.light ? "#000000" : "#FFFFFF"}


`