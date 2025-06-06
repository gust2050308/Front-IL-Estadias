import { createContext, useState, type FC } from "react"
import type { ReactNode } from "react"

export const TableFormContext = createContext<{
  open: boolean
  setOpen: (open: boolean) => void
  selectedRow: any | null
  setSelectedRow: (row: any) => void
  orderData: any | null
  setOrderData: (data: any) => void
}>({
  open: false,
  setOpen: () => {},
  selectedRow: null,
  setSelectedRow: () => {},
  orderData: null,
  setOrderData: () => {},
})


const TableFormProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [orderData, setOrderData] = useState<any | null>(null)

  return (
    <TableFormContext.Provider
      value={{ open, setOpen, selectedRow, setSelectedRow, orderData, setOrderData }}>
      {children}
    </TableFormContext.Provider>
  )
}

export default TableFormProvider
