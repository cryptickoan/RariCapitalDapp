// Rari //
import { usePool } from '../../../../context/PoolProvider'

// React //
import { useState, useRef } from 'react'

// Styles //
import './styles.css' 

// Dependencies //

import { useNavigate } from 'react-router-dom'
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


const PoolInformation = () => {   
    const { title } = usePool() 

    // Type of APY to be shown in simulation
    const [graphType, setGraphType] = useState({type: "last year", apy: "11.7"})

    // Allocation/Balance to be used in simulation
    const [ activeAllocation, setActiveAllocation ] = useState("Pool")

    // Timerange of simulation
    const [timeRange, setTimeRange] = useState("month")

    // Type of graph i.e simulation or account returns //
    const [ graph, setGraph ] = useState("simulation")

    // Go back to pool cards //
    const navigate = useNavigate()
    const backToCards = () => {
        navigate('../all')
    }

    // Sets which APY button should glow
    const [glow, setGlow] = useState("last year")


    // Used by APY button to change glow and GraphType i.e graph apy
    const setApy = (setter: any) => {
        setGlow(setter.type)
        setGraphType({type: setter.type, apy: setter.apy})
    }

    // Makes methods from pool prediction graph available here
    const toggleAllocationRef = useRef()

    // Change Allocation to pool
    const setActiveAllocationToPool = () => {
            // @ts-ignore
            toggleAllocationRef.current.togglePool()
            setActiveAllocation("Pool")      
    }

    // Change allocation to account
    const setActiveAllocationToAccount = () => {
        // @ts-ignore
        toggleAllocationRef.current.toggleAccount()
        setActiveAllocation("Account")      
    }

    // Display returns graph and info banner
    const displayReturns = () => {
        setGraph("return")
        setActiveAllocation("Account") 
    }

    // Return to simulation graph
    const displaySimulation = () => {
        setGraph("simulation")
        // @ts-ignore
        toggleAllocationRef.current.toggleAccount()
        setActiveAllocation("Pool")
    }

    return (
                <PoolInformationDiv>
                    <LeftDiv>
                        { activeAllocation === "Pool" ? <InfoCarousel /> : <UserStats timeRange={timeRange}/>}

                        <Graphs>
                            <PoolPrediction 
                                graph={graph} 
                                graphType={graphType} 
                                ref={toggleAllocationRef} 
                                activeAllocation={activeAllocation} 
                                timeRange={timeRange}
                            />
                            <GraphButtonGroup>
                                <GraphButton 
                                    name="simulation" 
                                    action={graph} 
                                    onClick={() => displaySimulation()}
                                >
                                        Simulation
                                </GraphButton>
                                <GraphButton 
                                    name="return" 
                                    action={graph} 
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
                        { graph === "simulation" ?
                            <PoolAPY pool={title} type="current block" setApy={setApy} glow={glow}>
                                <p>Current</p>
                            </PoolAPY>
                        :
                            <Button active={timeRange} types="week" onClick={() => setTimeRange("week")}>Week</Button>
                        }
                        <Sides>
                        {graph === "simulation" ? 
                            <>
                            <PoolAPY pool={title} type="last week" setApy={setApy} glow={glow}>
                            <p>Week</p>
                            </PoolAPY>
 
                            <PoolAPY pool={title} type="last year" setApy={setApy} glow={glow}>
                            <p>Year</p>
                            </PoolAPY>
                            </>
                        
                        :
                            <>
                            <Button active={timeRange} types="year" onClick={() => setTimeRange("year")}>Year</Button>
                            <Button active={timeRange} types="month" onClick={() => setTimeRange("month")}>Month</Button>
                            </>
                        }
                        </Sides>
                        <Button onClick={() => setActiveAllocationToPool()} active={activeAllocation} types="Pool" disabled={graph === "return"}>Pool</Button>
                        <Button onClick={() => setActiveAllocationToAccount()} active={activeAllocation} types="Account">Account</Button>
                    </PoolInfo>
                </PoolInformationDiv>
    )
}

export default PoolInformation


