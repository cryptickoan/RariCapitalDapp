import styled from 'styled-components'

export const StyledError = styled.p`
    font-size: 15px;
    font-family: 'neuropol-nova';
    color: red;
    text-shadow: 0px 2px 3px red, 2px 0px 3px red;
    max-width: 80%;
    align-self: center;
    margin-bottom: 15px;
    margin-top: 5px;
`

const ErrorMessage = (e: any) => {
    return e === "" ? null : <StyledError>{e.error}</StyledError>
}

export default ErrorMessage