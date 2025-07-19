import type { ColumnDef, Row, Table } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { useContext } from "react"
import { StockContext } from './StockContext'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"


export type Stock = {
    idInk: number
    id_InInk: number
    provider_Name: string
    batchProvider: string
    internalBatch: string
    type: string
    code: string
    totalQuantityKilograms: number
    remainingVolume: number
    volumeUsed: number
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

const SelectCell = ({ row }: { row: Row<Stock> }) => {
    return (
        <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Seleccionar fila"
        />
    );
};

export const columns: ColumnDef<Stock>[] = [
    {
        id: "select",
        header: ({ table }) => <SelectHeader table={table} />,
        cell: ({ row }) => <SelectCell row={row} />
    },
    {
        accessorKey: "idInk",
        header: ({ column }) => {
            return (
                <Tooltip>
                    <TooltipTrigger><Button
                        className='hover:bg-transparent bg-transparent max-w-1/2 px-0'
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
    },
    {
        accessorKey: "provider_Name",
        header: ({ column }) => {
            return (
                <Tooltip>
                    <TooltipTrigger>
                        <Button className='hover:bg-transparent bg-transparent max-w-1/3 px-0'
                            onClick={() => {
                                column.toggleSorting(column.getIsSorted() === 'asc')
                            }}>
                            Proveedor
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className='bg-gray-200 text-blue-900'>
                        Ordenar por Proveedor
                    </TooltipContent>
                </Tooltip>
            )
        },
    },
    {
        accessorKey: "batchProvider",
        header: ({ column }) => {
            return (<Tooltip>
                <TooltipTrigger>
                    <Button
                        className='hover:bg-transparent bg-transparent px-0 '
                        onClick={() => {
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }}
                    >
                        Lote Proveedor
                    </Button>
                </TooltipTrigger>
                <TooltipContent className='bg-gray-200 text-blue-900'>
                    Ordear por Lote de Proveedor
                </TooltipContent>
            </Tooltip>)
        },
    },
    {
        accessorKey: "internalBatch",
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
                            Lote Interno
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className='bg-gray-200 text-blue-900'>
                        Ordenar por Lote Interno
                    </TooltipContent>
                </Tooltip>
            )
        },
    },
    {
        accessorKey: "type",
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
                            Tipo
                        </Button>

                    </TooltipTrigger>
                    <TooltipContent className='bg-gray-200 text-blue-900'>
                        Ordenar por tipo
                    </TooltipContent>
                </Tooltip>
            )
        },
    },
    {
        accessorKey: "code",
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
                            Código
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className='bg-gray-200 text-blue-900'>
                        Ordenar por código
                    </TooltipContent>
                </Tooltip>
            )
        },
    },
    {
        accessorKey: "totalQuantityKilograms",
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
                            Kg's Totales
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className='bg-gray-200 text-blue-900'>
                        Mayor/Menor  - Menor/Mayor
                    </TooltipContent>
                </Tooltip>
            )
        },
    },
    {
        accessorKey: "remainingVolume",
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
                            Kg's Restantes
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className='bg-gray-200 text-blue-900'>
                        Mayor/Menor  - Menor/Mayor
                    </TooltipContent>
                </Tooltip>
            )
        },
    },
    {
        accessorKey: "volumeUsed",
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
                            Kg's Usados
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className='bg-gray-200 text-blue-900'>
                        Mayor/Menor  - Menor/Mayor
                    </TooltipContent>
                </Tooltip>
            )
        },
    },
    {
        id: "userActions",
        cell: ({ row, table }) => <StockAction row={row} table={table} />
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const entry = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menú</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(entry.id_InInk.toString())}
                        >
                            Copiar ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Ver cliente</DropdownMenuItem>
                        <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

type StockActionProps = {
    row: Row<Stock>
    table: Table<Stock>;
}
function StockAction({ row, table }: StockActionProps) {
    const { setOpen, setNumbers } = useContext(StockContext);

    return (

        <Tooltip>
            <TooltipTrigger>
                <Button
            className="bg-transparent hover:bg-transparent hover:text-white m-0 p-0 w-5 h-5 transition-colors"
            onClick={() => {
                setOpen(true);

                const selectedIds = table
                    .getSelectedRowModel()
                    .rows.map(row => row.original.idInk);

                setNumbers(selectedIds)

                if (!selectedIds.includes(row.original.idInk)) {
                    selectedIds.push(row.original.idInk);
                }
                row.toggleSelected(true);
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={48}
                height={48}
                viewBox="0 0 48 48"
                fill="currentColor"
                className="transition-transform duration-200 hover:scale-110 cursor-pointer text-black"
            >
                <path fill="black" clipRule="evenodd"
                    fillRule="evenodd" d="M32.33 4.398c.307.141.589.323.836.537a126 126 0 0 1-3.73 1.745a55 55 0 0 1-3.413 1.404c-.519.188-.975.337-1.348.436c-.4.106-.61.13-.675.13s-.275-.024-.674-.13c-.374-.1-.83-.248-1.349-.436a55 55 0 0 1-3.412-1.404a117 117 0 0 1-3.73-1.745c.247-.214.528-.396.836-.537C17.887 3.379 21.779 1.75 24 1.75c2.22 0 6.113 1.63 8.33 2.648M25.5 22.574v-11.17a20 20 0 0 0 1.547-.5a58 58 0 0 0 3.608-1.483a120 120 0 0 0 3.675-1.716c.093 1.11.17 2.612.17 4.545c0 2.358-.114 4.073-.233 5.22c-.122 1.17-.87 2.141-1.938 2.632c-1.775.816-4.624 2.023-6.829 2.472m-9.83-2.472c-1.067-.49-1.815-1.463-1.937-2.632c-.119-1.147-.233-2.862-.233-5.22c0-1.934.077-3.434.17-4.545a123 123 0 0 0 3.675 1.715a58 58 0 0 0 3.608 1.484c.544.197 1.07.371 1.547.5v11.17c-2.205-.449-5.054-1.656-6.83-2.472m4.66 5.546c.307.141.589.323.836.538a125 125 0 0 1-3.73 1.744a55 55 0 0 1-3.413 1.404c-.519.188-.975.337-1.348.436c-.4.106-.61.13-.675.13s-.275-.024-.674-.13c-.374-.1-.83-.248-1.349-.436a55 55 0 0 1-3.412-1.404a117 117 0 0 1-3.73-1.744q.372-.324.836-.538C5.887 24.629 9.779 23 12 23c2.22 0 6.113 1.63 8.33 2.648M13.5 43.824v-11.17a20 20 0 0 0 1.547-.5a58 58 0 0 0 3.608-1.484a120 120 0 0 0 3.675-1.715c.093 1.11.17 2.611.17 4.545c0 2.358-.114 4.073-.233 5.22c-.122 1.17-.87 2.141-1.937 2.632c-1.776.816-4.625 2.023-6.83 2.472m-9.83-2.472c-1.067-.49-1.815-1.463-1.937-2.632c-.119-1.147-.233-2.862-.233-5.22c0-1.933.077-3.434.17-4.545a122 122 0 0 0 3.675 1.716a58 58 0 0 0 3.608 1.483c.544.197 1.07.371 1.547.5v11.17c-2.205-.449-5.054-1.656-6.83-2.472m41.496-15.166a3.5 3.5 0 0 0-.836-.538C42.113 24.629 38.22 23 36 23s-6.113 1.63-8.33 2.648a3.5 3.5 0 0 0-.836.538a125 125 0 0 0 3.73 1.744a55 55 0 0 0 3.413 1.404c.519.188.975.337 1.348.436c.4.106.61.13.675.13s.275-.024.675-.13c.373-.1.83-.248 1.348-.436a55 55 0 0 0 3.412-1.404a117 117 0 0 0 3.73-1.744M37.5 32.653v11.17c2.205-.449 5.054-1.656 6.83-2.472c1.067-.49 1.815-1.463 1.937-2.632c.119-1.147.233-2.862.233-5.22a55 55 0 0 0-.17-4.545a119 119 0 0 1-3.675 1.716a58 58 0 0 1-3.608 1.483c-.544.197-1.07.372-1.547.5M25.733 38.72c.122 1.17.87 2.141 1.937 2.632c1.776.816 4.625 2.023 6.83 2.472v-11.17a20 20 0 0 1-1.547-.5a58 58 0 0 1-3.608-1.484a120 120 0 0 1-3.675-1.715a55 55 0 0 0-.17 4.545c0 2.358.114 4.073.233 5.22"></path></svg>
        </Button>
            </TooltipTrigger>
            <TooltipContent className='bg-gray-200 text-black'>
                Requerida's para producción
            </TooltipContent>
        </Tooltip>
        
    );
}