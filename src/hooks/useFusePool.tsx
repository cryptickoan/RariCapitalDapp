// Rari 
import { useRari } from '../context/RariProvider'
import Rari from '../sdk/rari-sdk/index'
import Fuse from '../sdk/fuse-sdk/src'
import FuseJs from "fuse.js"

// React 
import { useMemo } from 'react'


// Dependencies 
import { useQuery } from 'react-query'
import { filterOnlyObjectProperties } from '../utils/filterOnlyObjectProperties'


interface FusePool {
    name: string
    creator: string
    compotroller: string
    isPrivate: boolean
}

export interface MergedPool {
    id: number
    pool: FusePool
    underlyingTokens: string[]
    underlyingSymbols: string[]
    suppliedUSD: number
    borrowedUSD: number
}


const poolSort = (pools: MergedPool[]) => {
    return pools.sort((a, b) => {
        if(b.suppliedUSD > a.suppliedUSD) {
            return 1
        }

        if(b.suppliedUSD < a.suppliedUSD) {
            return -1
        }

        // They're equal, let's sort by pool number:
        return b.id > a.id ? 1 : -1
    })
}

export const fetchPools = async (
    {rari, fuse, address, filter}: 
    {rari: Rari, fuse: Fuse, address: string, filter: string | null})=> {
    const isMyPools = filter === "my-pools"
    const isCreatedPools = filter === "created-pools"


    const [
        {
            0: ids, 
            1: fusePools,
            2: totalSuppliedETH,
            3: totalBorrowedETH,
            4: underlyingTokens,
            5: underlyingSymbols
        },
        ethPrice,
    ] = await Promise.all([
        isMyPools ?
            fuse.contracts.FusePoolLens.methods
                .getPoolsBySupplierWithData(address)
                .call({ gas: 1e18 })
        :   isCreatedPools 
        ?   fuse.contracts.FusePoolLens.methods
                .getPoolsByAccountWithData(address)
                .call({ gas: 1e18 })   
        :   fuse.contracts.FusePoolLens.methods
                .getPublicPoolsWithData()
                .call({ gas: 1e18 }),

        rari.web3.utils.fromWei(await rari.getEthUsdPriceBN()),
    ])

    const merged: MergedPool[] = [];
    for (let id = 0; id < ids.length; id++) {
        merged.push({
            underlyingTokens: underlyingTokens[id], 
            underlyingSymbols: underlyingSymbols[id],
            pool: filterOnlyObjectProperties(fusePools[id]),
            id: ids[id],
            suppliedUSD: (totalSuppliedETH[id] / 1e18) * parseFloat(ethPrice),
            borrowedUSD: (totalBorrowedETH[id] / 1e18) * parseFloat(ethPrice)
        })
    }

    return merged
}


interface UseFusePoolsReturn {
    pools: MergedPool[] | undefined
    filteredPools: MergedPool[] | null
}

export const useFusePools = (filter: string): UseFusePoolsReturn => {
    const { state } = useRari();
    const rari = state.rari
    const fuse = state.fuse
    const address = state.address

    const isMyPools = filter === "my pools"
    const isCreatedPools = filter === "created pools"

    const { data: pools } = useQuery(
        state.address + "fusePoolList" + (isMyPools ?? isCreatedPools ? filter : ""), 
        async() => await fetchPools({rari, fuse, address, filter}) )

    const filteredPools = useMemo(() => {
        if(!pools) return null

        if(!filter) return pools

        if(isMyPools || isCreatedPools) return poolSort(pools)

        const options = {
            keys: ["pool.name", "id", "underlyingTokens", "underlyingSymbols"],
            threshold: 0.3
        }

        const filtered = new FuseJs(pools, options).search(filter)

        return poolSort(filtered.map((item)=> item.item))

    }, [pools, filter, isMyPools, isCreatedPools])
    
    console.log(pools, filteredPools)
    return { pools, filteredPools }
}

