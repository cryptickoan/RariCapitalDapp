// Dependencies
import { Routes, Route } from 'react-router-dom'
import styled from 'styled-components'

// Components
import YieldAggregator from '../../Apps/YieldAggregator'
import Fuse from '../../Apps/Fuse'


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
                <Route path="/fuse/*" element={<Fuse/>}/>
            </Routes>
        </StyledContentContainer>
    )
}

export default ContentContainer