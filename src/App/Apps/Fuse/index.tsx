// Dependencies 
import styled from 'styled-components'
import { Routes, Route } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './FuseSinglePool/redux/reducer'

// Components
import FusePoolsDisplay from './FusePoolsDisplay'
import FuseSinglePool from './FuseSinglePool'
import { FuseContextProvider } from '../../../context/FuseProvider'

export const FuseContainer = styled.div`
    width: 80%;
    height: 100%;
    max-height: 100%;

    padding-top: 20px;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: center;
    align-items: center;
`

const Fuse = () => {
    return (
        <FuseContextProvider>
            <FuseContainer>
                    <Provider store={store}>
                        <Routes>
                            <Route path="/all" element={<FusePoolsDisplay/>}/>
                            <Route path="/:id" element={<FuseSinglePool/>}/>
                        </Routes>
                    </Provider>
            </FuseContainer>
        </FuseContextProvider>
    )
}

export default Fuse