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

    // On hover effect if its displaying clickable info
    diffOnHover?: boolean
}

const InfoBar: FC<InfoBarProps> = ({data, onClick, width, height, diffOnHover}: InfoBarProps) => {
    return (
        <Card onClick={onClick} width={width} height={height} justifyContent="space-around" cursor={diffOnHover ? "pointer" : undefined} borderRadius="15px" diffOnHover={diffOnHover ?? undefined}>

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