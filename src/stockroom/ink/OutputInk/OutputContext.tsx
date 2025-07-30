import { createContext, useState, type FC } from "react";
import type { ReactNode } from "react";

export type filterType = {
    minRequestedDate: Date | undefined;
    maxRequestedDate: Date | undefined;
    idInk: number | undefined;
    type: string;
    internalBatch: string;
    minKgRequested: number | undefined;
    maxKgRequested: number | undefined;
    minKgDelivered: number | undefined;
    maxKgDelivered: number | undefined;
    whoDelivered: string;
    WhoRecibed: string;
}

export const OutputContext = createContext<{
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

const OutPutProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [numbers, setNumbers] = useState<number[]>([])
    const [refreshKey, setRefreshKey] = useState(0)
    const refreshData = () => setRefreshKey(prev => prev + 1)
    const [filter, setFilter] = useState<filterType | undefined>(undefined)

    return (
        <OutputContext.Provider
            value={{
                open,
                setOpen,
                numbers,
                setNumbers,
                refreshData,
                refreshKey,
                filter,
                setFilter
            }}
        >
            {children}
        </OutputContext.Provider>
    )

}

export default OutPutProvider