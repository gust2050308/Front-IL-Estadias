import type { ColumnDef, Row } from "@tanstack/react-table"
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

// Componente separado para el header del checkbox
const SelectHeader = ({ table }: { table: any }) => {
    const { setNumbers } = useContext(StockContext);

    return (
        <Checkbox
            checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => {
                table.toggleAllPageRowsSelected(!!value);
                setNumbers(!!value
                    ? table.getRowModel().rows.map((row: Row<Stock>) => row.original.idInk)
                    : []);
            }}
            aria-label="Seleccionar todos"
        />
    );
};

const SelectCell = ({ row }: { row: Row<Stock> }) => {
    const { numbers, toggleNumber } = useContext(StockContext);

    return (
        <Checkbox
            checked={numbers.includes(row.original.idInk)} // <- Sincronizado con el estado
            onCheckedChange={() => {
                toggleNumber(row.original.idInk);
            }}
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
            header: "ID",
        },
        {
            accessorKey: "provider_Name",
            header: "Proveedor",
        },
        {
            accessorKey: "batchProvider",
            header: "Lote proveedor",
        },
        {
            accessorKey: "internalBatch",
            header: "Lote interno",
        },
        {
            accessorKey: "type",
            header: "Tipo",
        },
        {
            accessorKey: "code",
            header: "Código",
        },
        {
            accessorKey: "totalQuantityKilograms",
            header: "Kg's Totales",
        },
        {
            accessorKey: "remainingVolume",
            header: "Kg's Restantes",
        },
        {
            accessorKey: "volumeUsed",
            header: "Kg's Usados",
        },
        {
            id: "userActions",
            cell: ({ row }) => <StockAction row={row} />
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
    }

    function StockAction({ row }: StockActionProps) {
    const { setOpen, numbers, setNumbers } = useContext(StockContext);

    return (
        <Button
            onClick={() => {    
                setOpen(true);
                if (!numbers.includes(row.original.idInk)) {
                    setNumbers([...numbers, row.original.idInk]); // Añade el ID
                }
            }}
        >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"><path d="M3.808 5.086C4.94 4.08 5.642 3.74 7 3.49c1.358.251 2.06.59 3.192 1.596L7 6.682z" /><path d="M3.808 5.086c-.393 1.08-.397 2.368-.085 3.453a.93.93 0 0 0 .3.454c.988.824 1.664 1.127 2.766 1.368a1 1 0 0 0 .422 0c1.102-.241 1.778-.544 2.765-1.368a.93.93 0 0 0 .301-.454c.312-1.085.308-2.373-.085-3.453L7 6.682zM7 6.674v3.731" /><path d="M.75 7A6.25 6.25 0 0 1 12.5 4.029c.076-1.102.053-1.732-.1-2.875M13.25 7a6.25 6.25 0 0 1-11.734 3c-.076 1.102-.054 1.732.1 2.875" /></g></svg>
            </Button>
        )
    }