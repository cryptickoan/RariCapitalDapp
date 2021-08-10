// Dependencies
import { Routes, Route } from 'react-router-dom'
import styled from 'styled-components'

// Apps
import YieldAggregator from '../../Apps/YieldAggregator'
import Fuse from '../../Apps/Fuse'
import Rari from '../../Apps/Rari'


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
                <Route path="" element={<Rari/>}/>
                <Route path="/pools/*" element={<YieldAggregator/>}/>
                <Route path="/fuse/*" element={<Fuse/>}/>
            </Routes>
        </StyledContentContainer>
    )
}

export default ContentContainer

