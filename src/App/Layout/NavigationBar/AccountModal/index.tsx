// Rari //
import { useRari } from '../../../../context/RariProvider'

// Dependencies
import styled from 'styled-components'

// Typing
type AccountModalProps = {
    // If true modal will show
    show: boolean,

    // Will turn show false to hide modal
    close: Function
}

// Component 
const AccountModal = ({show, close}: AccountModalProps) => {
    const { logout } = useRari()
    
    return (
        <Modal show={show} onClick={() => close()}>
                <ConnectButton onClick={logout}>disconnect</ConnectButton>
        </Modal>
    )
}

export default AccountModal 


// Styled components
interface ModalProps {
    // If false display: none
    show: boolean
}

export const Modal = styled.div<ModalProps>`
    height: 100%;
    width: 100%;
    
    position: fixed;
    display: ${({show}) => (show ? 'flex' : 'none')};
    justify-content: space-around;
    align-items: center;

    z-index: 2000;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);

    font-family: 'Orbitron', sans-serif;
`

export const ConnectButton = styled.button`
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
`