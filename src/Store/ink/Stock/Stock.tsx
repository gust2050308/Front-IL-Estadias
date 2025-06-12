import { DataTable } from './DataTableInksStock'
import axios from 'axios'
import { useEffect, useState } from "react"
const url = import.meta.env.VITE_API_URL
import type { Stock } from './ColumnsStockInk'
import { columns } from "./ColumnsStockInk"
import StockProvider from './StockContext'
import FormOutputInk from '../OutputInk/FormOutputInk'
import {GlobalDialog} from './GlobalDialog'

export default function DemoPage() {
    const [data, setData] = useState<Stock[]>([])

    async function getData() {
        try {
            const response = await axios.get(`${url}/ink/findInksWithStock`);
            const data = response.data.map((ink: any) => ({
                idInk: ink.id,
                id_InInk: ink.idInInk,
                provider_Name: ink.provider,
                batchProvider: ink.batchProvider,
                internalBatch: ink.internalBatch,
                type: ink.typeOfMaterial,
                code: ink.code,
                totalQuantityKilograms: ink.totalKilograms,
                remainingVolume: ink.remainingKilograms,
                volumeUsed: ink.usedKilograms,
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
        <div className="container mt-2 h-150">
            <StockProvider>
                <DataTable columns={columns} data={data} />
                <GlobalDialog>
                    <FormOutputInk />
                </GlobalDialog>
            </StockProvider>
        </div>
    )
}