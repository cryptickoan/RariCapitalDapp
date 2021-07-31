// Rari //
import { usePool } from '../../../../context/PoolProvider'

// React //
import { useRef } from 'react'

// Styles //
import './styles.css' 

// Dependencies //

import { useNavigate } from 'react-router-dom'
import {  useSelector } from 'react-redux'
import { PoolInformationDiv, LeftDiv, Graphs, PoolInfo, ExitSpan, 
        PoolInfoTitle, Sides, Button, 
        GraphButton, GraphButtonGroup} from './styles'

// Components //
import PoolAPY from '../../../components/PoolAPY'
import UserStats from './UserStats'
import InfoCarousel from './InfoCarousel'
import PoolPrediction from './Graph'


// Icons //
import Exit from '../../../components/Icons/Exit'
import Logo from '../../../components/PoolIcons/Logo'
import Spinner from '../../../components/Icons/Spinner'
import { GraphState } from './redux/reducer'
import { InitiatedGraph } from './redux/type'


const PoolInformation = () => {   
    const { title } = usePool() 
    const graphState = useSelector((state: GraphState) => state)

    // Go back to pool cards //
    const navigate = useNavigate()
    const backToCards = () => {
        navigate('../all')
    }

    // Makes methods from pool prediction graph available here
    const toggleAllocationRef = useRef()

    // Change Allocation to pool
    const setActiveAllocationToPool = () => {
            // @ts-ignore
            toggleAllocationRef.current.togglePool()
    }

    // Change allocation to account
    const setActiveAllocationToAccount = () => {
        // @ts-ignore
        toggleAllocationRef.current.toggleAccount()
    }

    // Display returns graph and info banner
    const displayReturns = () => {
        //@ts-ignore
        toggleAllocationRef.current.toggleGraphToBalanceHistory()
    }

    // Return to simulation graph
    const displaySimulation = () => {
        // @ts-ignore
        toggleAllocationRef.current.toggleGraphToSimulation()
    }

    // Change timerange of balance history
    const changeTimeRange = (timeRange: InitiatedGraph["timerange"]) => {
        // @ts-ignore
        toggleAllocationRef.current.toggleBalanceHistoryTimeRange(timeRange)
    }

    return (
                <PoolInformationDiv>
                        <LeftDiv>
                            { graphState.stage === "unstarted" ? <Spinner />
                                : graphState.allocation.type === "pool" 
                                ? <InfoCarousel /> 
                                : <UserStats timeRange={graphState.timerange}/>}

                            <Graphs>
                                <PoolPrediction  ref={toggleAllocationRef}/>
                                <GraphButtonGroup>
                                     <GraphButton 
                                         name="simulation" 
                                         action={graphState.graphType} 
                                         onClick={() => displaySimulation()}
                                     >
                                             Simulation
                                     </GraphButton>
                                     <GraphButton 
                                         name="balance history" 
                                         action={graphState.graphType} 
                                         onClick={() => displayReturns() }
                                     >
                                         Returns
                                     </GraphButton>
                                 </GraphButtonGroup>
                            </Graphs>
                        </LeftDiv>
                    <PoolInfo>
                        <ExitSpan>
                            <Exit className="infoExit" onClick={backToCards}/>
                        </ExitSpan>
                        <Logo pool={title} className="poolInfoLogo"/>
                        <PoolInfoTitle>APY</PoolInfoTitle>
                        { graphState.graphType === "simulation" ?
                            <PoolAPY pool={title} type="current block">
                                <p>Current</p>
                            </PoolAPY>
                        :
                            <Button active={graphState.timerange} types="week" onClick={() => changeTimeRange("week")}>Week</Button>
                        }
                        <Sides>
                        {graphState.graphType === "simulation" ? 
                            <>
                            <PoolAPY pool={title} type="last week">
                            <p>Week</p>
                            </PoolAPY>
 
                            <PoolAPY pool={title} type="last year">
                            <p>Year</p>
                            </PoolAPY>
                            </>
                        
                        :
                            <>
                            <Button active={graphState.timerange} types="year" onClick={() => changeTimeRange("year")}>Year</Button>
                            <Button active={graphState.timerange} types="month" onClick={() => changeTimeRange("month")}>Month</Button>
                            </>
                        }
                        </Sides>
                        { graphState.stage === "unstarted" ? <Spinner /> :
                        <>
                        <Button onClick={() => setActiveAllocationToPool()} active={graphState.allocation.type} types="pool" disabled={graphState.graphType === "balance history"}>Pool</Button>
                        <Button onClick={() => setActiveAllocationToAccount()} active={graphState.allocation.type} types="account">Account</Button>
                        </>
                        }   
                    </PoolInfo>
                </PoolInformationDiv>
    )
}

export default PoolInformation


