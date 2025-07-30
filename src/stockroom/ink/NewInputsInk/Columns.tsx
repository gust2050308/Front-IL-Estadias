import type { ColumnDef, Row } from "@tanstack/react-table"
import { TableFormContext } from './TableInputContext'
import { useContext } from "react"
import { Button } from '@/components/ui/button'

export type PurchaseOrder = {
  purchaseOrderNumber: number
  providerName: string
  requestDate: string
  deliveryDateExpected: string
  requiredBy: string
  paymentMethod: string
  shipment: string
  deliveryPlace: string
  totalItems: number
  itemsArrived: number
}
export const columns: ColumnDef<PurchaseOrder>[] = [
  {
    accessorKey: 'purchaseOrderNumber',
    header: ({ column }) => (
      <div className="cursor-pointer px-0 text-center" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        No. Orden
      </div>
    ),
    cell: ({ row }) => {
      return(
        <div className='w-full text-center'>
          {row.original.purchaseOrderNumber}
        </div>
      )
    },
    enableSorting: true,
  },
  {
    accessorKey: 'providerName',
    header: ({ column }) => (
      <div className="cursor-pointer px-0" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Proveedor
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'requestDate',
    header: ({ column }) => (
      <div className="cursor-pointer px-0" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Fecha de Solicitud
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'deliveryDateExpected',
    header: ({ column }) => (
      <div className="cursor-pointer px-0" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Fecha Esperada
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'requiredBy',
    header: ({ column }) => (
      <div className="cursor-pointer px-0" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Requerido por
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'paymentMethod',
    header: ({ column }) => (
      <div className="cursor-pointer px-0" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Método de pago
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'shipment',
    header: ({ column }) => (
      <div className="cursor-pointer px-0" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Embarque
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'deliveryPlace',
    header: ({ column }) => (
      <div className="cursor-pointer px-0" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Lugar de entrega
      </div>
    ),
    enableSorting: true,
  },
  {
    id: 'itemsRatio',
    accessorFn: row => row.totalItems === 0 ? 0 : row.itemsArrived / row.totalItems,
    header: ({ column }) => (
      <div className="cursor-pointer px-0" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        No. de ítems
      </div>
    ),
    cell: ({ row }) => {
      const { itemsArrived, totalItems } = row.original;
      const complete = itemsArrived === totalItems;
      const ratio = totalItems === 0 ? 0 : (itemsArrived / totalItems) * 100;
      return (
        <div className="text-center font-medium">
          <div className='w-3/4 bg-blue-200 rounded-sm'>
            <span className='text-blue-700'>
              {`${itemsArrived}/${totalItems}`} ({Math.round(ratio)}%)
            </span>
          </div>
        </div>
      );
    },
    enableSorting: true,
  },
  {
    id: "userActions",
    cell: ({ row }) => <VerItemsButton row={row} />,
    enableSorting: false, // No se ordenan acciones
  },
];


type VerItemsButtonProps = {
  row: Row<PurchaseOrder>
}

function VerItemsButton({ row }: VerItemsButtonProps) {
  const { setOpen, setSelectedOrder, selectedOrder } = useContext(TableFormContext)

  return (
    <Button
      onClick={() => {
        setSelectedOrder(row.original.purchaseOrderNumber)
        console.log(selectedOrder)
        setOpen(true)
      }}
      className="bg-[#807B7B] font-bold w-auto h-8 rounded-[10px] text-white flex justify-center items-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M13 19.3v-6.7l6-3.4V13c.7 0 1.4.1 2 .4V7.5c0-.4-.2-.7-.5-.9l-7.9-4.4c-.2-.1-.4-.2-.6-.2s-.4.1-.6.2L3.5 6.6c-.3.2-.5.5-.5.9v9c0 .4.2.7.5.9l7.9 4.4c.2.1.4.2.6.2s.4-.1.6-.2l.9-.5c-.3-.6-.4-1.3-.5-2M12 4.2l6 3.3l-2 1.1l-5.9-3.4zm-1 15.1l-6-3.4V9.2l6 3.4zm1-8.5L6 7.5l2-1.2l6 3.5zm8 4.2v3h3v2h-3v3h-2v-3h-3v-2h3v-3z"></path></svg>    </Button>
  )
}
