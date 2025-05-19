import type { ColumnDef } from "@tanstack/react-table"
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import FormOutputInk from '../OutputInk/FormOutputInk'

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

export const columns: ColumnDef<Stock>[] = [
    {
        accessorKey: "idInk",
        header: "ID",
    },
    {
        accessorKey: "id_InInk",
        header: "ID Entrada",
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
    }, {
        id: "userActions",
        cell: ({ row }) => {
            const entry = row.original
            return (
                <div className="flex items-center space-x-2">
                    <AlertDialog>
                        <AlertDialogTrigger>
                            <Button>
                                Usar
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Tinta requerida para producción</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Llena los campos para usar la tinta con la informacion solicitada
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <FormOutputInk />
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>Aceptar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )
        }
    },

    /*{
        REDERIZA LA INFORMACION 
    },*/
    {
        id: "actions",
        cell: ({ row }) => {
            const entry = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(entry.id_InInk.toString())}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

