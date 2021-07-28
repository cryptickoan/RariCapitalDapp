// Rari //
import { useRari } from '../../../../context/RariProvider'

// Dependencies
import { StyledOffcanvas, StyledHeader, SideBar, Profile, 
            ProfileImage, Address, Positions, PositionNav, PositionButtons,
            PositionsCard, PositionsTable, TableHead} from './styles'

// Images //
import Exit from '../../../components/Icons/Exit'
import { SpacingContainer } from '../../../components'

export function shortenAddress(address: string) {
    return (
        address.substring(0,6) + "..." + address.substring(address.length - 2, address.length)
    )
}

type SidebarProps = {
    // show ? display: flex : display: none
    show: boolean
    
    // setShow(false)
    handleClose: Function

    // Will set modalShow to true
    handleModalShow: Function
}

const Sidebar = ({show, handleClose, handleModalShow}: SidebarProps) => {
    const { state }= useRari()
    
    

    const shortenedAddress = shortenAddress(state.address)

    return (
        <StyledOffcanvas show={show} onHide={handleClose}>
            <StyledHeader>
                <SpacingContainer width="30px">
                    <Exit onClick={handleClose}/>
                </SpacingContainer>
            </StyledHeader>
            <SideBar>
               <Profile>
                   <ProfileImage src={`https://avatars.dicebear.com/api/jdenticon/${shortenedAddress}.svg`} />
                   { state.isAuthed ? 
                        <Address onClick={handleModalShow}>
                            <span>{shortenedAddress}</span>
                        </Address> 
                    :   
                        null
                   }
               </Profile>
               <Positions>
                    <h3>Positions</h3>
                    <PositionNav>
                        <PositionButtons>Active</PositionButtons>
                        <PositionButtons>Link</PositionButtons>
                        <PositionButtons>Link</PositionButtons>
                   </PositionNav>
                   <PositionsCard>
                        <PositionsTable>
                            <TableHead>
                                <th>Pool</th>
                                <th>Deposit</th>
                                <th>Interest</th>
                                <th>Growth</th>
                            </TableHead>
                        </PositionsTable>
                   </PositionsCard>
                   <h5>Net Balance: 0.00$</h5>
               </Positions>
            </SideBar>
        </StyledOffcanvas>
    )
}

export default Sidebar