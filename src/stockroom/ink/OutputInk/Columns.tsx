import type { ColumnDef, Row, Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from '@/components/ui/checkbox'
import { useContext } from "react"
import { OutputContext } from "./OutputContext"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "sonner"

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
        header: ({ column }) => {
            return (
                <Tooltip>
                    <TooltipTrigger><Button
                        className='hover:bg-transparent bg-transparentmax-w-1/2 px-0'
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        ID
                    </Button >
                    </TooltipTrigger>
                    <TooltipContent className='bg-gray-200 text-blue-900'>
                        Ordenar por ID
                    </TooltipContent>
                </Tooltip>
            )
        },
    }, {
        accessorKey: 'date',
        header: ({ column }) => {
            return (<Tooltip>
                <TooltipTrigger>
                    <Button
                        className='hover:bg-transparent bg-transparent'
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Fecha
                    </Button>
                </TooltipTrigger>
                <TooltipContent className='bg-gray-200 text-blue-900'>
                    Ordenar po Fecha
                </TooltipContent>
            </Tooltip>
            )
        },
    }, {
        accessorKey: 'production',
        header: ({ column }) => {
            return (
                <Tooltip>
                    <TooltipTrigger>
                        <Button className='bg-transparent hover:bg-transparent px-0'
                            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                            No. Produccion
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className='bg-gray-200 text-blue-900'>
                        Ordenar por numero de orden de producción
                    </TooltipContent>
                </Tooltip>
            )
        },
    }, {
        accessorKey: 'idInk',
        header: ({ column }) => {
            return (
                <Tooltip>
                    <TooltipTrigger>
                        <Button className='bg-transparent hover:bg-transparent px-0'
                            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        >
                            Tinta ID
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className='bg-gray-200 text-blue-900'>
                        Oredenar por Id de origen
                    </TooltipContent>
                </Tooltip>
            )
        },
    }, {
        accessorKey: 'typeMaterial',
        header: ({ column }) => {
            return (
                <Tooltip>
                    <TooltipTrigger>
                        <Button className='bg-transparent hover:bg-transparent'
                            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        >
                            Tipo
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className='bg-gray-200 text-blue-900'>
                        Ordenar por Tipo de Material
                    </TooltipContent>
                </Tooltip>
            )
        }
    }, {
        accessorKey: 'internalBatch',
        header: ({ column }) => {
            return (
                <Tooltip>
                    <TooltipTrigger>
                        <Button
                            className='bg-transparent hover:bg-transparent px-0'
                            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        >
                            Lote Interno
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className='bg-gray-200 text-blue-900'>
                        Ordenar por Lote Interno
                    </TooltipContent>
                </Tooltip>
            )
        },
    }, {
        accessorKey: 'kilogramsRequired',
        header: ({ column }) => {
            return (
                <Tooltip>
                    <TooltipTrigger>
                        <Button
                            className='bg-transparent hover:bg-transparent px-0'
                            onClick={() => {
                                column.toggleSorting(column.getIsSorted() === 'asc')
                            }}
                        >
                            Kg's Requeridos
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className='bg-gray-200 text-blue-900'>
                        Ordear: Mayor/Menor - Menor/Mayor
                    </TooltipContent>
                </Tooltip>
            )
        },
    }, {
        accessorKey: 'kilogramsDelivered',
        header: ({ column }) => {
            return (
                <Tooltip>
                    <TooltipTrigger>
                        <Button
                            className='bg-transparent hover:bg-transparent px-0'
                            onClick={() => {
                                column.toggleSorting(column.getIsSorted() === 'asc')
                            }}
                        >
                            Kg's Entregados
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className='bg-gray-200 text-blue-900'>
                        Ordear: Mayor/Menor - Menor/Mayor
                    </TooltipContent>
                </Tooltip>
            )
        },
    }, {
        accessorKey: 'whoDelivers',
        header: ({ column }) => {
            return (
                <Tooltip>
                    <TooltipTrigger>
                        <Button
                            className='bg-transparent hover:bg-transparent px-0'
                            onClick={() => {
                                column.toggleSorting(column.getIsSorted() === 'asc')
                            }}
                        >
                            Quien Entrega
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className='bg-gray-200 text-blue-900'>
                        Ordear alfabeticamente
                    </TooltipContent>
                </Tooltip>
            )
        },
    }, {
        accessorKey: 'whoReceives',
        header: ({ column }) => {
            return (
                <Tooltip>
                    <TooltipTrigger>
                        <Button
                            className='bg-transparent hover:bg-transparent px-0'
                            onClick={() => {
                                column.toggleSorting(column.getIsSorted() === 'asc')
                            }}
                        >
                            Quien Recibio
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className='bg-gray-200 text-blue-900'>
                        Ordear alfabeticamente
                    </TooltipContent>
                </Tooltip>
            )
        },
    }, {
        accessorKey: 'returnedKilogramsRequired',
        header: ({ column }) => {
            return (
                <Tooltip>
                    <TooltipTrigger>
                        <Button
                            className='bg-transparent hover:bg-transparent px-0'
                            onClick={() => {
                                column.toggleSorting(column.getIsSorted() === 'asc')
                            }}
                        >
                            Kg's Devueltos
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className='bg-gray-200 text-blue-900'>
                        Ordear: Mayor/Menor - Menor/Mayor
                    </TooltipContent>
                </Tooltip>
            )
        },
    }, {
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
        <Button className="bg-transparent hover:bg-transparent hover:text-white m-0 p-0 w-5 h-5 transition-colors"

            onClick={() => {
                setOpen(true);

                const selectedIds = table
                    .getSelectedRowModel()
                    .rows.map(row => row.original.idOutputInk);

                setNumbers(selectedIds)
                toast.info('Ids: ' + selectedIds)

                if (!selectedIds.includes(row.original.idOutputInk)) {
                    selectedIds.push(row.original.idOutputInk);
                }
                row.toggleSelected(true);
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 24 24"><path fill="black" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.527 15.977h3.24c1.278-.021 3.233.652 3.233 3.08C22 21.577 19.588 22 18.766 22H7.946C5.438 22 2 21.491 2 17.17V8.002h20v4.517m-6.473 3.457a.8.8 0 0 1 .273-.58l1.702-1.42m-1.975 2a.8.8 0 0 0 .275.623l1.7 1.383M2.006 7.991l.921-2.3c.748-1.789 1.122-2.683 1.88-3.186S6.537 2 8.48 2h7.02c1.944 0 2.916 0 3.674.504c.758.503 1.131 1.397 1.88 3.185L22 7.995m-10.037.006v-6m-2 10h4" color="currentColor" /></svg>
        </Button>
    )
}