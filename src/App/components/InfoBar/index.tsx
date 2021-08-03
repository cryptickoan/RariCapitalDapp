import React, { FC } from 'react'
import { Card, SpacingContainer } from "../."
import Spinner from '../Icons/Spinner'

export type InfoBarProps =  {
    // Fields displayed in the bar
    data: string[] | undefined

    // Action when bar is clicked
    onClick: () => void

    // Width and height of the bar
    width: string
    height: string
}

const InfoBar: FC<InfoBarProps> = ({data, onClick, width, height}: InfoBarProps) => {
    return (
        <Card onClick={onClick} width={width} minHeight={height} justifyContent="space-around" cursor="pointer" borderRadius={"15px"} diffOnHover>

            { !data 
            ? <Spinner /> 

            : data.map((piece) => 

                <SpacingContainer key={piece} flexBasis={((100 / data.length) / 100).toString()}>
                    <p>{piece}</p>
                </SpacingContainer>
            )
            }
            
        </Card>
    )
}

export default InfoBar  