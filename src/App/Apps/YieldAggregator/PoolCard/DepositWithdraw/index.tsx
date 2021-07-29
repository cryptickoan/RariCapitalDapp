// Rari //
import { useRari } from '../../../../../context/RariProvider'
import { validateDeposit, depositToPool, 
         validateWithdrawal, withdrawFromPool, 
         usePool } from '../../../../../context/PoolProvider'

// React //
import { useState } from 'react'

// Dependencies //
import { Container } from 'react-bootstrap'
import { DepositWithdrawActionContainer, ActionButtonGroup, ActionButton, ActionFormGroup, 
            ActionFormInput, ActionFormCurrencyButton, ConfirmationSpan, ConfirmationButton, 
            PoolWarning, CoinDiv } from './styles'
import BigNumber from "bignumber.js";
import { AllTokens } from "rari-tokens-generator";
import ErrorMessage from '../../../../components/ErrorMessage'

// Images //
import Exit from '../../../../components/Icons/Exit'
import Tokens from "../../../../../static/tokens.json";
import { SpacingContainer } from '../../../../components'

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
        <DepositWithdrawActionContainer>
            <ErrorMessage error={error}/>
            <ChooseActionButton action={action} setAction={setAction} error={error}/>
            <ActionForm  action={action} setOpen={setOpen} setError={setError}/>
        </DepositWithdrawActionContainer>
    )
}
export default DepositWithdraw

// Changes action type //
const ChooseActionButton = ({action, setAction, error}: any) => {
    return (
        <ActionButtonGroup>
            <ActionButton name="withdraw" action={action} error={error} onClick={() => setAction(Action.Withdraw)}>Withdraw</ActionButton>
            <ActionButton name="deposit" action={action} error={error} onClick={() => setAction(Action.Deposit)}>Deposit</ActionButton>
        </ActionButtonGroup>
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

    // Get depositable currencies //
    //const { status, data: tokens } = useQuery(title + "depositable currencies", () => {
     //   return getDepositableCurrencies(title, state.rari)
    //})

    // Form Control //
    const [ choosingToken, setChoosingToken ] = useState(false)
    const [ userEnteredAmount, _setUserEnteredAmount ] = useState("")
    const [ amount, _setAmount] = useState<BigNumber | null>(() => new BigNumber(0))
    const [ token, setToken ] = useState(tokens[title])
    const [ quote, setQuote ] = useState()
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
            <Container>
                <ActionFormGroup>
                    {
                        // if choosingCurrency display currency search field else display amount input
                        choosingToken ? 
                        <ChooseCurrency tokens={tokens} selectToken={selectToken}/> 
                        :
                        <>
                        <ActionFormInput input="input" type="number" placeholder="0.0" onChange={(e) => updateAmount(e.target.value)}/>
                        <ActionFormCurrencyButton input="select" onClick={() => setChoosingToken(true)}>
                            {token.symbol}
                        </ActionFormCurrencyButton>
                        </>
                    }   
                </ActionFormGroup>
                <PoolWarning>You may experience divergence<br/> loss in this pool. Click for info.</PoolWarning>
            </Container>
            <ConfirmationSpan>
                <ConfirmationButton onClick={() => handleSubmit()}> Review </ConfirmationButton>
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
        <CoinDiv>
            {Object.values(filteredTokens).map((token: any) => 
                <div key={token.symbol} onClick={() => selectToken(token.symbol)}>{token.symbol}</div>
            )}
        </CoinDiv>
        </>
    )
}