import { createContext, useState, type FC } from "react"
import type { ReactNode } from "react"
import { toast } from "sonner"

export type filterType = {
    idProvider: number | undefined
    batchProvider: string
    internalBatch: string
    typeMaterial: string
    codeItem: string
    minRemaining: number | undefined
    maxRemaining: number | undefined
}

export const StockContext = createContext<{
    open: boolean
    setOpen: (open: boolean) => void
    numbers: number[]
    setNumbers: (numbers: number[]) => void
    refreshData: () => void
    refreshKey: number
    filter?: filterType
    setFilter?: (filter: filterType) => void
}>({
    open: false,
    setOpen: () => { },
    numbers: [],
    setNumbers: () => { },
    refreshData: () => { },
    refreshKey: 0
})

const StockProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [numbers, setNumbers] = useState<number[]>([])
    const [refreshKey, setRefreshKey] = useState(0)
    const refreshData = () => {
        setRefreshKey(prev => prev + 1)
    }
    const [filter, setFilter] = useState<filterType | undefined>(undefined)
  
    return (
        <StockContext.Provider
            value={{
                open,
                setOpen,
                numbers,
                setNumbers,
                refreshData,
                refreshKey,
                filter,
                setFilter
            }}>
            {children}
        </StockContext.Provider>
    )
}

export default StockProvider