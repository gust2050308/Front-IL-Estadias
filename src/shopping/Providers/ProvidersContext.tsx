import { createContext, useState, type FC } from "react"
import type { ReactNode } from "react"

export type ProviderType = "TINTA" | "PAPEL" | "AUXILIARES";

export const ProviderContext = createContext<{
    open : boolean
    setOpen : ( open: boolean) => void
    openEdit: boolean
    setOpenEdit: (open: boolean) => void
    numbers: number
    setNumbers: (numbers: number) => void
    refreshData: () => void
    refreshKey: number
    selectedType : ProviderType
    setSelectedType : ( providerType : ProviderType  ) => void
}>({
    open : false,
    setOpen : () => {},
    openEdit: false,
    setOpenEdit: () => { },
    numbers: 0,
    setNumbers: () => { },
    refreshData: () => { },
    refreshKey: 0,
    selectedType : 'TINTA',
    setSelectedType :() =>{}
})

const ProviderContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [numbers, setNumbers] = useState<number>(0)
    const [refreshKey, setRefreshKey] = useState(0)
    const refreshData = () => {
        setRefreshKey(prev => prev + 1)
    }
    const [selectedType,setSelectedType] =useState<ProviderType> ('TINTA')
    
    return (
        <ProviderContext.Provider
            value={{
                open,
                setOpen,
                openEdit,
                setOpenEdit,
                numbers,
                setNumbers,
                refreshData,
                refreshKey,
                selectedType,
                setSelectedType,
            }}
        >
            {children}
        </ProviderContext.Provider>
    )
}

export default ProviderContextProvider