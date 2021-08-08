// Styles Components
import styled from 'styled-components'
import { SpacingContainer, InfoPair, Bar } from "../../../../Shared"
import { StyledCarousel } from '../../../YieldAggregator/PoolInformation/InfoCarousel/styles'

// Dependencies
import { shortenAddress } from '../../../../Layout/Sidebar'
import Carousel from 'react-bootstrap/Carousel'

export const Title = styled.h1`
    font-size:50px;
    font-family: 'neuropol-nova';
    text-shadow:${props => props.theme.light ? "0 0 10px #B8FF71, 10px 0 13px black, 0 10px 10px #B8FF71": "0 0 10px #B8FF71"}; 
    color: ${props => props.theme.light ? "black": "white"};
    line-height: 50px;
`

const FusePoolInfo = ({creator, poolInfo}: any) => {
    return ( 
        <SpacingContainer height="10%">
            <StyledCarousel
                    indicators={false} 
                    interval={50000} 
            >
                <Carousel.Item>
                    <Title> {poolInfo.name} </Title>
                </Carousel.Item>

                <Carousel.Item>
                    <PoolTotals poolInfo={poolInfo}/>
                </Carousel.Item>

                <Carousel.Item>
                    <GeneralInfo poolInfo={poolInfo} creator={creator}/>
                </Carousel.Item>

                <Carousel.Item>
                    <SupplyAllocation poolInfo={poolInfo}/>
                </Carousel.Item>

                <Carousel.Item>
                    <BorrowAllocation poolInfo={poolInfo}/>
                </Carousel.Item>

            </StyledCarousel>
        </SpacingContainer>
    )
}

export default FusePoolInfo


const PoolTotals = ({poolInfo}: any) => {
    return (
        <SpacingContainer>
            <InfoPair 
                direction="column" 
                width="30%"
                justifyContent="center"
                numberSize="20px"
                glow={true}
                number={`$${poolInfo.totalSupplied.toLocaleString()}`}
                altSize="13px"
                alt="total supplied"
                main="35px"
                secondary="5px"
                marginBottom="10px"
                />
            <InfoPair 
                direction="column" 
                width="30%"
                justifyContent="center"
                numberSize="30px"
                glow={true}
                number={`$${poolInfo.totalLiquidityUSD.toLocaleString()}`}
                altSize="15px"
                alt="total liquidity"
                main="40px"
                secondary="10px"
                marginBottom="10px"
                />
            <InfoPair 
                direction="column" 
                width="30%"
                justifyContent="center"
                numberSize="20px"
                glow={true}
                number={`$${poolInfo.totalBorrowed.toLocaleString()}`}
                altSize="13px"
                alt="total borrowed"
                main="35px"
                secondary="5px"
                marginBottom="10px"
                />
            
        </SpacingContainer>
    )
}

const GeneralInfo = ({poolInfo, creator}: any) => {
    return (
        <SpacingContainer>
            <InfoPair 
                direction="column" 
                width="30%"
                justifyContent="center"
                numberSize="30px"
                glow={true}
                number={`${((poolInfo.totalBorrowed * 100) / poolInfo.totalSupplied).toLocaleString()}%`}
                altSize="15px"
                alt="pool utilization"
                main="40px"
                secondary="10px"
                marginBottom="10px"
                />

            <InfoPair 
                direction="column" 
                width="30%"
                justifyContent="center"
                numberSize="30px"
                glow={true}
                number={shortenAddress(creator)}
                altSize="15px"
                alt="pool admin"
                main="40px"
                secondary="10px"
                marginBottom="10px"
                />
            <InfoPair 
                direction="column" 
                width="30%"
                justifyContent="center"
                numberSize="30px"
                glow={true}
                number="10%"
                altSize="15px"
                alt="platform fee"
                main="40px"
                secondary="10px"
                marginBottom="10px"
                />

            
        </SpacingContainer>
    )
}

const SupplyAllocation = ({poolInfo}: any) => {
    let tokenSupply: ({[key: string]: number}) = {}

    for (let i=0 ; i < poolInfo.assets.length ; i++) {
        let name = poolInfo.assets[i].underlyingSymbol
        tokenSupply[name] = poolInfo.assets[i].totalSupplyUSD
    }

    tokenSupply["total"] = Object.values(tokenSupply).reduce((a,b) => a + b)

    return (
         <Bar tokenAllocation={tokenSupply} type="supply"/>
    )
}


const BorrowAllocation = ({poolInfo}: any) => {
    let tokenSupply: ({[key: string]: number}) = {}

    for (let i=0 ; i < poolInfo.assets.length ; i++) {
        let name = poolInfo.assets[i].underlyingSymbol
        tokenSupply[name] = poolInfo.assets[i].totalBorrowUSD
    }

    tokenSupply["total"] = Object.values(tokenSupply).reduce((a,b) => a + b)

    return (
         <Bar tokenAllocation={tokenSupply} type="borrowed"/>
    )
}