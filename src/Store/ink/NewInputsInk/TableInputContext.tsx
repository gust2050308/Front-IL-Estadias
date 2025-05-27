import { createContext, useState, type FC } from "react"
import type { ReactNode } from "react"

export type TipoOrden = "tinta" | "papel"

export const TableFormContext = createContext<{
  open: boolean
  setOpen: (open: boolean) => void
  tipoOrden: TipoOrden
  setTipoOrden: (t: TipoOrden) => void
}>({
  open: false,
  setOpen: () => {},
  tipoOrden: "tinta",
  setTipoOrden: () => {},
})

const TableFormProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [tipoOrden, setTipoOrden] = useState<TipoOrden>("tinta")

  return (
    <TableFormContext.Provider
      value={{ open, setOpen, tipoOrden, setTipoOrden }}
    >
      {children}
    </TableFormContext.Provider>
  )
}

export default TableFormProvider
