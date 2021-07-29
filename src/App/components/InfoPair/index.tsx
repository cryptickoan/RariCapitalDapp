// React
import React from "react";

// Styled Components
import { SpacingContainer, StyledP } from ".."

// Dependencies
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

// Type
interface InfoPairProps {
    direction?: string
    width?: string
    height?: string
    marginBottom?: string
    justifyContent?: string
    flexBasis?: string
    numberSize?: string
    number?:string | undefined
    alt?: string
    altSize?: string
    main?: string
    secondary?: string
    glow?: boolean
    margin?: string
    over?: string
}

interface ConditionalWrapperProps {
    over?: string;
    wrapper: (children: JSX.Element) => JSX.Element;
    children: JSX.Element;
}

// ConditionalWrapper
const ConditionalWrapper = ({
    over,
    wrapper,
    children,
}: React.PropsWithChildren<ConditionalWrapperProps>) => (typeof over !== undefined ? wrapper(children) : children);

const SpacingAndP = ({props}: {props: InfoPairProps}) => {
    return (
        <SpacingContainer 
        margin={props.margin} 
        flexBasis={props.flexBasis} 
        direction={props.direction} 
        width={props.width} 
        height={props.height} 
        justifyContent={props.justifyContent} 
        marginBottom={props.marginBottom}
    >
        <StyledP 
            glow={props.glow}
            size={props.numberSize} 
            separate={props.main}
        >
            {props.number}
        </StyledP>
        <StyledP 
            size={props.altSize} 
            separate={props.secondary}
        >
            {props.alt}
        </StyledP>
    </SpacingContainer>
    )
}

const InfoPair = React.forwardRef(({over, ...rest}: InfoPairProps) => {
    console.log("infoPair", over)
    return (
        <ConditionalWrapper
            over={over}
            wrapper={children => (
                <OverlayTrigger
                    overlay={<Tooltip id={`tooltip-top`}>{over}</Tooltip>}
                    placement='top'
                >
                    {children}
                </OverlayTrigger>
                )}
        >
            <SpacingAndP props={rest}/>
        </ConditionalWrapper>
    )
})

export default InfoPair