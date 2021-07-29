import { createStore } from 'redux'

type UpdateGraphProps = {
    token: string
    apy:number
    icon?: string
    action: string
}

type UpdateNumberProps = {
    token: string
    action: string
    number: number
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

export type GraphState =  {
    [name: string]: Info
}

type Action = 
    |   {
            type: "updateState",
            token: string,
            actionType: string,
            data: Info
        }
    |   {
        type: "updateDisplay",
        data: Info
    }
    |   {
            type: "updateNumber",
            token: string,
            action: string,
            number: number
    }
    |   {
            type: "reset",
            data: GraphState
        }


const reducer = (state:GraphState = {}, action: Action): GraphState | {} => {
    switch (action.type) {
        case "updateState":
            if (Object.keys(state).length > 3) {
                const newState = state
                delete newState[(Object.keys(newState)[0])]
                return {...newState, [(action.token + action.actionType)]: action.data }
            }
            return {...state, [(action.token + action.actionType)]: action.data}
        case "updateNumber": 
            return {...state, 
                        [(action.token + action.action)]: {
                            ...state[(action.token+action.action)], 
                            number: action.number
                        }
                    }
        case "updateDisplay":
            return {...state, display: action.data}
        case "reset":
            return action.data
        default: return state
    }
}

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

export const updateNumber = ({token, action, number}: UpdateNumberProps ): Action => {
    return {
        type: "updateNumber",
        token: token,
        action: action,
        number: number
    }
}

export const updateGraph = ({token, apy, icon, action}: UpdateGraphProps): Action => {
        return {
                type: "updateState",
                token: token,
                actionType: action,
                data: {apy: apy, icon: icon, token: token, action: action}
        }
}

export const resetGraph = (): Action => {
    return {
        type: "reset",
        data: {}
    }
}


export const store = createStore(reducer)