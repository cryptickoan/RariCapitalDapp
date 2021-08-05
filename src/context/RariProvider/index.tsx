// Rari SDK //
import Rari from "../../sdk/rari-sdk/index"
import Fuse from "../../sdk/fuse-sdk/src"

// React //
import { createContext, ReactNode, useContext, 
         useCallback, useEffect, useMemo, useReducer } from "react"

// Dependencies //
import { chooseBestWeb3Provider, initFuseWithProviders } from "../../utils/web3Providers"
import launchModalLazy from "./utils/launchModalLazy"

// RariContextProvider state, reducer and handlers // 
import reducer, { RariState, loginSetUp, logOutSetUp, errorSetUp } from './utils/RariState'

// Typing
export interface RariContextData {
  state: RariState;
  login: () => Promise<any>;
  logout: () => any;
}

// RariContext creation
export const RariContext = createContext<RariContextData | undefined>(undefined)

// Initial State for RariState
// 0x29c89a6cb342756e63a6c78d21adda6290eb5cb1
const EmptyAddress = "0x0000000000000000000000000000000000000000";
const initialState = {rari: new Rari(chooseBestWeb3Provider()), fuse: initFuseWithProviders(),  address: EmptyAddress, isAuthed: false}

export const RariContextProvider = ({children}: {children: ReactNode}) => {
  
    // Initiating RariState with initialState. state: {rari, address, isAuthed}
    const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
      Promise.all([state.rari.web3.eth.net.getId(), state.rari.web3.eth.getChainId()]).then(
        ([netId, chainId]) => {
          console.log("Network ID: " + netId, "Chain ID: " + chainId);

          if (netId !== 1 || chainId !== 1) {
            dispatch(errorSetUp('Wrong network! Switch to mainnet and refresh please.'))
          }
        }
      )
  }, [state])

    // New rari instance once connected
    const setRariAndAddressFromModal = useCallback(
      async (modalProvider: any) => {
        const rariInstance = new Rari(chooseBestWeb3Provider())
        const fuseInstance = new Fuse(modalProvider)

        // const addresses = await rariInstance.web3.eth.getAccounts()
        const address = "0x907206d1fb31aeb9e36fdc98ce09f5b088be56bf"
        // addresses[0]

        dispatch(loginSetUp(rariInstance, fuseInstance, address))
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
        state, // Rari Instance, Fuse Instance, address, isAuthed
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