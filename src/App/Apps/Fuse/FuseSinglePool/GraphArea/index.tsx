// React
import { useState } from 'react'

// Dependencies
import Chart  from 'react-apexcharts'
import { useSelector } from 'react-redux'
import { LineChartOptions, getInterest, DataEntry, getCategories } from '../../../../../utils/Chart'

// Styled Components
import { SimulationInput } from './styles'
import { Card, OnOffButton, SpacingContainer, InfoPair} from '../../../../Shared'

// Icons
import Spinner from '../../../../Shared/Icons/Spinner'

const initialState = [
    {name: '', data: [0]},
    {name: '', data: [0]},
    {name: '', data: [0]},
    {name: '', data: [0]}
]

const GraphArea = () => {
    // Info used in graph
    const state = useSelector(state => state)
    const year = getCategories()

    let stateLenght = Object.keys(state).length
    let stateEntries = Object.entries(state).filter((entry) => entry[0] !== "display")
    
    // When in simulation this will hold all info used in graph
    const [ graphData, setGraphData ] = useState<{name: string, data: number[]}[]>(initialState)

    // Number changes through input. We wait for user to stop typing, 
    // and then generate an array of objects that will be used as graph's data 
    const updateNumber = (tokenIndex: number, token: string, action: string, number: any, e: any) => {
        const timeOutID = setTimeout(() => {
            const newNumbers = number.map((item: DataEntry, index: number) =>  
                index !== tokenIndex ? item
                : {
                    name: (token + ' ' + action), 
                    data: getInterest(e.target.value,(stateEntries[tokenIndex][1].apy / 100))
                })
            setGraphData(newNumbers)
        }, 3000)
        return () => clearTimeout(timeOutID)
    }

    return (
        <SpacingContainer width="50%" height="100%" margin="10px 0 0 0" direction="column" justifyContent="space-evenly">
                <Card height="65%" width="95%" borderRadius="15px" direction="column">
                    <SpacingContainer height="60%" color="black">

                    
                       { graphData.length > 0 
                       ? <Chart options={{
                            ...LineChartOptions,
                            xaxis:{
                                type : "category",
                                categories: year
                            }
                            }}  
                            series={graphData} // must be an array of objects
                            type="line" 
                            height={300} 
                           width={575}/>  
                           : <Spinner />
                        } 
                    </SpacingContainer>
                </Card>
                <SpacingContainer height="20%" margin="0 0 0 0">
                    {
                        stateLenght > 0 
                        ? stateEntries.map((item, index) =>

                                <OnOffButton active={true} margin="0 10px 0 0" height="100%" borderRadius="5px" direction="column" flexBasis="20%">
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
                                    <SimulationInput type="number" placeholder="0" onChange={(e) => updateNumber(index, item[1].token, item[1].action, graphData, e)}/>
                                </OnOffButton>
                        )
                        : null
                    }
                </SpacingContainer>
        </SpacingContainer>
    )
}

export default GraphArea