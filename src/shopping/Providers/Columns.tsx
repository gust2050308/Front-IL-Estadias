import type { ColumnDef, Row, Table } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox";
import { ProviderContext } from "./ProvidersContext"
import { useContext } from "react";

import DisableProviderDialog from './DisableProviderDialog'

export type Providers = {
    idProvider: number;
    providerName: string;
    providerEmail: string;
    providerPhone: string;
    providerAddress: string;
    providerPerson: string;
    providerType: ProviderType
}

type ProviderType = 'TINTA' | 'PAPEL' | 'AUXILIARES' | 'VARIOS'

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

const SelectCell = ({ row }: { row: Row<Providers> }) => {
    return (
        <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Seleccionar fila"
        />
    );
};

export const columns: ColumnDef<Providers>[] = [
    {
        id: "select",
        header: ({ table }) => <SelectHeader table={table} />,
        cell: ({ row }) => <SelectCell row={row} />
    }, {
        accessorKey: "idProvider",
        header: ({ column }) => {
            return (
                <div
                    className='hover:bg-transparent bg-transparentmax-w-1/2 px-0'
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ID
                </div>
            )
        }
    },
    {
        accessorKey: "providerName",
        header: ({ column }) => {
            return (
                <div
                    className='hover:bg-transparent bg-transparentmax-w-1/2 px-0'
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nombre
                </div>
            )
        }
    },
    {
        accessorKey: "providerEmail",
        header: ({ column }) => {
            return (
                <div
                    className='hover:bg-transparent bg-transparentmax-w-1/2 px-0'
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                </div>
            )
        }
    },
    {
        accessorKey: "providerPhone",
        header: ({ column }) => {
            return (
                <div
                    className='hover:bg-transparent bg-transparentmax-w-1/2 px-0'
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Telefono
                </div>
            )
        }
    },
    {
        accessorKey: "providerAddress",
        header: ({ column }) => {
            return (
                <div
                    className='hover:bg-transparent bg-transparentmax-w-1/2 px-0'
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Dirección
                </div>
            )
        }
    },
    {
        accessorKey: "providerPerson",
        header: ({ column }) => {
            return (
                <div
                    className='hover:bg-transparent bg-transparentmax-w-1/2 px-0'
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Persona de contacto
                </div>
            )
        }
    },
    {
        accessorKey: "providerType",
        header: ({ column }) => {
            return (
                <div
                    className='hover:bg-transparent bg-transparentmax-w-1/2 px-0'
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Tipo
                </div>
            )
        }
    }, {
        accessorKey: "Edit",
        cell: ({ row }) => {

            const { setNumbers, setOpen } = useContext(ProviderContext)

            return (
                <div
                    className='hover:bg-transparent bg-transparentmax-w-1/2 px-0'
                    onClick={() => {
                        setNumbers([row.original.idProvider])
                        setOpen(true)
                    }}
                >
                    <svg className='transition-transform duration-200 hover:scale-110' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 21h16M5.666 13.187A2.28 2.28 0 0 0 5 14.797V18h3.223c.604 0 1.183-.24 1.61-.668l9.5-9.505a2.28 2.28 0 0 0 0-3.22l-.938-.94a2.277 2.277 0 0 0-3.222.001z" /></svg>
                </div>
            )
        }
    }, {
        accessorKey: "enabled",
        header: ({ column }) => {
            return (
                <div
                    className="hover:bg-transparent bg-transparent max-w-1/2 px-0"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    ¿Activo?
                </div>
            )
        },
        cell: ({ row }) => {
            const isEnabled = row.getValue<boolean>("enabled");
            const idProvider = row.original.idProvider;

            return (
                <div className="flex justify-center">
                    <DisableProviderDialog idProvider={idProvider} isEnabled={isEnabled} />
                </div>
            );
        }

    }
    ,]
