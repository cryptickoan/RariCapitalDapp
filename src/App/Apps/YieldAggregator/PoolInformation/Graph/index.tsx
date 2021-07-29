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
    const { data: tokenAllocation} = useQuery(title + " pool token allocation", async () => {
        const allocation: ({[key: string]: number}) = await getTokenAllocation(title, state.rari)
        return allocation
    })

    let address = "0x29c89a6cb342756e63a6c78d21adda6290eb5cb1"
    // let address = "0x29683db5189644d8c4679b801af5c67e6769ecef"
    
    const { data: accountAllocation } = useQuery(title + " pool account allocation", async () => {
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


    const { data: balanceHistory } = useQuery(address + " " + title + " " + props.timeRange + " balance history",
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
                    <Type>Balance history from last {props.timeRange}</Type>
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

export default PoolPrediction

