import { createContext,useState, type FC } from "react";
import type { ReactNode } from "react";

export const OutputContext = createContext<{
    open: boolean
    setOpen: (open: boolean) => void
    numbers : number[]
    setNumbers: (numbers : number[]) => void
    refreshData: () => void
    refreshKey: number
}>({
    open:false,
    setOpen: () => {},
    numbers:[],
    setNumbers: () => {},
    refreshData: () => {},
    refreshKey: 0
})

const OutPutProvider : FC <{children : ReactNode}> = ({ children }) =>{
    const [open,setOpen] = useState(false)
    const [numbers,setNumbers] = useState<number[]>([])
     const [refreshKey, setRefreshKey] = useState(0)
    const refreshData = () => setRefreshKey(prev => prev + 1)

    return(
        <OutputContext.Provider 
        value={{
            open,
            setOpen,
            numbers,
            setNumbers,
            refreshData,
            refreshKey
        }}
        >
            {children}
        </OutputContext.Provider>
    )

}

export default OutPutProvider