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

export const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 5px;
    margin-right: 5px;
`

export const SideBar = styled(Offcanvas.Body)`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 0 !important;

`

export const Profile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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

export const Positions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const PositionNav = styled.div`
    width: 300px;
    height: 30px;
    margin-bottom: 5px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    align-content: flex-start;
`

export const PositionButtons = styled.a`
    background-color: transparent;
    color: ${props => props.theme.light ? "black" : "white"};
    border: none !important;
    font-family: neuropol-nova, sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 24px;
`

export const PositionsCard = styled.div.attrs(( ) => ({tabIndex: 1}))`
    width: 325px;
    height: 300px;
    border: none;
    border-radius: 15px;

    display: flex;
    justify-content: center;

    background-color: ${props => props.theme.light ?  "#090909" : "#F0F0F0"};
    box-shadow: ${props => props.theme.light ? "0 0 13px black" : "0 0 8px white" };
    color: ${props => props.theme.light ? "white" : "black"};
    transition: all 0.3s;

    &:hover {
        box-shadow: ${({ theme }) => theme.light ? "0 0 18px black" : "0 0 18px white"};
    }
`

export const PositionsTable = styled.div`
    width: 100%;
    margin-top: 15px;

    display: flex;
    justify-content: center;

    font-size: 13px;
`

export const TableHead = styled.thead`
    width: 100%;
    
    display: flex;
    justify-content: space-around;
`