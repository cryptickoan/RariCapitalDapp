// React
import { useRef, useState, useEffect } from 'react'

// Rari //
import { useRari } from '../../../context/RariProvider'
import { Pool } from '../../../context/PoolProvider'

// Styled Components
import { SpacingContainer, StyledP,InfoBar } from '../../Shared'
import { StyledOffcanvas, ProfileImage, Address} from './styles'

// Components
import YieldAggregatorBalance from './YieldAggregatorBalance'

export function shortenAddress(address: string) {
    return (
        address.substring(0,6) + "..." + address.substring(address.length - 2, address.length)
    )
}

type SidebarProps = {
    // show ? display: flex : display: none
    show: boolean
    
    // setShow(false)
    handleClose: () => void

    // Will set modalShow to true
    handleModalShow: () => void
}

const Sidebar = ({show, handleClose, handleModalShow}: SidebarProps) => {
    const { state }= useRari()
    const renderCount = useRef(0)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        if (total > 0){
            renderCount.current++
        }
    },[total])

    
    const shortenedAddress = shortenAddress(state.address)
    return (
        <StyledOffcanvas show={show} onHide={handleClose}>
            <SpacingContainer direction="column" margin="10% 0 0 0" padding="5%">
               <SpacingContainer flexBasis="20%" direction="column">
                   <ProfileImage src={`https://avatars.dicebear.com/api/jdenticon/${shortenedAddress}.svg`} />
                    <Address onClick={handleModalShow}>
                        <span>{shortenedAddress}</span>
                    </Address> 
               </SpacingContainer>

               <SpacingContainer direction="column" justifyContent="flex-start" flexBasis="80%">
                    <StyledP size="3vh">Positions</StyledP>
                    <SpacingContainer flexBasis="5%" height="5%" margin="0 0 5% 0">
                        <InfoBar data={['Pool', 'Total', 'Growth']} width="100%" height="100%" onClick={() => null}/>
                    </SpacingContainer>
                    <SpacingContainer flexBasis="90%" direction="column" justifyContent="flex-start" margin="0 0 5% 0">
                        {Object.values(Pool).map((pool) =>
                            <YieldAggregatorBalance renderCount={renderCount.current} setTotal={setTotal} total={total} pool={pool} />
                        )}
                    </SpacingContainer>
               </SpacingContainer>

                   <h5>Net Balance: ${total.toLocaleString()}</h5>
            </SpacingContainer>
        </StyledOffcanvas>
    )
}

export default Sidebar 


