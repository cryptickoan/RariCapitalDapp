// Hooks
import useRGTChart from './hooks/useRGTChart'

// Styled Components
import { SpacingContainer, StyledP } from '../../../../Shared'

// React ApexCharts
import Chart from 'react-apexcharts'
import { LineChartOptions } from '../../../../../utils/Chart'

// Icons
import Spinner from '../../../../Shared/Icons/Spinner'

const RGTChart = () => {
    const price = useRGTChart()

    if (typeof price === "undefined") return <Spinner />

    return (
        <SpacingContainer direction="column">
            <SpacingContainer width="80%" direction="column">
                <SpacingContainer height="20%" margin="2% 0" direction='column' >
                    <StyledP size="1vw" opacity="0.4">RGT Price</StyledP>
                    <StyledP size="0.7vw" opacity="0.4">last 30 days</StyledP>
                </SpacingContainer>
                <SpacingContainer height="80%" display="block" color="black">
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
                                        formatter: (value) => { return value.toFixed(2)}
                                    }
                                },
                                chart: { 
                                    foreColor: 'grey',
                                    fontFamily: 'Neuropol-nova'
                                }
                            }}
                        series={[price]}
                        width="100%"
                        height="80%"
                    />
                </SpacingContainer>
            </SpacingContainer>
        </SpacingContainer>
            
    )
}

export default RGTChart