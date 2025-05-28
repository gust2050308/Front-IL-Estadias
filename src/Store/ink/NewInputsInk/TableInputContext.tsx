import { createContext, useState, type FC } from "react"
import type { ReactNode } from "react"

export const TableFormContext = createContext<{
  open: boolean
  setOpen: (open: boolean) => void
  selectedRow: any | null
  setSelectedRow: (row: any) => void
}>({
  open: false,
  setOpen: () => {},
  selectedRow: null,
  setSelectedRow: () => {},
})


const TableFormProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)

  return (
    <TableFormContext.Provider
      value={{ open, setOpen, selectedRow, setSelectedRow }}
    >
      {children}
    </TableFormContext.Provider>
  )
}

export default TableFormProvider
