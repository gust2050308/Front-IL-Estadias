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
      className="bg-[#807B7B] font-bold w-auto h-8 rounded-[10px] text-white flex justify-center items-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M13 19.3v-6.7l6-3.4V13c.7 0 1.4.1 2 .4V7.5c0-.4-.2-.7-.5-.9l-7.9-4.4c-.2-.1-.4-.2-.6-.2s-.4.1-.6.2L3.5 6.6c-.3.2-.5.5-.5.9v9c0 .4.2.7.5.9l7.9 4.4c.2.1.4.2.6.2s.4-.1.6-.2l.9-.5c-.3-.6-.4-1.3-.5-2M12 4.2l6 3.3l-2 1.1l-5.9-3.4zm-1 15.1l-6-3.4V9.2l6 3.4zm1-8.5L6 7.5l2-1.2l6 3.5zm8 4.2v3h3v2h-3v3h-2v-3h-3v-2h3v-3z"></path></svg>    </Button>
  )
}
