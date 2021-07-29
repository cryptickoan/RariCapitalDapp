// Fuse 
import { useFuseTVL } from '../../../../hooks/useFuseTVL';
import { MergedPool } from '../../../../hooks/useFusePool';
import { usePoolRSS, getScore } from '../../../../hooks/useFuseRss';

// Dependencies
import { useNavigate } from 'react-router';
import { BarSpan, TopBar, PoolListDiv, SearchBar, 
         SearchBarInput, SearchBarIcon, SelectPool, TVL, 
         FusePool, FusePoolSpan} from './styles';


// Icons
import Search from '../../../components/Icons/Search';
import Spinner from '../../../components/Icons/Spinner';

import './styles.css'
import { useFuse } from '../../../../context/FuseProvider';

// Components
import { InfoPair } from '../../../components';

const FusePoolsDisplay = () => {
    // Fuse TVL
    const { data: fuseTVL } = useFuseTVL();

    // Fuse pools 
    const filteredPools = useFuse()

    return (
            <>
            <PoolListDiv tablehead>
                <TopBar>
                    <BarSpan>
                        <SearchBar>
                            <SearchBarIcon>
                                <Search className="search"/>
                            </SearchBarIcon>
                            <SearchBarInput type="text"/>
                        </SearchBar>
                    </BarSpan>
                    <BarSpan tvl>
                        <TVL>
                            {fuseTVL ? <InfoPair 
                                direction="column" 
                                width="100%"
                                justifyContent="space-evenly"
                                numberSize="15px"
                                number="Total value supplied across fuse"
                                altSize="35px"
                                glow={true}
                                alt={`$${fuseTVL?.toLocaleString()}`}
                                main="10px"
                                secondary="35px"
                                />: <Spinner />
                            }
                        </TVL>
                    </BarSpan>
                    <BarSpan>
                        <SelectPool>
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
                  filteredPools ? 
                  filteredPools.map((pool: MergedPool) => <FusePoolRow pool={pool} key={pool.pool.name}/>)
                  : <Spinner/>
                }
            </PoolListDiv>
            </>
    )
    
}

export default FusePoolsDisplay


const FusePoolRow = ({pool}: any) => {
    const rss = usePoolRSS(pool.id)

    const score = rss ? getScore(rss.totalScore) : "loading..."

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
                <p>{pool.suppliedUSD.toLocaleString()}</p>
            </FusePoolSpan>
            <FusePoolSpan>
                <p>{pool.borrowedUSD.toLocaleString()}</p>
            </FusePoolSpan> 
            <FusePoolSpan>
                {score}
            </FusePoolSpan>
        </FusePool>
    )
}

