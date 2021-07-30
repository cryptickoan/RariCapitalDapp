// Rari
import { useRari } from '../../../../context/RariProvider'

// Fuse
import {  useFusePoolData } from '../../../../hooks/useFusePoolData'
import { createComptroller } from '../../../../utils/createComptroller'

// React
import { useState } from 'react'

// Dependencies
import { useParams } from "react-router"
import { useTokenData } from '../../../../hooks/useTokenData'
import { useQueryClient } from 'react-query'
import Chart  from 'react-apexcharts'
import { LineChartOptions, getInterest, DataEntry, getCategories } from '../../../../utils/Chart'
import { convertMantissaToAPR, convertMantissaToAPY } from '../../../../utils/APY'
import {  useSelector, useDispatch } from 'react-redux'
import { updateDisplay, updateGraph } from './redux/reducer'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

// Components
import FusePoolInfo from './FusePoolInfo'
import { Card, SpacingContainer, Button, StyledP } from '../../../components'
import InfoPair from '../../../components/InfoPair'

// Icons 
import Spinner from "../../../components/Icons/Spinner"
import {  MarketBar, CollateralToggle, SimulationInput } from "./styles"
import { StyledCarousel } from '../../YieldAggregator/PoolInformation/InfoCarousel/styles'
import { Carousel } from 'react-bootstrap'
import { ActionButton, ActionButtonGroup } from '../../YieldAggregator/PoolCard/DepositWithdraw/styles'
import { useFusePools } from '../../../../hooks/useFusePool'

const FuseSinglePool = () => {
    // Get pool info based on ID
    const { id } = useParams()
    console.log("rendering", id)
    
    const fusePools = useFusePools(null)

    const { isLoading, data: poolInfo}  = useFusePoolData(id)
    console.log(poolInfo)

    return (
        <>
        { poolInfo && fusePools 
        ?   ( 
        <>
                { fusePools.pools ? <FusePoolInfo creator={fusePools.pools[parseInt(id)].pool.creator} poolInfo={poolInfo}/> : <Spinner/>}

                <SpacingContainer height="90%" width="110%">
                    
                            
                            <TokenArea action="lend" 
                                assets={poolInfo?.assets} 
                                comptrollerAddress={poolInfo?.comptroller}
                                />
                    

                            <GraphArea/>

                            <TokenArea action="borrow" 
                                assets={poolInfo?.assets} 
                                comptrollerAddress={poolInfo?.comptroller}
                                />
                </SpacingContainer>
        </>
            )
            : <Spinner/>
        }
        
        
        </>
    )
}

export default FuseSinglePool

const initialState = [
    {name: '', data: [0]},
    {name: '', data: [0]},
    {name: '', data: [0]},
    {name: '', data: [0]}
]

const GraphArea = () => {
    // Info used in graph
    const state = useSelector(state => state)
    console.log(state,  "graph")

    const year = getCategories()

    let stateLenght = Object.keys(state).length
    let display = Object.keys(state).includes("display")
    let stateEntries = Object.entries(state).filter((entry) => entry[0] !== "display")

    
    // When in simulation this will be used to generate info used in graph
    const [ number, setNumber ] = useState<{}[]>(initialState)
    console.log(number, "number")


    const updateNumber = (tokenIndex: number, token: string, action: string, number: any, e: any) => {
        const timeOutID = setTimeout(() => {
            const newNumbers: any = number.map((item: DataEntry, index: number) =>  
                index !== tokenIndex ? item
                : {
                    name: (token + ' ' + action), 
                    data: getInterest(e.target.value,(stateEntries[tokenIndex][1].apy / 100))
                })
            console.log(newNumbers)
            setNumber(newNumbers)
        }, 3000)
        return () => clearTimeout(timeOutID)
    }

    return (
        <SpacingContainer width="50%" height="100%" margin="10px 0 0 0" direction="column" justifyContent="space-evenly">
                <Card height="65%" width="95%" borderRadius="15px" direction="column">
                    <SpacingContainer height="60%" color="black">

                    
                       { number.length > 0 && !display ?
                        <Chart options={{
                            ...LineChartOptions,
                            xaxis:{
                                type : "category",
                                categories: year
                            }
                            }}  
                            series={number} // must be an array of objects
                            type="line" 
                            height={300} 
                           width={575}/>  : 
                           <ActionButtonGroup>
                               <ActionButton name="deposit" error='' action="deposit">Deposit</ActionButton>
                               <ActionButton name="withdraw" error='' action="deposit">Withdraw</ActionButton>
                           </ActionButtonGroup>
                        } 
                    </SpacingContainer>
                </Card>
                <SpacingContainer height="20%" margin="0 0 0 0">
                    {
                        stateLenght > 0 
                        ? stateEntries.map((item, index) =>

                                <Button active={true} margin="0 10px 0 0" height="100%" borderRadius="5px" direction="column" flexBasis="20%">
                                    <SpacingContainer direction="row" height="50%">
                                        <img width="35px" src={item[1].icon} alt="tokenIcon"/>
                                        <InfoPair
                                            flexBasis="25%"
                                            direction="column" 
                                            number={item[1].token}
                                            numberSize="10px"
                                            alt={item[1].action}
                                            altSize="10px"
                                            margin="0 0 0 10px"
                                        />
                                    </SpacingContainer>
                                    <SimulationInput type="number" placeholder="0" onChange={(e) => updateNumber(index, item[1].token, item[1].action, number, e)}/>
                                </Button>
                        )
                        : null
                    }
                </SpacingContainer>
        </SpacingContainer>
    )
}

const TokenArea = ({ action, assets, comptrollerAddress }: any) => {
    return (
        <SpacingContainer width="25%" height="100%" direction="column">
                <h3>{ action === "lend" ? "Lend" : "Borrow" } </h3>
                <SpacingContainer height="90%" width="95%" direction="column" justifyContent="flex-start" overflowY="scroll" >
                    {assets && comptrollerAddress ? <TokenList action={action} assets={assets} comptrollerAddress={comptrollerAddress}/> : <Spinner />}
                </SpacingContainer>
        </SpacingContainer>
    )
}


const TokenList = ({assets, action, comptrollerAddress}: any) => {
    return (
        <>
            {
             assets.length > 0 ? 
                    assets.map((asset: any) => 
                        action === "borrow" && asset.isPaused ? null :
                        <MarketBars
                            comptrollerAddress={comptrollerAddress} 
                            key={asset.underlyingToken} 
                            asset={asset} 
                            action={action}
                        />
                    )
                : null 
            }
        </>
    )
}


const MarketBars = ({comptrollerAddress, asset, action }: {comptrollerAddress: any, asset: any, action: string}) => {
    // Redux store dispatch and state
    const dispatch = useDispatch()
    const  storeState = useSelector((state: any)  => state)
    
    // Rari, address, fuse, isAuthed
    const { state } = useRari()

    //Type of market bar i.e borrow or lend
    const isLend = action === "lend"
    const carouselControl = isLend ? {prevIcon: null} : {nextIcon: null} 

    // If token is in state then highlight button otherwise nothing
    const active = storeState[(asset.underlyingSymbol + action)] ? true : false

    // Get token data. 
    const tokenData = useTokenData(asset.underlyingToken)

    // APY and APR
    const supplyApy = convertMantissaToAPY(asset.supplyRatePerBlock, 365)
    const borrowAPR = convertMantissaToAPR(asset.borrowRatePerBlock)

    // If theres balance (borrowed or supplied) then highlight market bar
    const used = action === "lend" ? asset.supplyBalanceUSD > 1 : asset.borrowBalanceUSD > 1
    
    const handleTokenClick = () => {
        dispatch(updateGraph({token: asset.underlyingSymbol, apy: (isLend ? supplyApy : borrowAPR) , icon: tokenData?.logoURL, action: action}))
    }
    
    const queryClient = useQueryClient();

    const onToggleCollateral = async () => {
        const comptroller = createComptroller(comptrollerAddress, state.fuse);
    
        let call;
        if (asset.membership) {
          call = comptroller.methods.exitMarket(asset.cToken);
        } else {
          call = comptroller.methods.enterMarkets([asset.cToken]);
        }
    
        let response = await call.call({ from: state.address });
        // For some reason `response` will be `["0"]` if no error but otherwise it will return a string number.
        if (response[0] !== "0") {
          if (asset.membership) {
              console.log(
                  "You cannot disable this asset as collateral as you would not have enough collateral posted to keep your borrow. Try adding more collateral of another type or paying back some of your debt.",
               response)
        
          } else {
              console.log(response, "You cannot enable this asset as collateral at this time.")
          }
          return;
        }
    
        await call.send({ from: state.address });
    
    
        queryClient.refetchQueries();
      };


    const handleManageClick = () => {
        dispatch(updateDisplay({apy:(isLend ? supplyApy : borrowAPR), token: asset.underlyingSymbol, action: action }))
    }


    if (typeof tokenData === "undefined") return <Spinner/> 
    
    return (
        <MarketBar glow={used} >
                {isLend
                ?   <Button height="70%" onClick={handleTokenClick} active={active} borderRadius="5px" direction="column"  margin="0 10px 0 10px" flexBasis="25%">
                        <img width="35px" src={tokenData.logoURL} alt="tokenIcon"/>
                        <p>{tokenData.symbol}</p>
                    </Button>
                : null }
                <SpacingContainer overflowY="hidden" overflowX="scroll" flexBasis="75%" margin={isLend ? "0 10px 0 0" : "0 0 0 10px"} justifyContent="flex-start">
                    <StyledCarousel
                        direction='prev'
                        indicators={false}
                        interval={null}
                        {...carouselControl}
                    >
                        <Carousel.Item>
                            <SpacingContainer 
                                overflowY="hidden" 
                                overflowX="scroll" 
                                flexBasis="70%" 
                                margin={isLend ? "0 10px 0 0" : "0 0 0 10px"}
                                justifyContent="flex-start"
                            >
                                <SpacingContainer width="50%">
                                    <InfoPair 
                                        direction="column" 
                                        width="10%"
                                        flexBasis="10%"
                                        justifyContent="center"
                                        numberSize="10px"
                                        number={`${isLend ? "APY" : "APR"}`}
                                        altSize="13px"
                                        alt={`${isLend ? supplyApy.toFixed(2) : borrowAPR.toFixed(2)}%`}
                                        main="15px"
                                        secondary="15px"
                                        marginBottom="5px"
                                        glow={true}
                                    />
                                </SpacingContainer>
                                <OverlayTrigger
                                        overlay={<Tooltip id={`tooltip-top`}>{isLend 
                                            ? "Lend to Value ratio determines the max amount you can borrow. i.e. if ETH has a 75% LTV for every ETH you can borrow 0.75ETH" 
                                            : "Usage percentage."}</Tooltip>}
                                        placement='top'
                                    >
                                <SpacingContainer flexBasis="50%" margin="0 20px 0 0">
                                        <InfoPair 
                                            direction="column" 
                                            width="10%"
                                            flexBasis="10%"
                                            justifyContent="center"
                                            numberSize="10px"
                                            number={`${isLend ? "LTV" : "Usage"}`}
                                            altSize="13px"
                                            alt={`${isLend ? (asset.collateralFactor / 1e16) : ((asset.liquidityUSD * 100) / asset.totalSupplyUSD).toFixed(2)}%`}
                                            main="15px"
                                            secondary="15px"
                                            marginBottom="5px"
                                            glow={true}
                                        />
                                </SpacingContainer>
                                </OverlayTrigger>
                            </SpacingContainer>
                        </Carousel.Item>


                        <Carousel.Item>
                            <SpacingContainer 
                                overflowY="hidden" 
                                overflowX="scroll" 
                                flexBasis="70%" 
                                margin={isLend ? "0 10px 0 0" : "0 0 0 10px"} 
                                justifyContent="space-around">
                                <SpacingContainer width="50%" margin={isLend ? "0 10px 0 0" : "0 0 0 10px"}>
                                    <InfoPair 
                                        direction="column" 
                                        width="10%"
                                        flexBasis="10%"
                                        justifyContent="center"
                                        numberSize="10px"
                                        number={isLend ? "Supply" : "Liquidity"}
                                        altSize="13px"
                                        alt={`$${(isLend ? asset.liquidityUSD : asset.totalSupplyUSD).toLocaleString()}`}
                                        main="15px"
                                        secondary="15px"
                                        marginBottom="5px"
                                        glow={true}
                                    />
                                </SpacingContainer>
                            </SpacingContainer>
                        </Carousel.Item>
                        

                    
                        <Carousel.Item>
                            <SpacingContainer 
                                overflowY="hidden" 
                                overflowX="scroll" 
                                flexBasis="70%" 
                                justifyContent="flex-start"
                                margin={isLend ? "0 10px 0 0" : "0 0 0 20px"}
                                >
                                    <SpacingContainer flexBasis="50%">
                                        <InfoPair 
                                            direction="column" 
                                            width="10%"
                                            flexBasis="10%"
                                            justifyContent="center"
                                            numberSize="10px"
                                            number="Balance"
                                            altSize="13 px"
                                            alt={`$${(isLend ? asset.supplyBalanceUSD : asset.borrowBalanceUSD).toLocaleString()}`}
                                            main="15px"
                                            secondary="15px"
                                            marginBottom="5px"
                                            glow={true}
                                        />
                                </SpacingContainer> 
                                <SpacingContainer flexBasis="50%" direction="column" margin="0 20px 0 0">
                                    <StyledP>Manage</StyledP>
                                    <CollateralToggle onClick={handleManageClick}/>
                                </SpacingContainer>

                            </SpacingContainer>
                        </Carousel.Item>
                        
                    </StyledCarousel>
                </SpacingContainer>
                {!isLend
                    ? <Button active={active} onClick={handleTokenClick} borderRadius="5px" height="70%" direction="column"  margin="0 10px 0 10px" flexBasis="25%">
                        <img width="35px" src={tokenData.logoURL} alt="tokenIcon"/>
                        <p>{tokenData.symbol}</p>
                      </Button>
                    : null }
        </MarketBar>
    )
}
