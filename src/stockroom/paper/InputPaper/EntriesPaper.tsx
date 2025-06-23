import type { Entry } from './ColumnsPaper'
import { columns } from "./ColumnsPaper"
import { DataTable } from "../../ink/InputInk/DataTableEntries"
import axios from "axios"
import { useEffect, useState } from "react"
const url = import.meta.env.VITE_API_URL

export default function DemoPage() {
    const [data, setData] = useState<Entry[]>([])

    async function getData() {
    axios.get(`${url}/inPaper`)
        .then((response) => {
            const data = response.data.map((entry: any) => ({
                id_InInk: entry.id_InInk,
                date: entry.dateEntry.substring(0, 10),
                provider: entry.provider.provider_Name,
                invoiceRemission: entry.invoiceRemission,
                purchaseOrder: entry.purchaseOrder.purchaseOrderNumber,
                type: entry.type,
                code: entry.code,
                units: entry.units,
                weightPaper: entry.weightPaper,
                largePaper: entry.largePaper,
                batchProvider: entry.batchProvider,
                internalBatch: entry.internalBatch,
                qualityCertificate: entry.qualityCertificate,
            }));
            setData(data);
        }, (error) => {
            console.error("Error fetching data:", error);
        });
}

    useEffect(() => {
        getData()
    }, [])


    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
