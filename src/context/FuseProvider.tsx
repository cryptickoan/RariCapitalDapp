import { createContext, useState, ReactNode, useContext } from "react";
import { useFusePools } from "../hooks/useFusePool";

const FuseContext = createContext<any>(null)


export const FuseContextProvider = ({children}: {children: ReactNode}) => {
    const [ filter, setFilter] = useState('')

    const { filteredPools } = useFusePools(filter)

    return <FuseContext.Provider value={filteredPools}>{children}</FuseContext.Provider>
}

export function useFuse() {
    const context = useContext(FuseContext)

    return context
}
