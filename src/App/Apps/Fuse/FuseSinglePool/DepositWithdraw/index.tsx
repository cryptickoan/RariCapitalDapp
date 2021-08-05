// Dependencies
import { useSelector } from 'react-redux'
import { GraphState } from '../redux/reducer'

// Styled Components
import { useState } from 'react'
import { SpacingContainer, Card, StyledP }from '../../../../components'
import { ActionButton } from '../../../YieldAggregator/PoolCard/DepositWithdraw/styles'
import { SimulationInput } from '../GraphArea/styles'

const DepositWithdraw = () => {
    const [action, setAction] = useState('depositing')
    const [amount, setAmount] = useState('0')

    const state = useSelector((state: any) => state.display)

    return (
        <SpacingContainer width="50%" height="100%" margin="10px 0 0 0" direction="column" justifyContent="space-evenly">
            <Card height="65%" width="95%" borderRadius="15px" direction="column">
                <SpacingContainer direction="column">
                    <StyledP>You're {action} ${amount} to {state.token}</StyledP>
                    <StyledP>Current APY {state.apy.toFixed(2)}% </StyledP>
                    <SpacingContainer height="10%" color="black">
                        <ActionButton name="depositing" error='' action={action} onClick={() => setAction('depositing')}>Deposit</ActionButton>
                        <ActionButton name="withdrawing" error='' action={action} onClick={() => setAction('withdrawing')}>Withdraw</ActionButton>
                        <ActionButton name="staking" error='' action={action} onClick={() => setAction('staking')}>Stake</ActionButton>
                    </SpacingContainer>
                        <SimulationInput type="number" placeholder="Insert your amount" onChange={(e) => setAmount(e.target.value)}/>
                </SpacingContainer>
            </Card>
        </SpacingContainer>
    )
}

export default DepositWithdraw