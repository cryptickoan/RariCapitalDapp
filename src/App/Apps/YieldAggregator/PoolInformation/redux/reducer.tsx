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

// InitiateDefault will receive all necessary info to start or modify the simulation graph. 
// As props it only receives what is needed to generate all data used in the graph i.e data and categories.

// Known Bug:
// First call uses artificial apy. If user changes between 
// account allocation and pool allocation without playing with APY, the initial artificial apy 
// will be used to generate data. 
// I'm thinking redux can do all data requests to avoid this issue.

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


// initiateBalanceHistory will receive necesarry data to generate graph. 
// i.e data and categories
type initiateBalanceHistoryProps = {
    state: InitiatedGraph
    balanceHistory: {
        categories: string[], 
        data: number[]
    }
}

export const initiateBalanceHistory = ({state, balanceHistory}: initiateBalanceHistoryProps): Action => {
    return {
        type: 'initiateBalanceHistory',
        data: {...state, allocation: {type: 'account', amount: 0 }, graphType: 'balance history', categories: balanceHistory.categories, data: {name: '', data: balanceHistory.data }}
    }
}

type changeTimeRangeProps = {
    state: InitiatedGraph
    timeRange: InitiatedGraph["timerange"]
    balanceHistory: {
        categories: string[], 
        data: number[]
    }
}

export const timerangeChange = ({state, timeRange, balanceHistory}: changeTimeRangeProps):Action => {
    return {
        type: 'changeTimeRange',
        data: {...state, timerange: timeRange, categories: balanceHistory.categories, data: {name: '', data: balanceHistory.data } }
    }
}

