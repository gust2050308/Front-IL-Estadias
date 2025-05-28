import type { ColumnDef, Row } from "@tanstack/react-table"
import { TableFormContext } from './TableInputContext'
import { useContext } from "react"
import { Button } from '@/components/ui/button'

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
    header: 'Proveedor'
  }, {
    accessorKey: 'requestDate',
    header: 'Fecha de Solicitud'
  }, {
    accessorKey: 'deliveryDateExpected',
    header: 'Fecha Esperada'
  }, {
    accessorKey: 'requiredBy',
    header: 'Requerido por'
  }, {
    accessorKey: 'paymentMethod',
    header: 'Método de pago'
  }, {
    accessorKey: 'shipment',
    header: 'Embarque'
  }, {
    accessorKey: 'deliveryPlace',
    header: 'Lugar de entrega'
  }, {
    accessorKey: 'itemsNumber',
    header: 'No. de ítems'
  }, {
    id: "userActions",
    cell: ({ row }) => <VerItemsButton row={row} />
  },
]

type VerItemsButtonProps = {
  row: Row<PurchaseOrder>
}

function VerItemsButton({ row }: VerItemsButtonProps) {
  const { setOpen, setSelectedRow } = useContext(TableFormContext)

  return (
    <Button
      onClick={() => {
        setSelectedRow(row.original)
        setOpen(true)
        console.log("row.original", row.original)
      }}
      className="bg-black font-bold w-30 h-8 rounded-[10px] text-white flex justify-center items-center"
    >
      <h1 className="m-1.5">Ver items</h1>
    </Button>
  )
}
