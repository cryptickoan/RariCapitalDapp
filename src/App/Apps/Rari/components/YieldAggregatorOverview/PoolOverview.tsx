// Styled Components
import { SpacingContainer, StyledP } from '../../../../Shared'
import Spinner from '../../../../Shared/Icons/Spinner'

// React Bootstrap
import { StyledCarousel } from '../../../YieldAggregator/PoolInformation/InfoCarousel/styles'
import { Carousel } from 'react-bootstrap'

// Rari
import { Pool } from '../../../../../context/PoolProvider'

// ReactApex charts
import Chart from 'react-apexcharts'
import { LineChartOptions } from '../../../YieldAggregator/PoolInformation/Graph'

// Hooks
import useSupply from './hooks/useSupply'
import useAPY from './hooks/useAPY'

const PoolOverview = ({pool}: {pool: Pool}) => {
    return (
        <SpacingContainer height="40%" direction="column">
            <SpacingContainer height="5%">
                <StyledP>{pool === "USDC" ? "Stable Pool" : "Dai Pool"}</StyledP>
            </SpacingContainer>
            <SpacingContainer height="80%">
                <StyledCarousel
                    interval={400000}
                    indicators={false}
                >
                    <Carousel.Item>
                        <SupplyGraph pool={pool} />
                    </Carousel.Item>

                    <Carousel.Item>
                        <APYGraph pool={pool}/>
                    </Carousel.Item>
                </StyledCarousel>
            </SpacingContainer>
        </SpacingContainer>
    )
}

export default PoolOverview


const APYGraph = ({pool}: {pool: Pool}) => {

    const APY = useAPY(pool)

   
    return (
        <SpacingContainer direction="column">
            <SpacingContainer width="80%" direction="column">
                { typeof APY === "undefined" ?
                <Spinner/> :
                <SpacingContainer display="block" color="black">
                    <Chart
                        options={{...LineChartOptions, 
                            colors: ['#B8FF71', 'white', '#B8FF71'],
                            xaxis: {
                                type: 'datetime', 
                                labels: { 
                                    style: { 
                                        colors: ['grey'],
                                        fontSize: '13px' 
                                    }
                                }
                            }, 
                            yaxis: {
                                labels: {
                                    formatter: (value) => { return `${value.toFixed(2)}%`},
                                    style: {
                                        fontSize:'10px',
                                        fontFamily: 'Orbitron'
                                    }
                                }
                            },
                            chart: { 
                                foreColor: 'grey',
                                fontFamily: 'Neuropol-nova'
                            },
                            title: {
                                text: "APY history"
                            }
                        }}
                        series={[APY]}
                        width="100%"
                        height="80%"
                    />
                </SpacingContainer>
                    }
            </SpacingContainer>
        </SpacingContainer>
    )
}

const SupplyGraph = ({pool}: {pool: Pool}) => {
    const supply = useSupply(pool)
    
    return (
        <SpacingContainer direction="column">
            <SpacingContainer width="80%" direction="column">
            { typeof supply === "undefined" ?
                <Spinner/> :
                <SpacingContainer display="block" color="black">
                    <Chart
                        options={{...LineChartOptions, 
                            colors: ['#B8FF71', 'white', '#B8FF71'],
                            xaxis: {
                                type: 'datetime', 
                                labels: { 
                                    style: { 
                                        colors: ['grey'],
                                        fontSize: '13px' 
                                    }
                                }
                            }, 
                            yaxis: {
                                labels: {
                                    formatter: (value) => { return `$${value.toLocaleString()}`},
                                    style: {
                                        fontSize:'10px',
                                        fontFamily: 'Orbitron'
                                    }
                                }
                            },
                            chart: { 
                                foreColor: 'grey',
                                fontFamily: 'Neuropol-nova'
                            },
                            title: {
                                text: "Supply history"
                            }
                        }}
                        series={[supply]}
                        width="100%"
                        height="80%"
                    />
                </SpacingContainer>
            }   
            </SpacingContainer>
        </SpacingContainer>
    )
}