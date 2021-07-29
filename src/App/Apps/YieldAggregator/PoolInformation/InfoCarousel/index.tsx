// Rari
import { useRari } from '../../../../../context/RariProvider'
import { usePool, getTokenAllocation, getPoolAllocation } from '../../../../../context/PoolProvider'

// Dependencies
import Carousel from 'react-bootstrap/Carousel'
import { useQuery } from 'react-query'

// Components
import { Banner } from '../../../../components/index'
import Open from '../../../../components/Icons/Open'
import Bar from '../../../../components/Bar'
import Spinner from '../../../../components/Icons/Spinner'
import InfoPair from '../../../../components/InfoPair'
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
                            numberSize="35px"
                            number={`$${total.toLocaleString()}`}
                            glow={true}
                            altSize="15px"
                            alt="total funds in pool"
                            main="40px"
                            secondary="10px"
                            margin="0 0 10px 0"
                            />
                    </Carousel.Item>
                    <Carousel.Item>
                        <Bar tokenAllocation={tokenAllocation} type={"token"}/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Bar tokenAllocation={poolAllocation} type={"strategy"}/>
                    </Carousel.Item>
                </StyledCarousel>
            </Banner>
    )
}

export default InfoCarousel