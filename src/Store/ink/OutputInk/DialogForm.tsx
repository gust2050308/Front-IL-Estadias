import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { OutputContext } from "./OutputContext"
import { useContext, useEffect, useState, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import  FormDevolucion  from '../InputInk/FormDevolucion' 

type DialogFormProps = {
    children: ReactNode
}

export default function DialogForm({children}: DialogFormProps) {

    const { open, setOpen, numbers } = useContext(OutputContext)

    return (
        <div>
            <Dialog modal={false} open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-400" style={{ width: "80%" }}>
                    <DialogHeader>
                        <DialogTitle>Sobrantes de material</DialogTitle>
                        <p className="text-sm text-muted-foreground mt-2">
                            Registra las devoluciones de aquellos insumos que salieron a produccion
                        </p>
                    </DialogHeader>

                    <div className="mt-2 space-y-2">

                        <div>
                            <FormDevolucion/>
                        </div>

                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
