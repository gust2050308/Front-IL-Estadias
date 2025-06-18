import type { ColumnDef, Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from '@/components/ui/checkbox'
import { useContext } from "react"
import { OutputContext } from "./OutputContext"

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
    const { setNumbers, numbers} = useContext(OutputContext)

    return (
        <Checkbox
            checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(Value) => {
                table.toggleAllPageRowsSelected(!!Value);
                setNumbers(!!Value
                    ? table.getRowModel().rows.map((row: Row<OutPut>) => row.original.idOutputInk,
                    console.log(numbers)
                )
                    : [])
            }}
            aria-label="Seleccionar todos"
        />
    );
};

const SelectCell = ({ row }: { row: Row<OutPut> }) => {
    const { numbers, toggleNumber } = useContext(OutputContext);

    return (
        <Checkbox
            className="bg-[#e8e8e8]"
            checked={
                numbers.includes(row.original.idOutputInk)
            }
            onCheckedChange={() => {
                toggleNumber(row.original.idOutputInk)
            }}
            aria-label="Seleccionar fila"
        />
    )
}

export const columns: ColumnDef<OutPut>[] = [
    {
        id: "select",
        header: ({ table }) => <SelectHeader table={table} />,
        cell: ({ row }) => <SelectCell row={row} />
    },
    {
        accessorKey: 'idOutputInk',
        header: 'ID',
    }, {
        accessorKey: 'date',
        header: 'Fecha',
    }, {
        accessorKey: 'production',
        header: 'No. Producción',
    }, {
        accessorKey: 'idInk',
        header: 'ID Tinta',
    }, {
        accessorKey: 'typeMaterial',
        header: 'Tipo de Material'
    }, {
        accessorKey: 'internalBatch',
        header: 'Lote Interno',
    }, {
        accessorKey: 'kilogramsRequired',
        header: "Kg's Requeridos",
    }, {
        accessorKey: 'kilogramsDelivered',
        header: "Kg's Entregados",
    }, {
        accessorKey: 'whoDelivers',
        header: 'Quien Entrega',
    }, {
        accessorKey: 'whoReceives',
        header: 'Quien Recibe',
    },{
        accessorKey: 'returnedKilogramsRequired',
        header :"Kg's devueltos",
    }, {
        id: "actions",
        cell: ({ row }) => <OutputActions row={row} />
    }
]

type OutputActionsProps = {
    row: Row<OutPut>
}

function OutputActions({ row }: OutputActionsProps) {

    const { setOpen, numbers, setNumbers } = useContext(OutputContext)

    return (
        <Button className="bg-[#4f4a4a]"
            onClick={() => {
                setOpen(true);
                if (!numbers.includes(row.original.idOutputInk)) {
                    setNumbers([...numbers, row.original.idOutputInk]);
                }
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.527 15.977h3.24c1.278-.021 3.233.652 3.233 3.08C22 21.577 19.588 22 18.766 22H7.946C5.438 22 2 21.491 2 17.17V8.002h20v4.517m-6.473 3.457a.8.8 0 0 1 .273-.58l1.702-1.42m-1.975 2a.8.8 0 0 0 .275.623l1.7 1.383M2.006 7.991l.921-2.3c.748-1.789 1.122-2.683 1.88-3.186S6.537 2 8.48 2h7.02c1.944 0 2.916 0 3.674.504c.758.503 1.131 1.397 1.88 3.185L22 7.995m-10.037.006v-6m-2 10h4" color="currentColor" /></svg>
        </Button>
    )
}