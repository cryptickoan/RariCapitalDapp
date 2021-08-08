import styled from 'styled-components'

interface BannerProps {
    carousel?: boolean
    fuse?: boolean
}

export const Banner = styled.div.attrs(( ) => ({tabIndex: 0}))<BannerProps>`
    max-height: 15%;
    width: 93%;

    flex-basis: 80%;
    border-radius: 20px;

    display: flex;
    justify-content: ${props => props.carousel ? "center" : "space-evenly"};
    align-items: center;
    align-content: center;

    background-color: ${props => props.theme.light ? "white" : "black"};
    box-shadow: ${props => props.fuse ? "" : props.theme.light ? "0px 0px 10px -8px black":"0px 0px 13px -8px  white"};
    color: ${props => props.theme.light ? "white" : "black"};
    transition: all 0.4s, box-shadow 0.5s;


    &:hover {
        box-shadow: ${props => props.fuse? "" : props.theme.light ? "0 0 20px black" : "0px 0px 10px white"};
        border-radius: 15px/50%;
    }
`