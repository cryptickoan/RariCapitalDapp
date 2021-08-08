// Rari // 
import { getInfo, usePool } from '../../../../context/PoolProvider'

// React //
import { useState } from 'react'

// React Router
import { useNavigate } from 'react-router'

// Styled Components
import {PoolCards, PoolContent,  PoolHeader, PoolText, 
        OpenTitle, PoolTitle, PoolSub,  PoolDescription, 
        OpenDiv, DepositWithdrawDiv } from './styles'
import { SpacingContainer } from '../../../Shared'

// React Bootstrap
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

// Components //
import DepositWithdraw from './DepositWithdraw'
import PoolAPY from '../../../Shared/PoolAPY'

// Icons //
import Logo from '../../../Shared/PoolIcons/Logo'
import Open from '../../../Shared/Icons/Open'
import Information from '../../../Shared/Icons/Information'

// Styles for Icons //
import './styles.css'

const PoolCard = () => {
    const [open, setOpen] = useState(false);
    const {title, description} = usePool()
    const props = { isOpen: open }
    const navigate = useNavigate()

    const openInfo = () => {
        navigate(`../${title}`)
    }
 
    return (
        
        <PoolCards>
            <PoolContent>
                <PoolHeader {...props}>
                    <Logo pool={title} className="poolLogo" />

                    <PoolText>
                        <OpenTitle {...props}>
                            <PoolTitle>{title}</PoolTitle>
                            <PoolSub>Pool</PoolSub>
                        </OpenTitle>
                        <PoolDescription {...props}>{description}</PoolDescription>
                        <PoolAPY pool={title} type={"current block"} card/>
                    </PoolText>

                    <OpenDiv {...props}>
                        <Open setOpen={setOpen} className="openPoolButton"/>
                    </OpenDiv>
                </PoolHeader>

                <DepositWithdrawDiv {...props}>
                    <DepositWithdraw setOpen={setOpen}/>
                </DepositWithdrawDiv>

            </PoolContent>
            <OverlayTrigger
                key='top'
                placement='top'
                overlay={<Tooltip id={`tooltip-top`}>{getInfo(title)}</Tooltip>}
            >
                <SpacingContainer width="20%" height="10%" alignSelf="flex-start">
                    <Information onClick={openInfo} className="poolInfoButton" />
                </SpacingContainer>
            </OverlayTrigger>
        </PoolCards>


    )
}
 

export default PoolCard




