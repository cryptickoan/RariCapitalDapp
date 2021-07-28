// React //
import { useState } from 'react'

// Style //
import './theme/style.tsx'

// Dependencies
import { GlobalStyle } from './theme/style'
import { ThemeProvider } from 'styled-components'

// Components //
import NavigationBar from './App/Layout/NavigationBar'
import { ReactQueryDevtools } from 'react-query/devtools'
import { SpacingContainer } from './App/components'
import Footer from './App/Layout/Footer'



function App() {
  // Theme toggle //
  const [theme, setTheme] = useState({light: false})

  const themeSwitcher = () => setTheme({light: !theme.light})
 

   return (
        <ThemeProvider theme={theme}>
          <GlobalStyle/>

          
          <SpacingContainer height="100vh" textAlign="center" direction="column">
            <NavigationBar/>
            <Footer themeSwitcher={themeSwitcher}/>
          </SpacingContainer>

          
        </ThemeProvider>
    )
}

export default App;
