import type { Entry } from './ColumnsInputInk'
import { columns } from "./ColumnsInputInk"
import { DataTable } from "./DataTableEntries"
import axios from "axios"
import { useEffect, useState } from "react"
const url = import.meta.env.VITE_API_URL

export default function DemoPage() {
    const [data, setData] = useState<Entry[]>([])

    async function getData() {
        try {
            const response = await axios.get(`${url}/inink`);
            const data = response.data.map((entry: any) => ({
                id_InInk: entry.id,
                date: entry.date.substring(0, 10),
                provider: entry.provider,
                invoiceRemission: entry.invoiceRemission,
                purchaseOrder: entry.orderNumber,
                type: entry.typeMaterial,
                code: entry.code,
                units: entry.units,
                quantityKilograms: entry.quantityKilograms,
                batchProvider: entry.batchProvider,
                internalBatch: entry.internalBatch,
                qualityCertificate: entry.qualityCertificate,
            }));
            setData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }


    useEffect(() => {
        getData()
    }, [])


    return (
        <div className="container mx-auto ">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
    