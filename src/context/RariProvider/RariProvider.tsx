// Rari SDK //
import Rari from "../../sdk/rari-sdk/index"

// React //
import { createContext, ReactNode, useContext, 
         useCallback, useEffect, useMemo, useReducer } from "react"

// Dependencies //
import { chooseBestWeb3Provider } from "../../utils/web3Providers"
import launchModalLazy from "./lib/launchModalLazy"

// RariContextProvider state, reducer and handlers // 
import reducer, { State, loginSetUp, logOutSetUp } from './lib/RariState'

// Typing
export interface RariContextData {
  state: State;
  login: () => Promise<any>;
  logout: () => any;
}

// RariContext creation
export const RariContext = createContext<RariContextData | undefined>(undefined)

// Initial State for RariState
const EmptyAddress = "0x0000000000000000000000000000000000000000";
const initialState = {rari: new Rari(chooseBestWeb3Provider()),  address: EmptyAddress, isAuthed: false}

export const RariContextProvider = ({children}: {children: ReactNode}) => {
  
    // Initiating RariState with initialState. state: {rari, address, isAuthed}
    const [state, dispatch] = useReducer(reducer, initialState)

    // New rari instance once connected
    const setRariAndAddressFromModal = useCallback(
      async (modalProvider: any) => {
        const rariInstance = new Rari(modalProvider)

        const addresses = await rariInstance.web3.eth.getAccounts()
        const address = addresses[0]

        dispatch(loginSetUp(rariInstance, address))
      },[])

    // Connect by calling Web3Modal
    const login = useCallback( async () => {
        try {
            const provider = await launchModalLazy()
            setRariAndAddressFromModal(provider)
        } catch (err) {
            console.log(err)
        }
    },[setRariAndAddressFromModal])


    // Disconnect by removing cached provider
    const logout = useCallback( () => {
      localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER")
      dispatch(logOutSetUp(EmptyAddress))
    },[])

    // Auto connect if cached provider
    useEffect(() => {
      if(localStorage.WEB3_CONNECT_CACHED_PROVIDER) {
        login()
      }
    },[login])

    // Value changes whenever state does, or when either login/logout are called
    const value = useMemo(() => 
    ({
        state, // Rari Instance, address, isAuthed
        login, // Func
        logout, // Func
    }),[state, login,logout])

    return (
        <RariContext.Provider value={value}>{children}</RariContext.Provider>
    )
}

export function useRari() {
    const context = useContext(RariContext);
  
    if (context === undefined) {
      throw new Error(`useRari must be used within a RariProvider`);
    }
  
    return context;
  }