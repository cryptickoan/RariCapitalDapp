import styled from 'styled-components'

// Types
interface ButtonProps {
    readonly name?: string
    readonly action?: string
    readonly error: string
    readonly width?: boolean
};

interface InputProps {
    readonly input: string;
}

// WithdrawDepositButton
export const ActionButton = styled.button<ButtonProps>`
    width: ${props => props.width ? "100%" : "50%" };
    height: 30px;
    border: none; 

    font-family: 'Orbitron';
    font-size: 12px;
    z-index: ${props => props.action === props.name ? "1" : "2"};

    ${props => props.name === "deposit" ? 
    "border-radius: 0px 3px 3px 0px;" 
    : "border-radius: 3px 0px 0px 3px; "}

    background-color: ${props => props.theme.light ?  "white" :"black"};
    color: ${props => props.theme.light ?  "black" : "white" };

    ${props => props.action === props.name ? 
                    props.error.length > 2 ? "box-shadow: 0 0 20px 10px red; border: none !important; color: red !important;" :
                    "box-shadow: 0 0 10px #B8FF71 ; border: none !important;" : ""
    }
`

// ActionForm //
export const ActionFormInput = styled.input<InputProps>`
    font: 400 1vw 'Orbitron';
    border: 1px solid;
    max-width: ${props => props.input === "search" ? "70%" : "60%"};
    min-height: 40px;
    padding: 5px 15px;
    box-sizing: unset !important;

    ${props => props.input === "input" ?
    "border-right: none; border-radius: 8px 0px 0px 8px; " 
    : props => props.input === "search" ? "border-radius: 8px;" :
    "border-left: none; border-radius: 0px 8px 8px 0px; "   
    }
        
    background-color: ${({ theme }) => theme.light ?  "#C4C4C4" : "#404040"};
    border-color: ${({ theme }) => theme.light ? "#C4C4C4" : "#404040" };
    color: ${({ theme }) => theme.light ? "black" : "white"}
`

export const ActionFormCurrencyButton = styled.button<InputProps>`
    font: 400 20px 'Orbitron';
    border: 1px solid;
    max-width: 40%;
    min-height: 40px;
    padding: 5px 15px;
    box-sizing: unset !important;


    border-left: none; border-radius: 0px 8px 8px 0px;
        
    background-color: ${({ theme }) => theme.light ?  "#C4C4C4" : "#404040"};
    border-color: ${({ theme }) => theme.light ? "#C4C4C4" : "#404040" };
    color: ${({ theme }) => theme.light ? "black" : "white"}
`
// ConfirmationButton
export const ConfirmationSpan = styled.div`
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
`

type ConfirmationButtonProps = {
    width?: string
    height?: string
    fontSize?: string
    dark?: boolean
}

export const ConfirmationButton = styled.button<ConfirmationButtonProps>`
    font: 400 'Orbitron';
    font-size: ${props => props.fontSize ?? "15px"};
    height: ${props => props.height ?? "35px"};
    width: ${props => props.width ?? "80px" };
    border: none;
    border-radius: 8px;

    background-color: ${props => props.dark ? props.theme.light ? "white" : "black" : "#B8FF71"};
    color: ${props => props.dark ? props.theme.light ? "black" : "white" : "black"};
    box-shadow: ${props => props.dark ? props.theme.light ? "0 0 18px #B8FF71" : "0 0 15px #B8FF71" : null}
`
