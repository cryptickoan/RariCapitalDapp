// Rari SDK
import Rari from '../../../sdk/rari-sdk'

// Typing
export type State = {
    rari: Rari,
    address: string,
    isAuthed: boolean,
}

type Action =
| {
    type: "loginSetUp"
    payload: State
  } 
| {
    type: "logoutSetUp",
    payload: {
        address: string
    }
  }

// Reducer
const reducer = (state: State, action: Action): State => {
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