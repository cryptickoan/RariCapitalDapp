// Dependencies
import { createStore } from "redux"
import { getCategories, getInterest } from "../../../../../utils/Chart"
import { UnstartedGraph, InitiatedGraph } from './type'

// Types
export type GraphState = UnstartedGraph | InitiatedGraph

// Initial state
const initialState: UnstartedGraph = {
    stage: "unstarted",
    graphAPY: undefined,
    timerange: undefined,
    graphType: undefined,
    allocation: undefined,
    data: undefined,
    categories: undefined
}

const reducer = (state: GraphState = initialState, action: Action): GraphState => {
    switch(action.type) {
        case "initiateDefault":
            return { ...action.data }
        case "initiateBalanceHistory":
            return { ...action.data}
        case 'changeTimeRange':
            return { ...action.data}
        default:
            return { ...initialState }
    }
}

export const graphStore = createStore(reducer)

// Actions
type Action = 
| {
    type: "initiateDefault"
    data: GraphState
}
| {
    type: 'initiateBalanceHistory'
    data: GraphState
}
| {
    type: 'changeTimeRange'
    data: GraphState
}

// Handlers
type initiateDefaultProps = Omit<InitiatedGraph, "data" | "categories" | "stage">

export const initiateDefault = ({graphAPY, timerange, graphType, allocation}: initiateDefaultProps ): Action => {
    const year = getInterest(allocation.amount, (graphAPY.apy / 100))
    const categories = getCategories()
    return {
        type: "initiateDefault",
        data: { 
            stage: 'ready',
            graphAPY: graphAPY,
            timerange: timerange,
            graphType: graphType,
            allocation: allocation,
            data: {
                name: '',
                data:  year,
            },
            categories: categories

        }
    }
}

type initiateBalanceHistoryProps = {
    state: InitiatedGraph
    balanceHistory: {}[]
}

export const initiateBalanceHistory = ({state, balanceHistory}: initiateBalanceHistoryProps): Action => {
    const categories = (balanceHistory).map((point: any) => {
            return new Date(point.timestamp * 1000).toLocaleDateString("en-US")
            }
        )
    
    const data = (balanceHistory.map((point: any) => {
        return parseFloat(point.balance) / 1e18
    }))

    return {
        type: 'initiateBalanceHistory',
        data: {...state, allocation: {type: 'account', amount: 0 }, graphType: 'balance history', categories: categories, data: {name: '', data: data }}
    }
}

type changeTimeRangeProps = {
    state: InitiatedGraph
    timeRange: InitiatedGraph["timerange"]
}

export const timerangeChange = ({state, timeRange}: changeTimeRangeProps):Action => {
    return {
        type: 'changeTimeRange',
        data: {...state, timerange: timeRange}
    }
}

