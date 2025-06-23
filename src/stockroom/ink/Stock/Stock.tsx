import { DataTable } from './DataTableInksStock'
import axios from 'axios'
import { useContext, useEffect, useState } from "react"
const url = import.meta.env.VITE_API_URL
import type { Stock } from './ColumnsStockInk'
import { columns } from "./ColumnsStockInk"
import FormOutputInk from '../OutputInk/FormOutputInk'
import { GlobalDialog } from './GlobalDialog'
import FilterStock from './FilterStock'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { StockContext } from './StockContext'
import { toast } from 'sonner'

export default function DemoPage() {
    const [data, setData] = useState<Stock[]>([])
    const {refreshKey} =useContext(StockContext)

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
        toast.info('obteniendo información...')
    }, [refreshKey])

    return (
        <div className=' mt-2 h-150 w-full items-start'>
                <div className='flex flex-row w-full'>
                    <ResizablePanelGroup
                        direction="horizontal"
                        className="rounded-md"
                    >
                        <ResizablePanel defaultSize={18}>
                            <div className="flex h-full items-center justify-center">
                                <FilterStock />
                            </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={82}>
                            <div className="flex h-full items-start justify-center px-6">
                              
                                <DataTable columns={columns} data={data} />
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </div>
                <GlobalDialog>
                    <FormOutputInk />
                </GlobalDialog>
            
        </div>
    )
}