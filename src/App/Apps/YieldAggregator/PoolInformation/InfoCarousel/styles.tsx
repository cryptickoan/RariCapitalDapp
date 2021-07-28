import styled from "styled-components"
import { Carousel } from 'react-bootstrap'

export const StyledCarousel = styled(Carousel)`
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.light ? "black" : "white"} !important;
`