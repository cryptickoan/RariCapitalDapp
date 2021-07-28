// Rari // 
import { usePool } from '../../../../context/PoolProvider'


// React //
import { useState } from 'react'

// Dependencies //
import { useNavigate } from 'react-router'
import {PoolCards, PoolContent,  PoolHeader, PoolText, 
        OpenTitle, PoolTitle, PoolSub,  PoolDescription, 
        OpenDiv, DepositWithdrawDiv } from './styles'

// Components //
import DepositWithdraw from './DepositWithdraw'
import PoolAPY from '../../../components/PoolAPY'

// Icons //
import Logo from '../../../components/PoolIcons/Logo'
import Open from '../../../components/Icons/Open'
import Information from '../../../components/Icons/Information'

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
            <Information onClick={openInfo} className="poolInfoButton" />
        </PoolCards>


    )
}
 

export default PoolCard




