import type { ColumnDef, SortingState, ColumnFiltersState } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import * as React from "react"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/ui/DataTableViewOptions"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { OutputContext } from "./OutputContext"
import { useContext } from "react"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { OutPutPDFDocumnet } from "./OutputsPDFDocument"
import OutputExcelExport from "./OutputExcelExport"

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
            row.original.date.toString().toLowerCase().includes(search) ||
            row.original.production.toString().toLowerCase().includes(search) ||
            row.original.typeMaterial.toString().toLowerCase().includes(search) ||
            row.original.internalBatch.toString().toLowerCase().includes(search) ||
            row.original.idInk.toString().toLowerCase().includes(search) ||
            row.original.kilogramsRequired.toString().toLowerCase().includes(search) ||
            row.original.kilogramsDelivered.toString().toLowerCase().includes(search) ||
            row.original.whoDelivers.toString().toLowerCase().includes(search) ||
            row.original.whoReceives.toString().toLowerCase().includes(search) ||
            row.original.returnedKilogramsRequired.toString().toLowerCase().includes(search)
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

    const { refreshData } = useContext(OutputContext)

    return (
        <div className='w-full px-3 flex flex-col' >
            <div className="flex flex-row justify-between items-center py-4">

                <Input
                    placeholder="Buscar..."
                    value={globalFilter}
                    onChange={(event) => setGlobalFilter(event.target.value)}
                    className='bg-white w-2/5'
                />
                <div className='flex flex-row space-x-5 items-center'>
                    <HoverCard>
                        <HoverCardTrigger>
                            <svg xmlns="http://www.w3.org/2000/svg" width={20} className='text-gray-600' height={20} viewBox="0 0 48 48"><path fill="currentColor" d="M24 6.5C14.335 6.5 6.5 14.335 6.5 24S14.335 41.5 24 41.5S41.5 33.665 41.5 24S33.665 6.5 24 6.5M4 24C4 12.954 12.954 4 24 4s20 8.954 20 20s-8.954 20-20 20S4 35.046 4 24m20-4c.69 0 1.25.56 1.25 1.25v12.5a1.25 1.25 0 1 1-2.5 0v-12.5c0-.69.56-1.25 1.25-1.25m0-3a2 2 0 1 0 0-4a2 2 0 0 0 0 4"></path></svg>                        </HoverCardTrigger>
                        <HoverCardContent className='w-110'>
                            <div >
                                <p className='text-sm opacity-60'>
                                    Clic en el encabezado para ordenar por texto, número o fecha.
                                </p>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button className='rounded-s-sm bg-transparent hover:bg-zinc-100 px-0'>
                                <svg xmlns="http://www.w3.org/2000/svg" className='text-black' width={24} height={24} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={1.5}><path strokeMiterlimit={10} d="M12 15.238V3.213"></path><path strokeLinejoin="round" d="m7.375 10.994l3.966 3.966a.937.937 0 0 0 1.318 0l3.966-3.966"></path><path strokeLinejoin="round" d="M2.75 13.85v4.625a2.313 2.313 0 0 0 2.313 2.313h13.874a2.313 2.313 0 0 0 2.313-2.313V13.85"></path></g></svg>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>
                                Descargar...
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem asChild>
                                    <PDFDownloadLink
                                        document={<OutPutPDFDocumnet data={table.getFilteredRowModel().rows.map(r => r.original)} />}
                                        fileName="reporte_salidas.pdf"
                                        style={{ textDecoration: "none", color: "inherit", display: "block", width: "100%" }}
                                    >
                                        {({ loading }) => (loading ? "Generando PDF..." : "PDF")}
                                    </PDFDownloadLink>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <OutputExcelExport data={table.getFilteredRowModel().rows.map(r => r.original)} />
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Select
                        defaultValue=""
                        onValueChange={(value) => {
                            table.setPageSize(Number(value))
                        }}
                    >
                        <SelectTrigger className="w-1/2">
                            <SelectValue placeholder={`Mostrar ${10}`} />
                        </SelectTrigger>
                        <SelectContent>
                            {[5, 10, 15, 20].map((size) => (
                                <SelectItem key={size} value={size.toString()}>
                                    Mostrar {size} filas
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <DataTableViewOptions table={table} />
                    <Button className='rounded-full w-fit h-auto bg-white hover:bg-zinc-100 px-0'
                        onClick={refreshData}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className='hover:text-white' viewBox="0 0 24 24"><path d="M20.3 13.43a1 1 0 0 0-1.25.65A7.14 7.14 0 0 1 12.18 19A7.1 7.1 0 0 1 5 12a7.1 7.1 0 0 1 7.18-7a7.26 7.26 0 0 1 4.65 1.67l-2.17-.36a1 1 0 0 0-1.15.83a1 1 0 0 0 .83 1.15l4.24.7h.17a1 1 0 0 0 .34-.06a.3.3 0 0 0 .1-.06a.8.8 0 0 0 .2-.11l.09-.11c0-.05.09-.09.13-.15s0-.1.05-.14a1.3 1.3 0 0 0 .07-.18l.75-4a1 1 0 0 0-2-.38l-.27 1.45A9.2 9.2 0 0 0 12.18 3A9.1 9.1 0 0 0 3 12a9.1 9.1 0 0 0 9.18 9A9.12 9.12 0 0 0 21 14.68a1 1 0 0 0-.7-1.25"></path></svg>
                    </Button>
                </div>

            </div>
            <div className="rounded-md border max-h-[535px] overflow-y-auto">
                <Table className="" >
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
                    <TableBody className="bg-gradient-to-r from-gray-200 to-transparent max-h-screen">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    className='h-1.5'
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className='h-12'>
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
            <div className="flex items-center justify-end space-x-2 py-4 px-3 ">
                <div className="text-muted-foreground flex-1 text-sm ">
                    {table.getFilteredSelectedRowModel().rows.length} de{" "}
                    {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
                    <p className='text-blue-800 cursor-pointer' onClick={() => {
                        table.getRowModel().rows.map((row) => {
                            row.toggleSelected(false)
                        })
                    }}>Deseleccionar Todo</p>
                </div>
                <div>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => table.previousPage()}
                                    className={table.getCanPreviousPage() ? '' : 'opacity-50 pointer-events-none'}
                                />
                            </PaginationItem>

                            {Array.from({ length: table.getPageCount() }).map((_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink
                                        isActive={table.getState().pagination.pageIndex === i}
                                        onClick={() => table.setPageIndex(i)}
                                        href="#"
                                    >
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => table.nextPage()}
                                    className={table.getCanNextPage() ? '' : 'opacity-50 pointer-events-none'}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>

                </div>


            </div>
        </div>
    )
}