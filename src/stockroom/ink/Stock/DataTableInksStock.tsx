"almacen"
import type { ColumnDef, SortingState, ColumnFiltersState } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import * as React from "react"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/ui/DataTableViewOptions"
import { StockContext } from "./StockContext"

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
            row.original.idInk.toString().toLowerCase().includes(search) ||
            row.original.provider_Name.toLowerCase().includes(search) ||
            row.original.batchProvider.toString().toLowerCase().includes(search) ||
            row.original.internalBatch.toString().toLowerCase().includes(search) ||
            row.original.type.toString().toLowerCase().includes(search) ||
            row.original.code.toString().toLowerCase().includes(search) ||
            row.original.totalQuantityKilograms.toString().toLowerCase().includes(search) ||
            row.original.remainingVolume.toString().toLowerCase().includes(search) ||
            row.original.volumeUsed.toString().toLowerCase().includes(search)
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
        enableRowSelection: true,
    })

    const {refreshData} = React.useContext(StockContext)

    return (
        <div className='w-full px-5 flex flex-col' >
            <div className="flex flex-row justify-between items-center py-4">
                <Input
                    placeholder="Buscar..."
                    value={globalFilter}
                    onChange={(event) => setGlobalFilter(event.target.value)}
                    className='bg-white w-2/5'
                />
                <div className='flex flex-row space-x-5'>
                    <DataTableViewOptions table={table} />
                    <Button className='rounded-full w-fit h-auto bg-white hover:bg-zinc-100 px-0'
                    onClick={refreshData}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className='hover:text-white' viewBox="0 0 24 24"><path d="M20.3 13.43a1 1 0 0 0-1.25.65A7.14 7.14 0 0 1 12.18 19A7.1 7.1 0 0 1 5 12a7.1 7.1 0 0 1 7.18-7a7.26 7.26 0 0 1 4.65 1.67l-2.17-.36a1 1 0 0 0-1.15.83a1 1 0 0 0 .83 1.15l4.24.7h.17a1 1 0 0 0 .34-.06a.3.3 0 0 0 .1-.06a.8.8 0 0 0 .2-.11l.09-.11c0-.05.09-.09.13-.15s0-.1.05-.14a1.3 1.3 0 0 0 .07-.18l.75-4a1 1 0 0 0-2-.38l-.27 1.45A9.2 9.2 0 0 0 12.18 3A9.1 9.1 0 0 0 3 12a9.1 9.1 0 0 0 9.18 9A9.12 9.12 0 0 0 21 14.68a1 1 0 0 0-.7-1.25"></path></svg>
                    </Button>
                </div>


            </div>
            <div className="rounded-md border max-h-300" style={{ overflowY: "auto" }}>
                <Table >
                    <TableHeader className='[&>tr>th]:text-white bg-gradient-to-r from-blue-900 to-sky-400 hover:bg-transparent'>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className='bg-transparent'>
                                {headerGroup.headers.map((header) => {
                                    return (

                                        <TableHead key={header.id} className='w-auto bg-transparent'>
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
                    <TableBody className="bg-gradient-to-r from-gray-200 to-transparent">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    className='h-1.5'
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className='h-fit'>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1 text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} de{" "}
                    {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
                    <p className='text-blue-800 cursor-pointer' onClick={() => {
                        table.getRowModel().rows.map((row) => {
                            row.toggleSelected(false)
                        })
                    }}>Deseleccionar Todo</p>
                </div>
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