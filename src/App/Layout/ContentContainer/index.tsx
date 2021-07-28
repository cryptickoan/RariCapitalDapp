// Dependencies
import { Routes, Route } from 'react-router-dom'
import styled from 'styled-components'


export const StyledContentContainer = styled.main`   
    height: 80%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    overflow: hidden;
    
`

const ContentContainer = () => {
    return (
        <StyledContentContainer>
            <Routes>
                <Route path="/pools/*" element={<h1>hello</h1>}/>
                <Route path="/fuse/*" element={<h1>hey!</h1>}/>
            </Routes>
        </StyledContentContainer>
    )
}

export default ContentContainer