// React
import { useState } from 'react'

import Chart  from 'react-apexcharts'

import { SimulationInput } from './styles'
import InfoPair from '../../../../components/InfoPair'
import { Card, Button, SpacingContainer } from '../../../../components'
import { useSelector } from 'react-redux'
import { LineChartOptions, getInterest, DataEntry, getCategories } from '../../../../../utils/Chart'
import { ActionButton, ActionButtonGroup } from '../../../YieldAggregator/PoolCard/DepositWithdraw/styles'

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

export default GraphArea