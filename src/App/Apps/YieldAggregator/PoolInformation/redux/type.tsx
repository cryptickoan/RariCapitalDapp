// Stage will tell you what the graph is doing. Between data changes, we can show a spinner.
export type Stage = 'unstarted' | 'loading' | 'ready'

// APY used
export type GraphAPY = {
    type: 'last year' | 'month' | 'week'
    apy: number
}

// Timerange of simulation
export type TimeRange = 'month' | 'year' | 'week'

// Type of graph
export type GraphType = 'simulation' | 'balance history'


// Allocation used for graph
export type Allocation = {
    type: string,
    amount: number
}

type GraphData = {
    name: string, 
    data: number[]
}

export type UnstartedGraph = {
    stage: "unstarted"
    graphAPY: undefined
    timerange: undefined
    graphType: undefined
    allocation: undefined
    data: undefined
    categories: undefined
}

export type InitiatedGraph = {
    stage: 'ready'
    graphAPY: GraphAPY
    timerange: TimeRange
    graphType: GraphType
    allocation: Allocation
    data: GraphData
    categories: string[]
}
