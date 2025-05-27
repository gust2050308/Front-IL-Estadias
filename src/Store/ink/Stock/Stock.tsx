import { DataTable } from './DataTableInksStock'
import axios from 'axios'
import { useEffect, useState } from "react"
const url = import.meta.env.VITE_API_URL
import type  {Stock} from './ColumnsStockInk'
import { columns } from "./ColumnsStockInk"

export default function DemoPage() {
    const [data, setData] = useState<Stock[]>([])

    async function getData() {
    axios.get(`${url}/ink/findInksWithStock`)
        .then((response) => {
            const data = response.data.map((ink: any) => ({
                idInk: ink.idInk,
                id_InInk: ink.inInk.id_InInk,
                provider_Name: ink.inInk.provider.provider_Name,
                batchProvider: ink.inInk.batchProvider,
                internalBatch: ink.inInk.internalBatch,
                type: ink.inInk.type,
                code: ink.inInk.code,
                totalQuantityKilograms: ink.totalKilograms,
                remainingVolume: ink.remainingVolume,
                volumeUsed: ink.volumeUsed,
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
        <div className="container mt-2 h-150">
            <DataTable columns={columns} data={data} />
        </div>
    )
}