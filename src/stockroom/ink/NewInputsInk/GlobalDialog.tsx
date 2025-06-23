import { useContext } from "react"
import { TableFormContext } from './TableInputContext'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import MainForm from "./MainForm"
import type { ReactNode } from "react"

type GlobalDialogProps = {
  children: ReactNode
}

export function GlobalDialog({ children }: GlobalDialogProps) {
  const { open, setOpen, selectedRow } = useContext(TableFormContext)

  return (
    <Dialog modal={false} open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-400" style={{ width: "80%" }}>
        <DialogHeader>
          <DialogTitle>Registrar items de orden de compra</DialogTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Revisa bien que coincidan los materiales con los Itmes de la orden...
          </p>
        </DialogHeader>

        <div className="mt-2 space-y-2">
          {selectedRow && (
            <div>
              <MainForm>
                {children}
              </MainForm> 
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
