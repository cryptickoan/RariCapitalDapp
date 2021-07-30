// Rari //
import { PoolContextProvider, Pool } from '../../../context/PoolProvider'

// Dependencies //
import styled from 'styled-components'
import { Routes, Route } from 'react-router-dom'

// Components //
import PoolCard from './PoolCard'
import PoolInformation from './PoolInformation'
import { Provider } from 'react-redux'
import { graphStore } from './PoolInformation/redux/reducer'

const PoolDisplayContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`

const YieldAggregator = () => {
    return (
        <PoolDisplayContainer>
            <Provider store={graphStore}>
                <Routes>
                    <Route path="/all" element={<PoolCards/>}/>
                    {
                        Object.values(Pool).map(pool => 
                            <Route key={pool} path={pool} element={<PoolsContextProvisioner pool={pool}/>}/>
                        )
                    }
                </Routes>
            </Provider>
        </PoolDisplayContainer>
    )
}

export default YieldAggregator

const PoolCards = () => {
    return ( 
        <>
        {Object.values(Pool).map(pool => 
            <PoolContextProvider key={pool} pool={pool}>
                <PoolCard/>
            </PoolContextProvider>
        )}
        </>
    )
}

const PoolsContextProvisioner = ({pool}: any) => {

    return (
        <PoolContextProvider pool={pool} >
            <PoolInformation/>
        </PoolContextProvider>
    )
}