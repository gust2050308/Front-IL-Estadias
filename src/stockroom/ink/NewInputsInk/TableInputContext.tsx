import { createContext, useState, type FC } from "react"
import type { ReactNode } from "react"

export type filterType = {
  
}

export const TableFormContext = createContext<{
  open: boolean
  setOpen: (open: boolean) => void
  selectedOrder: number
  setSelectedOrder: (row: number) => void
  orderData: any | null
  setOrderData: (data: any) => void
  refreshData: () => void
  refreshKey: number
  filter?: filterType
  setFilter?: (filter: filterType) => void
}>({
  open: false,
  setOpen: () => { },
  selectedOrder: 0,
  setSelectedOrder: () => { },
  orderData: null,
  setOrderData: () => { },
  refreshData: () => { },
  refreshKey: 0
})

const TableFormProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<number>(0)
  const [orderData, setOrderData] = useState<any | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const refreshData = () => setRefreshKey(prev => prev + 1)
  const [filter, setFilter] = useState<filterType | undefined>(undefined)

  return (
    <TableFormContext.Provider
      value={{
        open,
        setOpen,
        selectedOrder,
        setSelectedOrder,
        orderData,
        setOrderData,
        refreshData,
        refreshKey,
        filter,
        setFilter
      }}>
      {children}
    </TableFormContext.Provider>
  )
}

export default TableFormProvider
