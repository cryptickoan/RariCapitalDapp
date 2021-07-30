// Rari //
import { useRari } from '../../../../../context/RariProvider'
import { usePool, getTokenAllocation, getBalanceHistory, getAccountBalance } from '../../../../../context/PoolProvider'

// React
import React, { useEffect, useState, useImperativeHandle} from 'react'

// Dependencies 
import { useQuery } from 'react-query'
import { Type } from '../../../../components/Bar/styles'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

// Icons
import Spinner from '../../../../components/Icons/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { initiateDefault, GraphState, initiateBalanceHistory, timerangeChange } from '../redux/reducer'
import { InitiatedGraph } from '../redux/type'

const blocksPerDay = 6500;

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

export const getYear = (tvl: number, apy: number): any => {
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

    const graphState = useSelector((state: GraphState) => state)
    const dispatch = useDispatch()
    console.log(graphState)
    
    // Get data. Total token allocation and account allocation //
    const { data: tokenAllocation} = useQuery(title + " pool token allocation", async () => {
        const allocation: ({[key: string]: number}) = await getTokenAllocation(title, state.rari)
        return allocation
    })

    // TO BE REMOVED
    let address = "0x29c89a6cb342756e63a6c78d21adda6290eb5cb1"
    // let address = "0x29683db5189644d8c4679b801af5c67e6769ecef"
    
    const { data: accountAllocation } = useQuery(title + " pool account allocation", async () => {
        const allocation = await getAccountBalance(title, state.rari, address)
        return allocation
    })

    // After token allocation is fetched, set default for graph //
    useEffect(() => {
        if(typeof tokenAllocation !== "undefined") {
            dispatch(initiateDefault({
              graphAPY: {type: 'last year', apy: 11.7  },
              timerange: "year",
              graphType: "simulation",
              allocation: {
                type: "pool",
                amount: tokenAllocation.total, 
              }
            }))
          }
    }, [tokenAllocation, dispatch])

    const { data: balanceHistory } = useQuery(address + " " + title + " " + graphState.timerange + " balance history",
    async() => {
        const latestBlock = await state.rari.web3.eth.getBlockNumber()
        console.log(latestBlock)
        
        const blockStart =
            props.timeRange === "month"
            ? latestBlock - blocksPerDay * 31
            : props.timeRange === "year"
            ? latestBlock - blocksPerDay * 365
            : props.timeRange === "week"
            ? latestBlock - blocksPerDay * 10
            : 0;

        const balance = await getBalanceHistory( title, state.rari, address, blockStart)
        return balance
        }
    )

    // Toggle between allocation to be used (account, total in pool) //
    const togglePool = () => {
            if (typeof tokenAllocation !== "undefined" && graphState.stage === 'ready') {
                dispatch(initiateDefault({...graphState, allocation: {type: "pool", amount: tokenAllocation.total} }))
            } 
            else return
    }

    const toggleAccount = () => {
        if (typeof accountAllocation !== "undefined" && graphState.stage === 'ready') {
            dispatch(initiateDefault({...graphState, allocation: {type: "account", amount: accountAllocation} }))
        }
        else return
    }

    const toggleGraphToBalanceHistory = () => {
        if (typeof balanceHistory !== 'undefined' && graphState.stage === 'ready'){
          dispatch(initiateBalanceHistory({state: graphState, balanceHistory: balanceHistory}) ) 
        }
    }

    const toggleBalanceHistoryTimeRange = (timerange: InitiatedGraph["timerange"]) => {
      if (graphState.stage === 'ready') {
        dispatch(timerangeChange({state: graphState, timeRange: timerange}))
      }
    }

    const toggleGraphToSimulation = () => {
      if (typeof tokenAllocation !== 'undefined' && graphState.stage === 'ready'){
        dispatch(initiateDefault({...graphState, graphType: 'simulation', allocation: {type: "pool", amount: tokenAllocation.total} }))
      }
    }

    // Make methods available to components uptree //
    useImperativeHandle(ref, () => ({togglePool, toggleAccount, toggleGraphToSimulation, toggleGraphToBalanceHistory, toggleBalanceHistoryTimeRange}))
    
    if (typeof tokenAllocation === "undefined" || typeof accountAllocation === "undefined" || graphState.stage !== 'ready' || !graphState.data ) {
        return <Spinner />
    }

        return (
            <> 
                { graphState.graphType === "simulation" ?
                    <Type>Simulation with <strong>{graphState.graphAPY.type}'s APY</strong> using <strong>{graphState.allocation.type}'s</strong> balance over next year</Type>
                    : 
                    <Type>Balance history from last {graphState.timerange}</Type>
                }
                <Chart options={{...LineChartOptions,
                        xaxis:{
                          type: "category",
                          categories: graphState.categories
                        } }} 
                        series={[graphState.data]} 
                        type="line" 
                        height={275} 
                        width={770}/>
                
            </>
        )
    }

)

export default PoolPrediction

