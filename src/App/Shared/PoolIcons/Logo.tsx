// Rari //
import { Pool } from '../../../context/PoolProvider'

// Dependencies //
import USDC from './USDC'
import DAI from './DAI'
import ETH from './ETH'

const Logo = ({pool, className}: {pool: Pool, className: string}) => {
    switch(pool) {
        case Pool.USDC:
            return <USDC className={className}/>
        case Pool.DAI:
            return <DAI className={className}/>
        case Pool.ETH:
            return <ETH className={className}/>
        default:
            return null
    }
}

export default Logo 