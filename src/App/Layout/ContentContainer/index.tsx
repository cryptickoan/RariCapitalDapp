// Dependencies
import { Routes, Route } from 'react-router-dom'
import styled from 'styled-components'

// Components
import YieldAggregator from '../../Apps/YieldAggregator'


export const StyledContentContainer = styled.main`   
    height: 100%;
    width: 100%;

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
                <Route path="/pools/*" element={<YieldAggregator/>}/>
                <Route path="/fuse/*" element={<h1>hey!</h1>}/>
            </Routes>
        </StyledContentContainer>
    )
}

export default ContentContainer