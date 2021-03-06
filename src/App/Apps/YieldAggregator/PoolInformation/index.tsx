// Rari //
import { usePool } from '../../../../context/PoolProvider'
import { useRari } from '../../../../context/RariProvider'

// React //
import { useRef } from 'react'

// Styles //
import './styles.css' 

// React Router
import { useNavigate } from 'react-router-dom'

// Redux
import {  useSelector } from 'react-redux'
import { GraphState } from './redux/reducer'
import { InitiatedGraph } from './redux/type'

// Styled Components
import { Graphs, Button, 
        GraphButton, GraphButtonGroup} from './styles'
import { SpacingContainer, StyledP } from '../../../Shared'

// Components //
import PoolAPY from '../../../Shared/PoolAPY'
import UserStats from './UserStats'
import InfoCarousel from './InfoCarousel'
import PoolPrediction from './Graph'

// Icons //
import Exit from '../../../Shared/Icons/Exit'
import Logo from '../../../Shared/PoolIcons/Logo'
import Spinner from '../../../Shared/Icons/Spinner'


const PoolInformation = () => {   
    const { title } = usePool() 
    const graphState = useSelector((state: GraphState) => state)
    const { state, login } = useRari()

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
                <SpacingContainer width="80%" height="96%" justifyContent="space-between">
                        <SpacingContainer justifyContent='space-around' direction="column">
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
                                         onClick={state.isAuthed ? () => displayReturns() : () => login()}
                                     >
                                         Balance History
                                     </GraphButton>
                                 </GraphButtonGroup>
                            </Graphs>
                        </SpacingContainer>
                    <SpacingContainer flexBasis="10%" direction="column" justifyContent="space-evenly">
                        <SpacingContainer flexBasis="5%" justifyContent="flex-end" cursor="pointer">
                            <Exit className="infoExit" onClick={backToCards}/>
                        </SpacingContainer>
                        <Logo pool={title} className="poolInfoLogo"/>
                        <StyledP size="25px">APY</StyledP>
                        { graphState.graphType === "simulation" ?
                            <PoolAPY pool={title} type="current block">
                                <p>Current</p>
                            </PoolAPY>
                        :
                            <Button active={graphState.timerange} types="week" onClick={() => changeTimeRange("week")}>Week</Button>
                        }
                        <SpacingContainer height="15%">
                        {graphState.graphType === "simulation" ? 
                            <>
                            <PoolAPY pool={title} type="last week" >
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
                        </SpacingContainer>
                        { graphState.stage === "unstarted" ? <Spinner /> :
                        <>
                        <Button onClick={() => setActiveAllocationToPool()} active={graphState.allocation.type} types="pool" disabled={graphState.graphType === "balance history"}>Pool</Button>
                        <Button onClick={state.isAuthed ? () => setActiveAllocationToAccount() : () => login()} active={graphState.allocation.type} types="account">Account</Button>
                        </>
                        }   
                    </SpacingContainer>
                </SpacingContainer>
    )
}

export default PoolInformation


