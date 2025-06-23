"almacen"
import type { ColumnDef, SortingState, ColumnFiltersState } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import * as React from "react"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/ui/DataTableViewOptions"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [globalFilter, setGlobalFilter] = React.useState("")
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = React.useState({})

    const fuzzyFilter = (row: any, columnId: string, value: string) => {
        const search = value.toLowerCase()
        return (
            row.original.idOutputInk.toString().toLowerCase().includes(search) ||
            row.original.date.toLowerCase().includes(search) ||
            row.original.production.toString().toLowerCase().includes(search) ||
            row.original.idInk.toString().toLowerCase().includes(search) ||
            row.original.kilogramsRequired.toString().toLowerCase().includes(search) ||
            row.original.kilogramsDelivered.toString().toLowerCase().includes(search) ||
            row.original.whoDelivers.toString().toLowerCase().includes(search) ||
            row.original.whoReceives.toString().toLowerCase().includes(search) ||
            row.original.returnedKilogramsRequired.toStrnig().toLowerCase().includes(search)
          )
    }

    const table = useReactTable({
        data,
        columns,
        globalFilterFn: fuzzyFilter,

        getPaginationRowModel: getPaginationRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,

        state: {
            sorting,
            columnFilters,
            globalFilter,
            rowSelection,
        },
    })

    console.log(columns)

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Buscar..."
                    value={globalFilter}
                    onChange={(event) => setGlobalFilter(event.target.value)}
                    className="max-w-md bg-[#ececec]"
                />
                <DataTableViewOptions table={table} />
            </div>
            <div className="rounded-md border max-h-300 overflow-y-auto ">
                <Table>
                    <TableHeader className="[&>tr>th]:text-white bg-[#424242]">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="bg-[#D4D2D2]">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="max-w-50 truncate" style={{}}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No hay ordenes en espera
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}