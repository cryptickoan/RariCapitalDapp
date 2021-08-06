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
    width: ${props => props.width ? "100%" : "30%" };
    height: 30px;
    border: none; 

    font-family: 'Orbitron';
    font-size: 12px;
    z-index: ${props => props.action === props.name ? "1" : "2"};

    ${props => props.name === "deposit" ? 
    "border-radius: 0px 3px 3px 0px;" 
    : "border-radius: 3px 0px 0px 3px; "}

    background-color: ${props => props.theme.light ?  "#F0F0F0" :"#000000"};
    color: ${props => props.theme.light ?  "black" : "white" };

    ${props => props.action === props.name ? 
                    props.error.length > 2 ? "box-shadow: 0 0 20px 10px red; border: none !important; color: red !important;" :
                    "box-shadow: 0 0 10px #B8FF71 ; border: none !important;" : ""
    }
`

// ActionForm //
export const ActionFormInput = styled.input<InputProps>`
    font: 400 20px 'Orbitron';
    border: 1px solid;
    max-width: ${props => props.input === "search" ? "70%" : "40%"};
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

export const PoolWarning = styled.p`
    font-size: 13px;
    opacity: .4;
    margin-top: 8px;
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
}

export const ConfirmationButton = styled.button<ConfirmationButtonProps>`
    font: 400 15px 'Orbitron';
    height: ${props => props.height ?? "35px"};
    width: ${props => props.width ?? "80px" };
    border: 1px solid;
    border-radius: 8px;

    background-color: #B8FF71;
    border-color: #B8FF71;
    color: black;
`
