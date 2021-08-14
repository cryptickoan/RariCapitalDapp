// React Bootstrap
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

//Hooks
import useGovernance from "./hooks/useGovernance"

// Remove Markdown
import removeMd from 'remove-markdown'

// Styled Components
import { StyledP, SpacingContainer } from '../../../../Shared'
import { ProposalContainer, StatusDiv } from '../../styles'

// Icons
import Spinner from '../../../../Shared/Icons/Spinner'

const Proposals = () => {
    const Snap: {[key: string]: []} = useGovernance()
    return (
        <>
        <SpacingContainer height="100%" maxHeight="22vw" margin="2% 0 2% 0" direction="column" justifyContent="flex-start" overflowY="scroll">
            <StyledP size="1vw" opacity="0.4" margin="2% 0 2% 0"><strong>Recent Proposals</strong></StyledP>
            { !Snap ?  <Spinner/> : Snap.proposals.map((proposal: any) => proposal.title === 'Hello World' ? null : <Proposal proposal={proposal}/>) }
        </SpacingContainer>
        </>
    )
}

export default Proposals

const Proposal = ({proposal}: any) => {
    return (
        <OverlayTrigger
            key='top'     
            placement='top'
            overlay={
                <Tooltip id="tooltip-top">Click to visit proposal</Tooltip>
            }        
        >
            <a id="proposal" href={`https://snapshot.org/#/rari/proposal/${proposal.id}`} target="_blank" rel="noreferrer">
            <ProposalContainer direction="column" active={proposal.state} margin="0 0 4% 0" width="80%" padding="3% 5%">
                <StyledP size="0.9vw" separate="1.5vw"><strong>{proposal.title}</strong></StyledP>
                <StyledP size="0.9vw" textAlign="justify" neuropolNova separate="1vw">{removeMd((proposal.body).slice(0,150)).replace('Summary', '')}...</StyledP>
                <SpacingContainer margin="10px 0 0 0">
                    <StatusDiv active={proposal.state}>{proposal.state}</StatusDiv>
                </SpacingContainer>
            </ProposalContainer>
            </a>
        </OverlayTrigger>
    )
}