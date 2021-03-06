import styled, { createGlobalStyle } from 'styled-components'

export const AppContainer = styled.div `
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    
    text-align: center;
    }
`

export const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.light ? "#FFFFFF" : "#000000"};
    font-family: 'Orbitron', sans-serif;
    overflow: hidden;
    margin: 0px !important;
    width: 100%;
    height: 100%;
    color: ${props => props.theme.light ? 'black' : 'white'};
  } 

  a {
      text-decoration: none;
      color: ${({ theme }) => theme.light ? "#000000" : "#FFFFFF"} !important;
      opacity: 0.9;
      transition: ease-in 0.1s;
      display: flex;
      flex-direction: column;
      align-items: center;
  }

  a:hover, a:focus {
    opacity: 1;
    text-shadow: ${props => props.theme.light ? "0px 2px 3px black ;" : "0px 2px 3px white, 2px 0px 3px white ;"} 
    color: ${({ theme }) => theme.light ? "#000000" : "#FFFFFF"} !important;
  }
`   