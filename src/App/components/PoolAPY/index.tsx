// Rari // 
import { useRari } from '../../../context/RariProvider'
import { getPoolAPY } from '../../../context/PoolProvider'


// Dependencies //
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { APYDisplayer, APY } from './styles'
import Spinner from '../Icons/Spinner'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { initiateDefault, GraphState } from '../../Apps/YieldAggregator/PoolInformation/redux/reducer'
 
const PoolAPY = ({pool, type, children, card}:any ) => {
    const { state } = useRari()
    const graphState = useSelector((state: GraphState) => state)
    const dispatch = useDispatch()
    
    // Get Pool APY //
    const {data: apy} = useQuery(
        type + " " + pool + " apy",() => { 
            return getPoolAPY(pool, state.rari, type)
        }
    )

    // setting props for displayer and apy //
    const props = {
        current: type === "current block" ? true : false,
        glow: graphState.graphAPY?.type === type && typeof card === "undefined" ? true : false,
        card: card ? true : false
    }

      
    if( typeof apy === 'undefined' || graphState.stage !== 'ready') {
        return <Spinner />
    }

    const handleClick = () => {
        dispatch(initiateDefault({...graphState, graphAPY: {type: type, apy: parseInt(apy)}}))
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
            <APYDisplayer {...props} onClick={handleClick}>
                <APY {...props} >{apy}%</APY>
                {children}
            </APYDisplayer>
        </OverlayTrigger>
    )
}

export default PoolAPY