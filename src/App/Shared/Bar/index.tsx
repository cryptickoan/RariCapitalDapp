// Dependencies 
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { SpacingContainer } from '../index'
import { TotalBar, FillKey, FillKeyNumbers, Fill, Type } from './styles'

export const Bar = ({tokenAllocation, type}: {tokenAllocation: {[token: string]: number}, type: string}) => {
    const filteredData = Object.keys(tokenAllocation).filter((key) => tokenAllocation[key] > 0 && key !== "total")
    const length = filteredData.length


    return (    
        <SpacingContainer height="100%" direction="column" margin="10px 0 0 0">
            <TotalBar>
                { filteredData.map((key) =>

                    
                    <OverlayTrigger
                        key={key}
                        placement='top'
                        overlay={
                            <FillKey id={`tooltip-top`}>
                                <FillKeyNumbers>${tokenAllocation[key].toLocaleString()}</FillKeyNumbers> in <strong>{key}</strong>.
                            </FillKey>
                        }
                    >
                    <Fill 
                        percentage={tokenAllocation[key] * 100 / tokenAllocation["total"]} 
                        position={length === 1 ? "only" : filteredData.indexOf(key) === 0 ? "initial" : 
                            filteredData.indexOf(key) === (length - 1) ? "last" : ""}> {key} </Fill> 
                    </OverlayTrigger>
                    )
                }
            </TotalBar>
            <Type>{type} allocation</Type>
        </SpacingContainer>
    )
}