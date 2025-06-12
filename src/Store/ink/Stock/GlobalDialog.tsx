import { useContext } from "react"
import {StockContext}  from './StockContext'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import FormOutputInk from '../OutputInk/FormOutputInk'
import type { ReactNode } from "react"

type GlobalDialogProps = {
  children: ReactNode
}

export function GlobalDialog({ children }: GlobalDialogProps) {
  const { open, setOpen, numbers } = useContext(StockContext)

  return (
    <Dialog modal={false} open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-400" style={{ width: "80%" }}>
        <DialogHeader>
          <DialogTitle>Tinta requerida para produccion</DialogTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Revisa bien que coincidan los materiales con los Itmes de la orden...
          </p>
        </DialogHeader>

        <div className="mt-2 space-y-2">
          {numbers && (
            <div>
              <FormOutputInk/>
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
