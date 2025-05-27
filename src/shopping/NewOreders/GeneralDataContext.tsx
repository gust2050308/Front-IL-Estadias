import { createContext, useState, type FC } from "react"
import type { ReactNode } from "react"

export type TipoOrden = "tinta" | "papel"

export const GeneralDataContext = createContext<{
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

const GeneralDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [tipoOrden, setTipoOrden] = useState<TipoOrden>("tinta")

  return (
    <GeneralDataContext.Provider
      value={{ open, setOpen, tipoOrden, setTipoOrden }}
    >
      {children}
    </GeneralDataContext.Provider>
  )
}

export default GeneralDataProvider
