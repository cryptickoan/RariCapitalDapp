import Fuse from '../sdk/fuse-sdk'
import BigNumber from 'bignumber.js'

export const fetchFuseTVL = async (fuse: Fuse) => {
    const {2: totalSuppliedETH} = await fuse.contracts.FusePoolLens.methods
    .getPublicPoolsWithData()
    .call({ gas: 1e18})

    return fuse.web3.utils.toBN(new BigNumber(totalSuppliedETH
        .reduce((a: number, b: string) => a + parseInt(b), 0)
        .toString())
        .toFixed(0)
    )
}