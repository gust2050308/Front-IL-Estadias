import type { ColumnDef } from "@tanstack/react-table"
import TableFormProvider, { TableFormContext } from './TableInputContext'
import { useContext } from "react"
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export type PurchaseOrder = {
    orderNumber: number
    provider: string
    requestDate: string
    deliveryDateExpected: string
    requiredBy: string
    paymentMethod: string
    shipment: string
    deliveryPlace: string
    itemsNumber: number
}

export const columns: ColumnDef<PurchaseOrder>[] = [
    {
        accessorKey: 'orderNumber',
        header: 'No. Orden'
    }, {
        accessorKey: 'provider',
        header: 'Poveedor'
    }, {
        accessorKey: 'requestDate',
        header: 'Fecha de Solicitud'
    }, {
        accessorKey: 'deliveryDateExpected',
        header: 'Fecha Eperada'
    }, {
        accessorKey: 'requiredBy',
        header: 'Requerido por'
    }, {
        accessorKey: 'paymentMethod',
        header: 'Metodo de pago'
    }, {
        accessorKey: 'shipment',
        header: 'Embarque'
    }, {
        accessorKey: 'deliveryPlace',
        header: 'Lugar de entrega'
    }, {
        accessorKey: 'itemsNumber',
        header: 'No. de items'
    }, {
        id: "userActions",
        cell: ({ row }) => {
            const entry = row.original
            const { open, setOpen } = useContext(TableFormContext)

            return (
                <TableFormProvider>
                    <div className="flex items-center space-x-2">
                        <Dialog modal={false} onOpenChange={setOpen} open={open}>
                            <DialogTrigger asChild>
                                <button className="bg-black font-bold w-30 h-8 rounded-[10px] text-white flex justify-center items-center">
                                    <h1 className="m-1.5">Items</h1>
                                </button>
                            </DialogTrigger>
                            <DialogContent contentClassName="max-w-[600]" style={{ width: "60%" }}>
                                <DialogHeader>
                                    <div className='flex flex-row justify-between'>
                                        <div className="flex flex-col">
                                            <DialogTitle>Nueva orden de compra</DialogTitle>
                                            <p className="text-sm text-muted-foreground mt-2">Llena todos los campos para poder realizar la orden</p>
                                        </div>
                                    </div>
                                </DialogHeader>
                                <div className="flex justify-end gap-4 mt-6">
                                    <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </TableFormProvider>
            )
        }
    },]