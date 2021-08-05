import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

type Info = {
    // APY or APR depending on the action a user is taking
    apy:number

    // Tokens URL for their icon
    icon?: string

    // Token symbol
    token: string

    // Lending or Borrowing
    action: string
}

type Display = Info & {
    // Has user supplied anything at all?
    membership: boolean

    // APR
    apr: number

    // pools Comptroller 
    comptroller: string

    // Balances
    supplyBalanceUSD: number
    borrowBalanceUSD: number
}

// Key can be a token symbol, or display. 
// If display is present it means user is trying to deposit/withdraw/stake
// In any case all keys will hold tokens general info.
// If display then it'll hold all necessary info to generate the DepositWithdraw action section/component
export type GraphState =  {
    [name: string]: Info | Display
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
            data: Display
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


type UpdateDisplayProps = Display

// When this is triggered, the button from where it was triggered will send token and action (deposit/withdraw). 
export const updateDisplay = ({apy, token, action, membership, apr, supplyBalanceUSD, borrowBalanceUSD, comptroller }: UpdateDisplayProps): Action => {
    return {
        type: "updateDisplay",
        data: {
                token: token,
                action: action,
                apy: apy,
                apr: apr,
                membership: membership,
                supplyBalanceUSD: supplyBalanceUSD,
                borrowBalanceUSD: borrowBalanceUSD,
                comptroller: comptroller
            }
    }
}

type UpdateGraphProps = Info

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


export const store = createStore(reducer, composeWithDevTools())