// Rari //
import { useRari } from '../../../../../context/RariProvider'
import { validateDeposit, depositToPool, 
         validateWithdrawal, withdrawFromPool, 
         usePool, BN, Pool } from '../../../../../context/PoolProvider'

// React //
import { useState } from 'react'

// Styled Components
import { Card, SpacingContainer } from '../../../../Shared'
import Spinner from '../../../../Shared/Icons/Spinner'

// Dependencies //
import { ActionButton,
            ActionFormInput, ActionFormCurrencyButton, ConfirmationSpan, ConfirmationButton, 
            PoolWarning } from './styles'
import BigNumber from "bignumber.js";
import { AllTokens } from "rari-tokens-generator";
import ErrorMessage from '../../../../Shared/ErrorMessage'

// Images //
import Exit from '../../../../Shared/Icons/Exit'
import Tokens from "../../../../../static/tokens.json";

// Action type will define which function to use //
enum Action {
    Withdraw = "withdraw",
    Deposit = "deposit"
} 

const DepositWithdraw = ({setOpen}: any) => {
    // Define if withdrawing or depositing, defaults to withdraw //
    const [action, setAction] = useState<Action>(Action.Withdraw)

    const [ error, setError ] = useState("")

    return (
        <SpacingContainer direction="column">
            <ErrorMessage error={error}/>
            <ChooseActionButton action={action} setAction={setAction} error={error}/>
            <ActionForm  action={action} setOpen={setOpen} setError={setError}/>
        </SpacingContainer>
    )
}
export default DepositWithdraw

// Changes action type //
const ChooseActionButton = ({action, setAction, error}: any) => {
    return (
        <SpacingContainer>
            <ActionButton name="withdraw" action={action} error={error} onClick={() => setAction(Action.Withdraw)}>Withdraw</ActionButton>
            <ActionButton name="deposit" action={action} error={error} onClick={() => setAction(Action.Deposit)}>Deposit</ActionButton>
        </SpacingContainer>
    )
}

enum UserAction {
    NO_ACTION,
    REQUESTED_QUOTE,
    VIEWING_QUOTE,
    WAITING_FOR_TRANSACTION
}

const ActionForm = ({setOpen, action, setError}: any) => {
    // Get defaults to use Rari //
    const { state } = useRari()
    const { title } = usePool()
    const tokens = Tokens as AllTokens;

    const getPool = (title: Pool) => {
        switch (title) {
            case Pool.USDC:
                return 'Stable pool'
            case Pool.DAI:
                return 'Dai pool'
            case Pool.ETH:
                return 'Eth pool'
            default:
                break;
        }
    }

    // Form Control //
    const [ choosingToken, setChoosingToken ] = useState(false)
    const [ userEnteredAmount, _setUserEnteredAmount ] = useState("")
    const [ amount, _setAmount] = useState<BigNumber | null>(() => new BigNumber(0))
    const [ token, setToken ] = useState(tokens[title])
    const [ quote, setQuote ] = useState<null | BN>(null)
    const [ userAction, setUserAction ] = useState(UserAction.NO_ACTION)
    

    const updateAmount = (newAmount: string) => {
        if (newAmount.startsWith("-")) {
        return;
        }

        _setUserEnteredAmount(newAmount);

        try {
        BigNumber.DEBUG = true;

        // Try to set the amount to BigNumber(newAmount):
        const bigAmount = new BigNumber(newAmount);
        console.log(bigAmount, "big")
        _setAmount(bigAmount.multipliedBy(10 ** token.decimals));
        } catch (e) {
        console.log(e);

        // If the number was invalid, set the amount to null to disable confirming:
        _setAmount(null);
        }

    };


    const selectToken = (token: any) => {
        setChoosingToken(false)
        setToken(tokens[token])
    }

    const handleSubmit = async () => {
        try {

            if( userAction === UserAction.NO_ACTION) {
                setUserAction(UserAction.REQUESTED_QUOTE)
                
                let answer 
                if (action === Action.Deposit) {
                    answer = await validateDeposit(title, state.rari, token.symbol, amount, state.address)
                } else {
                    answer = await validateWithdrawal(title, state.rari, token.symbol, amount, state.address)
                }
                
                if (answer.slippage) {
                    const slippagePercent = (parseInt(answer.slippage.toString()) / 1e18) * 10
                    const formattedSlippage = slippagePercent.toFixed(2) + "%"

                    if (!window.confirm(`Slippage of ${formattedSlippage} for ${token.name}, do you wish to continue with this transaction?` ) ){
                        setUserAction(UserAction.NO_ACTION)
                        return
                    }
                }

                setQuote(answer.quote)
                setUserAction(UserAction.VIEWING_QUOTE)
                return 
            }

            setUserAction(UserAction.WAITING_FOR_TRANSACTION)

            if (action === Action.Deposit) {
                 await depositToPool(title, state.rari, token.symbol, amount, quote, state.address)
            } else {
                await withdrawFromPool(title, state.rari, token.symbol, amount, quote, state.address)
            }



        } catch (e){
            console.log(typeof e.message)
            setError(e.message.toString())
            setTimeout(() =>    setError(''), 9000)
        }
    }

    


    return(
        <>
            <SpacingContainer direction="column" margin="10px 0 0 0">
                <SpacingContainer direction="column">
                    {   
                        // if User is viewing quote, display quote
                        userAction === UserAction.VIEWING_QUOTE 
                        ? ( quote ? <SpacingContainer>You'll deposit {state.rari.web3.utils.fromWei(quote)} to {getPool(title)}</SpacingContainer> : <SpacingContainer><Spinner /></SpacingContainer>)
                        
                        : // if choosingCurrency display currency search field else display amount input
                        choosingToken ? 
                        <ChooseCurrency tokens={tokens} selectToken={selectToken}/> 
                        :
                        <SpacingContainer>
                        <ActionFormInput input="input" type="number" placeholder="0.0" onChange={(e) => updateAmount(e.target.value)}/>
                        <ActionFormCurrencyButton input="select" onClick={() => setChoosingToken(true)}>
                            {token.symbol}
                        </ActionFormCurrencyButton>
                        </SpacingContainer>
                    }   
                </SpacingContainer>
                <PoolWarning>You may experience divergence<br/> loss in this pool. Click for info.</PoolWarning>
            </SpacingContainer>
            <ConfirmationSpan>
                <ConfirmationButton onClick={() => handleSubmit()}>{userAction === UserAction.NO_ACTION ? 'Review' : userAction === UserAction.VIEWING_QUOTE ? 'Confirm' : 'Loading...' }</ConfirmationButton>
                <SpacingContainer width="30px" height="30px">
                    <Exit onClick={() => setOpen(false)} className="exitIcon-theme" />
                </SpacingContainer>
            </ConfirmationSpan>
         </>
    )
}

const ChooseCurrency = ({tokens, selectToken}: any) => {
    const [ searchTerm, setSearchTerm ] = useState('')
    console.log(tokens)

    // Filter currencies with search term //
    const filteredTokens = searchTerm === "" ? tokens : 
    Object.values(tokens).filter((token: any) => 
        token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <>
        <ActionFormInput input="search" type="text" placeholder="Choose your token" onChange={(e) => setSearchTerm(e.target.value)}/>
        <SpacingContainer maxHeight="10vh" direction="column" justifyContent="flex-start" overflowY="scroll">
            {Object.values(filteredTokens).map((token: any) => 
            <Card width="80%" minHeight="50px">
                <SpacingContainer flexBasis="50%">
                    <img width="35px" src={token.logoURL} alt="tokenIcon"/>
                </SpacingContainer>
                <SpacingContainer flexBasis="50%">
                    <div key={token.symbol} onClick={() => selectToken(token.symbol)}>{token.symbol}</div>
                </SpacingContainer>
            </Card>
            )}
        </SpacingContainer>
        </>
    )
}
