// Rari SDK
import Rari from '../../../sdk/rari-sdk'

// Typing
export type RariState = {
    rari: Rari,
    address: string,
    isAuthed: boolean,
    error?: {
        description: string
    }
}

type Action =
| {
    type: "loginSetUp"
    payload: RariState
  } 
| {
    type: "logoutSetUp",
    payload: {
        address: string
    }
  }
| {
    type: "error",
    payload: {
        description: string
    }
}

// Reducer
const reducer = (state: RariState, action: Action): RariState => {
    switch (action.type) {
        case "loginSetUp":
            return {
                ...state,
                rari: action.payload.rari,
                address: action.payload.address,
                isAuthed: action.payload.isAuthed,
            }
        case "logoutSetUp":
            return {
                ...state,
                address: action.payload.address,
                isAuthed: false
            }
        case "error": 
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}
export default reducer


// Handlers 
export const loginSetUp = (rari: Rari, address: string): Action => {
    return {
        type: "loginSetUp",
        payload: {
            rari: rari,
            address: address,
            isAuthed: true,
        }
    }
}

export const logOutSetUp = (EmptyAddress: string): Action => {
    return {
        type: "logoutSetUp",
        payload: {
            address: EmptyAddress
        }
    }
}

export const errorSetUp = (error: string): Action => {
    return {
        type: "error",
        payload: {
            description: error
        }
    }
}