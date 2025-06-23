import { createContext, useState, type FC } from "react"
import type { ReactNode } from "react"

export const StockContext = createContext<{
    open: boolean
    setOpen: (open: boolean) => void
    numbers: number[]
    setNumbers: (numbers: number[]) => void
    addNumber: (id: number) => void
    removeNumber: (id: number) => void
    toggleNumber: (id: number) => void // Sin el signo de interrogación
    refreshData: () => void
    refreshKey: number
}>({
    open: false,
    setOpen: () => { },
    numbers: [],
    setNumbers: () => { },
    addNumber: () => { },
    removeNumber: () => { },
    toggleNumber: () => { },
    refreshData: () => { },
    refreshKey: 0
})

const StockProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [numbers, setNumbers] = useState<number[]>([])
    const [refreshKey, setRefreshKey] = useState(0)
    const refreshData = () => setRefreshKey(prev => prev + 1)


    const addNumber = (id: number) => {
        setNumbers(prev =>
            prev.includes(id) ? prev : [...prev, id]
        )
    }

    const removeNumber = (id: number) => {
        setNumbers(prev => prev.filter(n => n !== id))
    }

    const toggleNumber = (id: number) => {
        setNumbers(prev =>
            prev.includes(id)
                ? prev.filter(n => n !== id)
                : [...prev, id]
        )
    }

    return (
        <StockContext.Provider
            value={{
                open,
                setOpen,
                numbers,
                setNumbers,
                addNumber,
                removeNumber,
                toggleNumber,
                refreshData,
                refreshKey
            }}>
            {children}
        </StockContext.Provider>
    )
}

export default StockProvider