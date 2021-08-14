import styled from 'styled-components'

interface SpacingContainerProps {
    width?: string
    height?: string

    minHeight?: string
    maxHeight?: string
    
    flexBasis?: string

    display?: string
    direction?: string
    justifyContent?: string
    alignContent?: string
    alignItems?: string
    alignSelf?: string

    marginBottom?: string
    margin?: string
    padding?: string
    paddingBottom?: string
    
    position?: string
    top?: string

    overflowY?: string
    overflowX?: string

    color?: string
    textAlign?: string
    
    cursor?: string
}

export const SpacingContainer = styled.div<SpacingContainerProps>`
    width: ${props => props.width ?? "100%"};
    height: ${props => props.height ?? "100%"};

    max-height: ${props => props.maxHeight};
    min-height: ${props => props.minHeight};

    display: ${props => props.display ?? "flex"};
    flex-direction ${props => props.direction ?? "row"};
    align-content:  ${props => props.alignContent ?? "center"};
    align-items:  ${props => props.alignItems ?? "center"};
    justify-content: ${props => props.justifyContent ?? "center"};

    flex-basis: ${props => props.flexBasis};
    align-self: ${props => props.alignSelf};

    overflow-y: ${props => props.overflowY};
    overflow-x: ${props => props.overflowX};

    color: ${props => props.color ?? props.theme.light ? "black" :"white" };
    text-align: ${props => props.textAlign};

    margin-bottom: ${props => props.marginBottom ?? "0"};
    margin: ${props => props.margin};
    padding: ${props => props.padding};
    padding-bottom: ${props => props.paddingBottom};

    position: ${props => props.position};
    top: ${props => props.top};

    cursor: ${props => props.cursor};
`