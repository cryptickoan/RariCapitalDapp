import { createStore } from 'redux'

type UpdateGraphProps = {
    token: string
    apy:number
    icon?: string
    action: string
}

type UpdateDisplayProps = {
    token: string
    action: string
    apy: number
}

type Info = {
    apy:number
    icon?: string
    token: string
    action: string
    number?: number
}

// Key can be a token symbol, or display. 
// If display is present it means user is trying to deposit/withdraw/stake
// In any case all keys will hold tokens general info.
export type GraphState =  {
    [name: string]: Info
}


// Update graph means user is using simulation with a new token
// Update display means user wants to deposit/withdraw or stake
type Action = 
    |   {
            type: "updateGraph",
            token: string,
            actionType: string,
            data: Info
        }
    |   {
            type: "updateDisplay",
            data: Info
        }
    |   {
            type: "reset",
            data: GraphState
        }


const reducer = (state:GraphState = {}, action: Action): GraphState | {} => {
    switch (action.type) {
        case "updateGraph":
            if (Object.keys(state).length > 3) {
                const newState = state
                delete newState[(Object.keys(newState)[0])]
                return {...newState, [(action.token + action.actionType)]: action.data }
            }
            return {...state, [(action.token + action.actionType)]: action.data}
        case "updateDisplay":
            return {...state, display: action.data}
        case "reset":
            return action.data
        default: return state
    }
}


// When this is triggered, the button from where it was triggered will send token and action (deposit/withdraw). 
export const updateDisplay = ({apy, token, action}: UpdateDisplayProps): Action => {
    return {
        type: "updateDisplay",
        data: {
                token: token,
                action: action,
                apy: apy
            }
    }
}

// When this is triggered, a new token is added for graph simulation
export const updateGraph = ({token, apy, icon, action}: UpdateGraphProps): Action => {
        return {
                type: "updateGraph",
                token: token,
                actionType: action,
                data: {apy: apy, icon: icon, token: token, action: action}
        }
}

// Triggered only whenever user changes to another pool (i.e. from 18 to 5)
export const resetGraph = (): Action => {
    return {
        type: "reset",
        data: {}
    }
}


export const store = createStore(reducer)