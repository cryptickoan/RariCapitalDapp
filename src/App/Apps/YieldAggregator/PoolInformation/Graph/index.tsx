// Rari //
import { useRari } from '../../../../../context/RariProvider'
import { usePool, getTokenAllocation, getAccountBalance } from '../../../../../context/PoolProvider'

// React
import React, { useEffect, useImperativeHandle} from 'react'

// React Query
import { useQuery } from 'react-query'

// React ApexCharts
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

// Hooks
import useBalanceHistory from '../../../../../hooks/YieldAggregator/useBalanceHistory'

// Styled Components
import { Type } from '../../../../Shared/Bar/styles'

// Icons
import Spinner from '../../../../Shared/Icons/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { initiateDefault, GraphState, initiateBalanceHistory, timerangeChange } from '../redux/reducer'
import { InitiatedGraph } from '../redux/type'


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

const PoolPrediction = React.forwardRef((props, ref: any) => {
    // Rari //
    const { title } = usePool()
    const { state } = useRari()

    // Graph state
    const graphState = useSelector((state: GraphState) => state)
    const dispatch = useDispatch()
     
    // Fetch Data
    // Get Balance history, tokenAllocation and account balace/allocation
    const [{data: monthBalance}, {data: yearBalance }, {data: weekBalance}] = useBalanceHistory(state.address, title, ["month", "year", "week"], state)
    
    const { data: tokenAllocation} = useQuery(title + " pool token allocation", async () => {
        const allocation: ({[key: string]: number}) = await getTokenAllocation(title, state.rari)
        return allocation
    })

    const { data: accountAllocation } = useQuery(title + " pool account allocation", async () => {
      console.log('account allocation')
        const allocation = await getAccountBalance(title, state.rari, state.address)
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

    // Handlers
    // Toggle between allocation to be used (account, total in pool) //
    const togglePool = () => {
            if (typeof tokenAllocation !== "undefined" && graphState.stage === 'ready' && graphState.allocation?.type === 'account') {
                dispatch(initiateDefault({...graphState, allocation: {type: "pool", amount: tokenAllocation.total} }))
            } 
            else return
    }

    const toggleAccount = () => {
        if (typeof accountAllocation !== "undefined" && graphState.stage === 'ready' && graphState.allocation?.type === 'pool') {
            dispatch(initiateDefault({...graphState, allocation: {type: "account", amount: accountAllocation} }))
        }
        else return
    }

    // Change graph from simulation to balance history
    const toggleGraphToBalanceHistory = () => {
         if (typeof monthBalance !== 'undefined' && graphState.graphType === 'simulation'){
           dispatch(initiateBalanceHistory({state: graphState, balanceHistory: monthBalance}) ) 
         }
     }

    // Change balance history range
    const toggleBalanceHistoryTimeRange = (timerange: InitiatedGraph["timerange"]) => {
      if (graphState.graphType === 'balance history') {
        const balance = timerange === 'week' ? weekBalance : timerange === 'month' ? monthBalance : yearBalance
        dispatch(timerangeChange({state: graphState, timeRange: timerange, balanceHistory: balance}))
      }
    }

    // Change graph from balance to simulation
    const toggleGraphToSimulation = () => {
      if (typeof tokenAllocation !== 'undefined' && graphState.graphType === 'balance history'){
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

