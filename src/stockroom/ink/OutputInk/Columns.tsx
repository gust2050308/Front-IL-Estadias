import type { ColumnDef, Row, Table } from "@tanstack/react-table"
import { Checkbox } from '@/components/ui/checkbox'
import { useContext } from "react"
import { OutputContext } from "./OutputContext"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export type OutPut = {
    idOutputInk: number,
    date: string,
    production: number,
    idInk: number,
    typeMaterial: string,
    internalBatch: string,
    kilogramsRequired: number,
    kilogramsDelivered: number,
    whoDelivers: string,
    whoReceives: string,
    returnedKilogramsRequired: number
}

const SelectHeader = ({ table }: { table: any }) => {
    return (
        <Checkbox
            checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Seleccionar todos"
        />
    );
};

const SelectCell = ({ row }: { row: Row<OutPut> }) => {
    return (
        <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Seleccionar fila"
        />
    );
};

export const columns: ColumnDef<OutPut>[] = [
    {
        id: "select",
        header: ({ table }) => <SelectHeader table={table} />,
        cell: ({ row }) => <SelectCell row={row} />
    },
    {
        accessorKey: 'idOutputInk',
        header: ({ column }) => (
            <div
                className='cursor-pointer px-0'
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                ID
            </div>
        ),
    },
    {
        accessorKey: 'date',
        header: ({ column }) => (
            <div
                className='cursor-pointer px-0'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Fecha
            </div>
        ),
    },
    {
        accessorKey: 'production',
        header: ({ column }) => (
            <div
                className='cursor-pointer px-0'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                No. Producción
            </div>
        ),
    },
    {
        accessorKey: 'idInk',
        header: ({ column }) => (
            <div
                className='cursor-pointer px-0'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Tinta ID
            </div>
        ),
    },
    {
        accessorKey: 'typeMaterial',
        header: ({ column }) => (
            <div
                className='cursor-pointer px-0'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Tipo
            </div>
        )
    },
    {
        accessorKey: 'internalBatch',
        header: ({ column }) => (
            <div
                className='cursor-pointer px-0'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Lote Interno
            </div>
        ),
    },
    {
        accessorKey: 'kilogramsRequired',
        header: ({ column }) => (
            <div
                className='cursor-pointer px-0'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Kg's Requeridos
            </div>
        ),
    },
    {
        accessorKey: 'kilogramsDelivered',
        header: ({ column }) => (
            <div
                className='cursor-pointer px-0'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Kg's Entregados
            </div>
        ),
    },
    {
        accessorKey: 'whoDelivers',
        header: ({ column }) => (
            <div
                className='cursor-pointer px-0'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Quien Entrega
            </div>
        ),
    },
    {
        accessorKey: 'whoReceives',
        header: ({ column }) => (
            <div
                className='cursor-pointer px-0'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Quien Recibió
            </div>
        ),
    },
    {
        accessorKey: 'returnedKilogramsRequired',
        header: ({ column }) => (
            <div
                className='cursor-pointer px-0'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Kg's Devueltos
            </div>
        ),
    },
    {
        id: "actions",
        cell: ({ row, table }) => <OutputActions row={row} table={table} />
    }
]

type OutputActionsProps = {
    row: Row<OutPut>
    table: Table<OutPut>
}
function OutputActions({ row, table }: OutputActionsProps) {

    const { setOpen, numbers, setNumbers } = useContext(OutputContext)

    return (
        <div
            className="text-white bg-gray-200 hover:bg-transparent hover:text-white m-0 p-0 w-5 h-5 transition-colors cursor-pointer"
            onClick={() => {
                setOpen(true);
                const selectedIds = table
                    .getSelectedRowModel()
                    .rows.map(row => row.original.idInk);
                setNumbers(selectedIds);

                if (!selectedIds.includes(row.original.idInk)) {
                    selectedIds.push(row.original.idInk);
                }
                row.toggleSelected(true);
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className='transition-transform duration-200 hover:scale-110' width={20} height={20} viewBox="0 0 24 24"><path fill="black" clipRule='evenodd' fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.527 15.977h3.24c1.278-.021 3.233.652 3.233 3.08C22 21.577 19.588 22 18.766 22H7.946C5.438 22 2 21.491 2 17.17V8.002h20v4.517m-6.473 3.457a.8.8 0 0 1 .273-.58l1.702-1.42m-1.975 2a.8.8 0 0 0 .275.623l1.7 1.383M2.006 7.991l.921-2.3c.748-1.789 1.122-2.683 1.88-3.186S6.537 2 8.48 2h7.02c1.944 0 2.916 0 3.674.504c.758.503 1.131 1.397 1.88 3.185L22 7.995m-10.037.006v-6m-2 10h4" color="currentColor" /></svg>
        </div>
    )
}