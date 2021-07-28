// Rari //
import { useRari } from '../../../../context/RariProvider'
import { usePool, getTokenAllocation, getPoolAllocation, getBalanceHistory, getAccountBalance } from '../../../../context/PoolProvider'

// React //
import React, { useEffect, useState, useRef, useImperativeHandle} from 'react'

// Styles //
import './styles.css' 

// Dependencies //
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'
import { PoolInformationDiv, LeftDiv, Graphs, PoolInfo, ExitSpan, 
        PoolInfoTitle, Sides, Button, StyledCarousel, 
        GraphButton, GraphButtonGroup} from './styles'
import { Type } from '../../../components/Bar/styles'
import { Banner } from '../../../components/index'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

// Components //
import PoolAPY from '../../../components/PoolAPY'
import UserStats from './UserStats'
import InfoPair from '../../../components/index'


// Icons //
import Open from '../../../components/Icons/Open'
import Exit from '../../../components/Icons/Exit'
import Logo from '../../../components/PoolIcons/Logo'
import Bar from '../../../components/Bar'
import Spinner from '../../../components/Icons/Spinner'

const blocksPerDay = 6500;

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

const InfoCarousel = () => {

    // Get Rari //
    const { title } = usePool()
    const { state } = useRari()

    // Get Data //
    const {status, data: tokenAllocation} = useQuery(title + "token allocation", async () => {
        const allocation: ({[key: string]: number}) = await getTokenAllocation(title, state.rari)
        return allocation
    })

    const {status: poolStat, data: poolAllocation} = useQuery(title + "pool allocation", async () => {
        const allocation: ({[key: string]: number})= await getPoolAllocation(title, state.rari)
        return allocation
    })

    if (status === 'loading' || !tokenAllocation || poolStat === 'loading' || !poolAllocation) {
        return <Spinner />
    }  

    let total = tokenAllocation.total
    

    return (
        
            <Banner carousel>
                <StyledCarousel 
                    indicators={false} 
                    interval={5000} 
                    nextIcon={<Open setOpen={() => null} className="carouselNext" />} 
                    prevIcon={<Open setOpen={() => null} className="carouselPrev"/>}
                >
                    <Carousel.Item>
                        <InfoPair 
                            direction="column" 
                            width="100%"
                            justifyContent="center"
                            numberSize="35px"
                            number={`$${total.toLocaleString()}`}
                            glow={true}
                            altSize="15px"
                            alt="total funds in pool"
                            main="45px"
                            secondary="10px"
                            />
                    </Carousel.Item>
                    <Carousel.Item>
                        <Bar tokenAllocation={tokenAllocation} type={"token"}/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Bar tokenAllocation={poolAllocation} type={"strategy"}/>
                    </Carousel.Item>
                </StyledCarousel>
            </Banner>
    )
}

export const LineChartOptions: ApexOptions = {  
    chart: {
      foreColor: "gray",
      animations: {
        enabled: false,
      },
  
      dropShadow: {
        // This looks nice, try it!
        enabled: false,
      },
  
      toolbar: {
        show: false,
      },
  
      selection: {
        enabled: false,
      },
  
      zoom: {
        enabled: false,
      },
    },
  
    stroke: {
      curve: "smooth",
    },
  
    colors: ["#7D9372", "#7D9372", "#7D9372"],
  
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
  
    dataLabels: {
      enabled: false,
      },
  
    legend: {
      position: "top",
      horizontalAlign: "left",
      showForSingleSeries: false,
    },
  
    yaxis: {
      labels: {
        style: {
          fontSize: "11px",
          fontFamily: "Orbitron"
        },
        formatter: function (value) {
            return "$" + value.toLocaleString();
          }
      },
    },

    xaxis: {
        labels: {
            style: {
                fontSize: "15px",
                fontFamily: "neuropol-nova"
            },
        }
    },

    tooltip: {
        style: {
            fontFamily: "Orbitron"
        }
    }


};

const getYear = (tvl: number, apy: number): any => {
    const monthlyInterest = Math.trunc(tvl) * (apy / 12)
    const now = new Date()
    const month = now.getMonth()

    let year = [{x: new Date(0, month).toLocaleString('en-US',  {month: 'long'}), y: Math.trunc(tvl)}]

    for (let i = 1; i < 12; i++ ) {
        const months = month + i > 11 ? (month - i) * -1 : month + i
        const date = new Date(0, months).toLocaleString('en-US', {month: 'long'})
        year.push({x: date.slice(0, 3), y: Math.trunc(year[i-1].y + monthlyInterest)})
    }
    return year
}

const PoolPrediction = React.forwardRef((props:any, ref: any) => {
    // Rari //
    const { title } = usePool()
    const { state } = useRari()

    // Balance used for simulation i.e token/pool or account's, after fetching data useEffect is triggered and this will default to pool's balance//
    const [allocation, setAllocation] = useState(0)
    
    // Get data. Total token allocation and account allocation //
    const { data: tokenAllocation} = useQuery(title + "token allocation", async () => {
        const allocation: ({[key: string]: number}) = await getTokenAllocation(title, state.rari)
        return allocation
    })

    let address = "0xc262ae1cca7684c52f6d430862083eabfbbbec93"
    const { data: accountAllocation } = useQuery(title + "account allocation", async () => {
        const allocation = await getAccountBalance(title, state.rari, address)
        return allocation
    })

    // After token allocation is fetched, set default for graph //
    useEffect(() => {
        if(typeof tokenAllocation !== "undefined") {
            setAllocation(tokenAllocation.total)
        }
    }, [tokenAllocation])


    // Toggle between allocation to be used (account, total in pool) //
    const togglePool = () => {
            if (typeof tokenAllocation !== "undefined") {
                setAllocation(tokenAllocation.total) 
            } 
            else return
    }

    const toggleAccount = () => {
        if (typeof accountAllocation !== "undefined") {
            setAllocation(accountAllocation)
        }
        else return
    }

    // Make methods available to components uptree //
    useImperativeHandle(ref, () => ({togglePool, toggleAccount}))


    const { data: balanceHistory } = useQuery(address + " " + title + " " + props.timeRange + "balance history",
        async() => {
            const latestBlock = await state.rari.web3.eth.getBlockNumber()
            
            const blockStart =
                props.timeRange === "month"
                ? latestBlock - blocksPerDay * 31
                : props.timeRange === "year"
                ? latestBlock - blocksPerDay * 365
                : props.timeRange === "week"
                ? latestBlock - blocksPerDay * 7
                : 0;

            const balance = await getBalanceHistory( title, state.rari, address, blockStart)
            return balance
            }
    )

    if (balanceHistory) {
        console.log(balanceHistory.map((point: any) => { 
            return {
                        x: new Date(point.timestamp * 1000).toLocaleDateString("en"),
                        y: parseFloat(point.balance) / 1e18
                    }}))
    }



    // Info used for the graph //
    const [info, setInfo] = useState<number[]>([])

    // Generate data based on type of graph (i.e returns, simulation), 
    // balance (i.e account, total in pool) and, if simulation, 
    // type of apy (i.e last year, month, current), then set it to info

    useEffect(() => {
        if (props.graph === "return" && typeof balanceHistory !== "undefined") {
            const chartData = (balanceHistory).map((point: any) => {
                return {
                    x: new Date(point.timestamp * 1000).toLocaleDateString("en-US"),
                    y: parseFloat(point.balance) / 1e18
                }
            })
            setInfo(chartData)
        } else setInfo(getYear(allocation, (props.graphType.apy / 100)))
    },[props.graph, props.graphType.apy, allocation, balanceHistory])

    
    if (typeof tokenAllocation === "undefined" || typeof accountAllocation === "undefined") {
        return <Spinner />
    }

        return (
            <>
                { props.graph === "simulation" ?
                    <Type>Simulation with <strong>{ props.graphType ? props.graphType.type : ""}'s APY</strong> using <strong>{props.activeAllocation}'s</strong> balance over next year</Type>
                    : 
                    <Type>Returns from last {props.timeRange}</Type>
                }
                <Chart options={{...LineChartOptions }} 
                        series={[{name: ``, data: info}]} 
                        type="line" 
                        height={275} 
                        width={770}/>
                
            </>
        )
    }

)

