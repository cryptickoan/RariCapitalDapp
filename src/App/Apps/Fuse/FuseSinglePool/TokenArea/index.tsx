//  Rari
import { useRari } from '../../../../../context/RariProvider'

// Fuse 
import { createComptroller } from '../../../../../utils/createComptroller'

// Dependencies
import {  useSelector, useDispatch } from 'react-redux'
import { updateDisplay, updateGraph } from '../redux/reducer'
import { useQueryClient } from 'react-query'
import { useTokenData } from '../../../../../hooks/useTokenData'
import { convertMantissaToAPR, convertMantissaToAPY } from '../../../../../utils/APY'
import { USDPricedFuseAsset } from '../../../../../hooks/useFusePoolData'

// Styled Components
import {  MarketBar, CollateralToggle } from "./styles"
import { StyledCarousel } from '../../../YieldAggregator/PoolInformation/InfoCarousel/styles'
import { SpacingContainer, StyledP, Button } from '../../../../components'
import InfoPair from '../../../../components/InfoPair'

// Bootstrap
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { Carousel } from 'react-bootstrap'

// Icons
import Spinner from '../../../../components/Icons/Spinner'


const TokenArea = ({ action, assets, comptrollerAddress }: {action: string, assets: USDPricedFuseAsset[], comptrollerAddress: string}) => {
    return (
        <SpacingContainer width="25%" height="100%" direction="column">
                <h3>{ action === "lend" ? "Lend" : "Borrow" } </h3>
                <SpacingContainer height="90%" width="95%" direction="column" justifyContent="flex-start" overflowY="scroll" >
                    {assets && comptrollerAddress ? <TokenList action={action} assets={assets} comptrollerAddress={comptrollerAddress}/> : <Spinner />}
                </SpacingContainer>
        </SpacingContainer>
    )
}
 
export default TokenArea


const TokenList = ({assets, action, comptrollerAddress}: {action: string, assets: USDPricedFuseAsset[], comptrollerAddress: string}) => {
    return (
        <>
            {
             assets.length > 0 ? 
                    assets.map((asset: USDPricedFuseAsset) => 
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


const MarketBars = ({comptrollerAddress, asset, action }: {comptrollerAddress: string, asset: USDPricedFuseAsset, action: string}) => {
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
