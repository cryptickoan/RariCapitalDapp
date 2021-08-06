// Rari
import { useRari } from '../../../../../context/RariProvider';

// React
import { useState, useEffect } from 'react'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { removeDisplay } from '../redux/reducer'

// Dependencies
import { useQuery } from 'react-query';
import BigNumber from "bignumber.js";

// Styled Components
import { SpacingContainer, Card, StyledP }from '../../../../components'
import { ActionButton, ConfirmationButton } from '../../../YieldAggregator/PoolCard/DepositWithdraw/styles'
import { SimulationInput } from '../GraphArea/styles'
import InfoPair from '../../../../components/InfoPair'

// Hooks
import { USDPricedFuseAsset } from '../../../../../hooks/useFusePoolData';
import { useBorrowLimit } from '../../../../../hooks/Fuse/useMaxBorrow';
import { convertMantissaToAPR, convertMantissaToAPY } from '../../../../../utils/APY';

// Icons
import Exit from '../../../../components/Icons/Exit'
import Spinner from '../../../../components/Icons/Spinner';
import { smallUsdFormatter } from '../../../../../utils/formatter';

// Types
enum UserAction {
    NO_ACTION,
    WAITING_FOR_TRANSACTIONS,
  }

// Rendered after user clicks manage button
// It can come from the Lending or Borrowing side
const DepositWithdraw = () => {
    // Brings all info needed to render this section
    // Info should be of type Display
    const state = useSelector((state: any) => state.display)

    // Where the user is in the action flow
    const [userAction, setUserAction] = useState(UserAction.NO_ACTION);

    // This will tell us what action the user is attempting to do.
    // Supply, Borrow, Repay or Withdraw
    const [action, setAction] = useState('')
    
    // The amount the user is using in the action, as a BigNumber for contracts and hooks
    const [amount, _setAmount] = useState<BigNumber | null>(() => new BigNumber(0));

    // The amount the user entered as a plain number in a string
    const [userEnteredAmount, _setUserEnteredAmount] = useState("")
    
    console.log(action, amount, userEnteredAmount)

    // Will set action to a default value, depending on where the manage button was pressed. i.e lending or borrowing side.
    // It will also reset amount and userEnteredAmount
    useEffect(() => {
        setAction(state.action === 'lend' ? 'Supply' : 'Borrow')
        _setAmount(() => new BigNumber(0))
        _setUserEnteredAmount("")
    }, [state])

    // When user enters an amount
    const updateAmount = (newAmount: string) => {
        if (newAmount.startsWith("-")) {
          return;
        }
    
        _setUserEnteredAmount(newAmount);
    
        try {
          BigNumber.DEBUG = true;
    
          // Try to set the amount to BigNumber(newAmount):
          const bigAmount = new BigNumber(newAmount);
          _setAmount(bigAmount.multipliedBy(10 ** state.asset.underlyingDecimals));
        } catch (e) {
          // If the number was invalid, set the amount to null to disable confirming:
          _setAmount(null);
        }
    
        setUserAction(UserAction.NO_ACTION);
      };
    
    return (
        <>
        <SpacingContainer width="50%" height="100%" margin="10px 0 0 0" direction="column" justifyContent="space-evenly">
            <Card height="80%" width="95%" borderRadius="15px" position="relative" direction="column" justifyContent="space-evenly">

                <ExitButton />
                <TokenInfo state={state}/>
                <ActionSection action={action} setAction={setAction} amount={amount} setAmount={updateAmount}/>

            </Card>
        </SpacingContainer>
        </>
    )
}

export default DepositWithdraw

const ExitButton = () => {
    const dispatch = useDispatch()

    // When exit button is clicked
    const handleClick = () => {
        dispatch(removeDisplay())
    }

    return (
        <SpacingContainer position="absolute" width="5%" height="5%" top="1%" alignSelf="flex-end" display="inline" margin="1vh 1vh 0 0">
            <Exit onClick={handleClick}/>
        </SpacingContainer>
    )
}

const TokenInfo = ({state}: any) => {
    return (
        <>
            <SpacingContainer height="40%" width="50%" direction="column" justifyContent="space-around">
                <SpacingContainer height="80%"direction="column">
                    <StyledP glow neuropolNova size="1.5vw">{state.asset.underlyingName}</StyledP>
                    <img alt="tokenIcon" height="60%" src={state.icon}></img>
                </SpacingContainer>
                <SpacingContainer height="20%">
                    <InfoPair
                        margin="1vh"
                        glow={true}
                        number={`${state.asset.supplyRatePerBlock.toFixed(2)}%`}
                        numberSize="1.2vw"
                        main="15px"
                        alt="Supply APY"
                        altSize="0.8vw"
                        direction="column"
                        height="5vh"
                        />
                    { state.asset.isPaused ? null :
                        <InfoPair
                            margin="1vh"
                                glow={true}
                                number={`${state.asset.borrowRatePerBlock.toFixed(2)}%`}
                                numberSize="1.2vw"
                                main="15px"
                                alt="Borrow APR"
                                altSize="0.8vw"
                                direction="column"
                                height="5vh"
                            />
                    }
                </SpacingContainer>
            </SpacingContainer>
        </>
    )
}

const ActionSection = ({action, setAction, amount, setAmount}: {action: string, setAction: any, amount: any, setAmount: any}) => {
    const state = useSelector((state: any) => state.display)

    // Used to give buttons info to display, depending on what the user is doing
    const buttonOne = state.action === 'lend'  ? 'Supply' : 'Borrow'
    const buttonTwo = state.action === 'lend'  ? 'Withdraw' : 'Repay'

    return (
        <SpacingContainer height="55%" width="70%"  direction="column" justifyContent="space-around">

            <SpacingContainer height="10%" color="black">
                <ActionButton 
                    name={buttonOne} 
                    error='' 
                    action={action} 
                    onClick={() => setAction(buttonOne)}
                >
                    {buttonOne}
                </ActionButton>
                <ActionButton 
                    name={buttonTwo}  
                    error='' 
                    action={action} 
                    onClick={() => setAction(buttonTwo)}
                >
                    {buttonTwo}
                </ActionButton>
            </SpacingContainer>

            <SpacingContainer height="10%">
                <SimulationInput width="60%" type="number" placeholder="0.0" onChange={(e) => setAmount(e.target.value)}/>
            </SpacingContainer>

            <Stats amount={parseInt(amount?.toFixed(0) ?? "0") ?? 0} action={action}/>

            <SpacingContainer height="10%">
                <ConfirmationButton width="40%" height="100%" onClick={() => null}>hey</ConfirmationButton>
            </SpacingContainer>
        </SpacingContainer>
    )
}
const Stats = ({amount, action}: any) => {
    const { state: RariState } = useRari()
    const state = useSelector((state: any) => state.display)

    const showEnableAsCollateral = !state.asset.membership && action === "Supply";

    const { data: updatedAssetInfo } = useQuery(action + " " + state.asset.underlyingSymbol + " " + amount, async () => {
        const ethPrice: number = RariState.fuse.web3.utils.fromWei(
            await RariState.rari.getEthUsdPriceBN()
        ) as any

        const interestRateModel = await RariState.fuse.getInterestRateModel(
            state.asset.cToken
        )

        let updatedAsset: USDPricedFuseAsset 

        if ( action === "Supply") {
            const supplyBalance = 
                parseInt(state.asset.supplyBalance) + amount
            
            const totalSupply = 
                parseInt(state.asset.totalSupply) + amount
            
            updatedAsset = {
                ...state.asset,

                supplyBalance,
                supplyBalanceUSD: ((supplyBalance * state.asset.underlyingPrice) / 1e36) * ethPrice,

                totalSupply,
                supplyRatePerBlock: interestRateModel.getSupplyRate(
                    RariState.fuse.web3.utils.toBN(
                        totalSupply > 0 
                        ? new BigNumber(state.asset.totalBorrow)
                            .dividedBy(totalSupply.toString())
                            .multipliedBy(1e18)
                            .toFixed(0)
                        : 0
                    )
                )
            }
        } else {
            updatedAsset= {
                ...state.asset
            }
        }

        return { updatedAssets: state.assets.map((value: USDPricedFuseAsset) => {
                                        if(value.underlyingSymbol === updatedAsset.underlyingSymbol) {
                                            return updatedAsset
                                        } return value
                                    }
                                ),
                 updatedAsset: updatedAsset
                }
    })

    const updatedAsset = updatedAssetInfo ? updatedAssetInfo.updatedAsset : null

    const isSupplyingorWithdrawing = action === 'Supply' || action === 'Withdraw' 

    const borrowLimit = useBorrowLimit(state.assets)   
    const updatedBorrowLimit = useBorrowLimit(updatedAssetInfo?.updatedAssets ?? [], showEnableAsCollateral ? { ignoreIsEnabledCheckFor: state.asset.cToken } : undefined)
    const updatedSupplyAPY = convertMantissaToAPY(
        updatedAsset?.supplyRatePerBlock ?? 0,
        365
      );
      const updatedBorrowAPR = convertMantissaToAPR(
        updatedAsset?.borrowRatePerBlock ?? 0
      );
    
      // If the difference is greater than a 0.1 percentage point change, alert the user
    const updatedAPYDiffIsLarge = isSupplyingorWithdrawing
    ? Math.abs(updatedSupplyAPY - state.asset.supplyAPY) > 0.1
    : Math.abs(updatedBorrowAPR - state.asset.borrowAPR) > 0.1

    console.log(borrowLimit, updatedBorrowLimit)
    console.log(updatedAsset)
    return (
        <SpacingContainer height="40%" width="70%" justifyContent="space-around" direction="column">
            {updatedAsset ? 
            <>
                <SpacingContainer flexBasis="20%" width="90%" justifyContent="space-between" >
                    <StyledP neuropolNova size="1vw">Supply Balance</StyledP>
                    <StyledP size="0.8vw">
                        {(state.asset.supplyBalance / 10 ** state.asset.underlyingDecimals).toLocaleString()} 
                        {isSupplyingorWithdrawing ? (
                            <>
                            {"→ "} {smallUsdFormatter(updatedAsset!.supplyBalance / 10 ** updatedAsset.underlyingDecimals).replace("$", "")}
                            </>
                        ) : null} {state.asset.underlyingSymbol}
                    </StyledP>
                </SpacingContainer>

                <SpacingContainer flexBasis="20%" width="90%" justifyContent="space-between">
                    <StyledP neuropolNova size="1vw">{isSupplyingorWithdrawing ? "Supply APY" : "Borrow APR"}</StyledP>
                    <StyledP size="0.8vw">
                        {isSupplyingorWithdrawing ? state.asset.supplyRatePerBlock.toFixed(2) : state.asset.borrowRatePerBlock.toFixed(2) }
                        {updatedAPYDiffIsLarge ? (
                            <>
                            {" → "} {isSupplyingorWithdrawing ? updatedSupplyAPY.toFixed(2) : updatedBorrowAPR.toFixed(2)}
                            </>
                        ) : null}%
                    </StyledP>
                </SpacingContainer>

                <SpacingContainer flexBasis="20%" width="90%" justifyContent="space-between"> 
                    <StyledP neuropolNova size="1vw">Borrow Limit</StyledP>
                    <StyledP size="0.8vw">${borrowLimit.toLocaleString()} {isSupplyingorWithdrawing ? (
                        <>
                            {" → "}${updatedBorrowLimit.toLocaleString()}
                        </>
                    ) : null}{" "} </StyledP>
                </SpacingContainer>

                <SpacingContainer flexBasis="20%" width="90%" justifyContent="space-between">
                    <StyledP neuropolNova size="1vw">Debt Balance</StyledP>
                    <StyledP size="0.8vw">
                        ${(state.asset.borrowBalanceUSD.toFixed(2)).toLocaleString()}
                        {!isSupplyingorWithdrawing ? (
                            <>
                                {" → "}${(updatedAsset.borrowBalanceUSD.toFixed(2)).toLocaleString()}
                            </>
                        ) : null} 
                    </StyledP>
                </SpacingContainer> 
            </>
            : <Spinner /> }
        </SpacingContainer>
    )
}