// Rari // 
import { useRari } from '../../../context/RariProvider'
import { getPoolAPY } from '../../../context/PoolProvider'

// Dependencies //
import { useQuery } from 'react-query'
import { APYDisplayer, APY } from './styles'
import Spinner from '../Icons/Spinner'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
 
const PoolAPY = ({pool, type, children, card, setApy, glow}:any ) => {
    const { state } = useRari()
    
    // Get Pool APY //
    const {status, data: apy} = useQuery(
        type + " " + pool + " apy",() => { 
            return getPoolAPY(pool, state.rari, type)
        }
    )
    

    // setting props for displayer and apy //
    const props = {
        current: type === "current block" ? true : false,
        glow: type === glow && typeof card === "undefined" ? true : false,
        card: card ? true : false
    }

      
    if( status === 'loading') {
        return <Spinner />
    }
        
    return (
        <OverlayTrigger
            key='top'
            placement='top'
            overlay={
                <Tooltip id={`tooltip-top`}>
                APY based on <strong>{type}</strong>.
                </Tooltip>
            }
        >
            <APYDisplayer {...props} onClick={setApy ? () => setApy({type: type, apy: apy}): undefined}>
                <APY {...props} >{apy}%</APY>
                {children}
            </APYDisplayer>
        </OverlayTrigger>
    )
}

export default PoolAPY