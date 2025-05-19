"use almacenista"

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
import { ArrowUpDown } from "lucide-react"
//import { Checkbox } from "@/components/ui/checkbox"



export type Entry ={
    id_InInk: number
    date: string
    provider : string
    invoiceRemission: string
    purchaseOrder: number
    type: string
    code: string
    units: number

    weightPaper: number
    largePaper: number

    batchProvider : string
    internalBatch: string
    qualityCertificate : "Si" | "No" | "Pendiente"
    
}

export const columns: ColumnDef<Entry>[] = [

    {
        accessorKey: "id_InInk",
        header: "ID",
    },
    {
        accessorKey: "date",
        header: "Fecha",
    },
    {
        accessorKey: "provider",
        header: "Proveedor",
    },
    {
        accessorKey: "invoiceRemission",
        header: "Factura/Remisión",
    },
    {
        accessorKey: "purchaseOrder",
        header: "Orden de compra",
    },
    {
        accessorKey: "type",
        header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    },
    {
        accessorKey: "code",
        header: "Código",
    },
    {
        accessorKey: "weightPaper",
        header: "Ancho papel(cm)",
    },
    {
        accessorKey: "largePaper",
        header: "Largo papel(m)",
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
        accessorKey: "qualityCertificate",
        header: "Certificado de calidad",
    },
    
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