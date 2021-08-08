// React
import { useEffect, useState } from 'react'

// Fuse Hooks
import { useFuseTVL } from '../../../../hooks/useFuseTVL';
import { MergedPool, useFusePools } from '../../../../hooks/useFusePool';
import { usePoolRSS } from '../../../../hooks/useFuseRss';

// React Router
import { useNavigate } from 'react-router';

// Styled Components
import { BarSpan, TopBar, PoolListDiv, SearchBar, 
         SearchBarInput, SearchBarIcon, SelectPool, TVL, 
         FusePool, FusePoolSpan} from './styles';
import { SpacingContainer, InfoPair} from '../../../Shared';
         
// Icons
import Search from '../../../Shared/Icons/Search';
import Spinner from '../../../Shared/Icons/Spinner';

import './styles.css'

const FusePoolsDisplay = () => {
    // Filter
    const [filter, setFilter] = useState('')

    // Search
    const [search, setSearch] = useState('')

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setFilter(search)
        }, 3000)

        return () => clearTimeout(delayDebounce)
    }, [search])

    // Fuse TVL
    const { data: fuseTVL } = useFuseTVL();

    // Fuse pools 
    const filteredPools = useFusePools((filter === 'All' ? null : filter.toLocaleLowerCase()))
    console.log(filteredPools)

    return (
            <>
            <PoolListDiv tablehead>
                <TopBar>
                    <BarSpan>
                        <SearchBar>
                            <SearchBarIcon>
                                <Search className="search"/>
                            </SearchBarIcon>
                            <SearchBarInput type="text" onChange={(e) => setSearch(e.target.value)}/>
                        </SearchBar>
                    </BarSpan>
                    <BarSpan tvl>
                        <TVL>
                            {fuseTVL ? <InfoPair 
                                direction="column" 
                                width="100%"
                                justifyContent="center"
                                numberSize="13px"
                                number="Total value supplied across fuse"
                                altSize="30px"
                                glow={true}
                                alt={`$${fuseTVL?.toLocaleString()}`}
                                main="10px"
                                secondary="30px"
                                />: <Spinner />
                            }
                        </TVL>
                    </BarSpan>
                    <BarSpan>
                        <SelectPool onChange={(e) => setFilter(e.target.value)}>
                            <option >All</option>
                            <option >My Pools</option>
                            <option >Created Pools</option>
                        </SelectPool>
                    </BarSpan>
                </TopBar>
                <FusePool tablehead>
                    <FusePoolSpan tablehead>Pool Assets</FusePoolSpan>
                    <FusePoolSpan>Pool Number</FusePoolSpan>
                    <FusePoolSpan>Total Supplied</FusePoolSpan>
                    <FusePoolSpan>Total Borrowed</FusePoolSpan>
                    <FusePoolSpan>Risk Score</FusePoolSpan>
                </FusePool>
            </PoolListDiv>
            <PoolListDiv>
                {
                filteredPools
                  ? filteredPools.filteredPools?.length === 0
                  ? <SpacingContainer><h2>Looks like you {filter === "My Pools"? "don't have any pools" : "didn't create any pools"} </h2></SpacingContainer>
                  : filteredPools.filteredPools?.map((pool: MergedPool) => <FusePoolRow pool={pool} key={pool.pool.name}/>)
                  : <Spinner/>  
                }
            </PoolListDiv>
            </>
    )
    
}

export default FusePoolsDisplay


const FusePoolRow = ({pool}: {pool: MergedPool}) => {
    const rss = usePoolRSS(pool.id)

    const score = rss ?? "loading..."

    const navigate = useNavigate()

    const openFuse = () => {
        navigate(`../${pool.id}`)
    }

    return (
        <FusePool key={pool.pool.name} onClick={openFuse}>
            <FusePoolSpan tablehead>
                <p>{pool.pool.name}</p>
            </FusePoolSpan>
            <FusePoolSpan>
                <p>{pool.id}</p>
            </FusePoolSpan>
            <FusePoolSpan>
                <p>${pool.suppliedUSD.toLocaleString()}</p>
            </FusePoolSpan>
            <FusePoolSpan>
                <p>${pool.borrowedUSD.toLocaleString()}</p>
            </FusePoolSpan> 
            <FusePoolSpan>
                {score}
            </FusePoolSpan>
        </FusePool>
    )
}

