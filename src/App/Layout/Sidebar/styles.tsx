import styled from "styled-components";
import { Button, Offcanvas } from "react-bootstrap";

export const StyledOffcanvas = styled(Offcanvas)`
    position: fixed;
    bottom: 0;
    z-index: 1050;
    max-width: 100%;

    display: flex;
    flex-direction: column;
    background-clip: padding-box;
    outline:0;
    transition: transform .3s ease-in-out;

    background-color: ${props => props.theme.light ? "#FFFFFF" : "#0A0A0A"};
    color: ${props => props.theme.light ? "#000000" : "#FFFFFF"};
`

export const ProfileImage = styled.img`
    width: 130px;
    height: 130px;
`

export const Address = styled(Button)`
    height: 40px;
    width: 150px;
    margin: 10px;

    border: none;
    border-radius: 20px;
    
    background-color: #525252;
    color: white;
    font-size: 14px;
    font-family: "Orbitron";

    
`