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
export default function Stock() {
    const [data, setData] = useState<Stock[]>([])
    const { refreshKey } = useContext(StockContext)

    async function getData() {
        type Filters = {
            provider?: number
            providerBatch?: string
            internalBatch?: string
            type?: string
            code?: string
            remainingVolumeMin?: string
            remainingVolumeMax?: string
        }
        let filters: Filters = {}
        const storedFilters = localStorage.getItem('filters-stock')
        if (storedFilters) {
            try {
                filters = JSON.parse(storedFilters)
            } catch (err) {
                console.error("No se pudieron cargar los filtros persistidos:", err)
            }
        }

        try {
            const response = await axios.get(`${url}/ink/findInksWithStock`, {
                params: {
                    idProvider: filters.provider ?? '',
                    batchProvider: filters.providerBatch ?? '',
                    internalBatch: filters.internalBatch ?? '',
                    typeMaterial: filters.type ?? '',
                    codeItem: filters.code ?? '',
                    minRemaining: filters.remainingVolumeMin ?? '',
                    maxRemaining: filters.remainingVolumeMax ?? ''
                }
            })


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
            }))
            setData(data)
            console.log('Dtata obtenida:', data)

        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }


    useEffect(() => {
        getData()
        toast.info('Obteniendo información...')

    }, [refreshKey])

    return (
        <div className=' mt-2 h-150 w-full items-start'>
            <div className='flex flex-row w-full'>
                <ResizablePanelGroup
                    direction="horizontal"
                    className="rounded-md">
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