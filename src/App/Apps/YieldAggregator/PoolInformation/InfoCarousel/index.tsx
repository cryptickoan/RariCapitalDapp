// Rari
import { useRari } from '../../../../../context/RariProvider'
import { usePool, getTokenAllocation, getPoolAllocation } from '../../../../../context/PoolProvider'

// React Bootstrap
import Carousel from 'react-bootstrap/Carousel'

// React Query
import { useQuery } from 'react-query'

// Components
import { Banner, Bar, InfoPair, SpacingContainer} from '../../../../Shared/index'
import Open from '../../../../Shared/Icons/Open'
import Spinner from '../../../../Shared/Icons/Spinner'
import { StyledCarousel } from './styles'

const InfoCarousel = () => {
    // Get Rari //
    const { title } = usePool()
    const { state } = useRari()

    // Get Data //
    const {status, data: tokenAllocation} = useQuery(title + " pool token allocation", async () => {
        const allocation: ({[key: string]: number}) = await getTokenAllocation(title, state.rari)
        return allocation
    })

    const {status: poolStat, data: poolAllocation} = useQuery(title + " pool strategy allocation", async () => {
        const allocation: ({[key: string]: number})= await getPoolAllocation(title, state.rari)
        return allocation
    })

    if (status === 'loading' || !tokenAllocation || poolStat === 'loading' || !poolAllocation) {
        return <Spinner />
    }  

    let total = tokenAllocation.total
    

    return (
        
            <Banner carousel>
                <StyledCarousel 
                    indicators={false} 
                    interval={500000} 
                    nextIcon={<Open setOpen={() => null} className="carouselNext" />} 
                    prevIcon={<Open setOpen={() => null} className="carouselPrev"/>}
                >
                    <Carousel.Item>
                        <InfoPair 
                            direction="column" 
                            numberSize="2vw"
                            number={`$${total.toLocaleString()}`}
                            glow={true}
                            altSize="1vw"
                            alt="total funds in pool"
                            main="2.5vw"
                            secondary="0.5vw"
                            margin="0 0 10px 0"
                            />
                    </Carousel.Item>
                    <Carousel.Item>
                        <SpacingContainer>
                            <Bar tokenAllocation={tokenAllocation} type={"token"}/>
                        </SpacingContainer>
                    </Carousel.Item>
                    <Carousel.Item>
                        <SpacingContainer>
                            <Bar tokenAllocation={poolAllocation} type={"strategy"}/>
                        </SpacingContainer>
                    </Carousel.Item>
                </StyledCarousel>
            </Banner>
    )
}

export default InfoCarousel