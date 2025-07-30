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
import { Separator } from "@/components/ui/separator"
import { Button } from '@/components/ui/button'
import { ChevronsUpDown } from "lucide-react"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { ScrollArea } from '@/components/ui/scroll-area'

type orderDesInkDtoList = {
    typeMaterial: string
    remainingVolume: number
}

type sumariseType = {
    inksTotal: number
    totalRemaining: number
    orderDesInkDtoList: orderDesInkDtoList[]
}

export default function Stock() {
    const [data, setData] = useState<Stock[]>([])
    const { refreshKey } = useContext(StockContext)
    const [sumarise, setSumarise] = useState<sumariseType>({
        inksTotal: 0,
        totalRemaining: 0,
        orderDesInkDtoList: []
    })

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

        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    async function getSumarise() {
        try {
            const response = await axios.get(`${url}/ink/inkStockSumarise`)
            const data = response.data
            setSumarise({
                inksTotal: data.inksTotal,
                totalRemaining: data.totalRemaining,
                orderDesInkDtoList: data.orderDesInkDtoList
            })
        } catch (error) {
            console.error("Error fetching summary data:", error)
        }
    }

    useEffect(() => {
        toast.info('Buscando...')
        getData()
        getSumarise()
    }, [refreshKey])

    return (
        <div className='mt-2 h-150 w-full items-start'>
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
            <div className='w-full h-1/5  bg-gradient-to-r from-gray-100 to-gray-200 px-3 pb-3'>
                <div className='w-full h-full border-t-1 border-slate-300 flex flex-col px-5 py-2'>
                    <p className='opacity-75 text-sm'>Resumen:</p>
                    <div className='flex flex-row justify-center items-center p-3 gap-4'>
                        <div className='mx-3'>
                            <div className='flex flex-row align-center items-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24"><path fill="currentColor" d="M18.14 16.7c-.91 1.51-2.06 1.03-3.14.39s-2.1-1.41-2.75-.5c-.71.78-.16 2.03.12 3.13c.28 1.11.3 2.07-1.47 2.28c-1.4-.19-1.32-1.35-1.09-2.58s.59-2.53-.31-2.99c-.72-.48-1.22.35-1.85 1.17c-.65.81-1.39 1.6-2.61 1.02c-1.1-.91-.68-1.44-.1-2.12s1.33-1.59.9-3.19c-.18-.65-1.08-.5-1.97-.52c-.87-.02-1.75-.2-1.84-1.5c-.07-.79.52-1.11 1.13-1.36c.62-.25 1.25-.43 1.26-1.06c.03-.61-.38-1.04-.64-1.49s-.37-.92.25-1.62c1.05-.86 1.89-.13 2.73.66s1.67 1.62 2.7.97c.82-.54.07-1.49-.51-2.42s-.99-1.82.51-2.23c1.3-.36 1.8.53 2.25 1.56c.46 1.03.86 2.2 1.96 2.41c1.57.29 2.71-1.55 3.8-3.01s2.16-2.55 3.53-.75c1.5 1.89.07 2.77-1.6 3.55c-1.67.73-3.59 1.37-3.13 2.78c.27.82 1.15.37 2.08.06c.92-.31 1.91-.48 2.39.93c.51 1.49-.7 1.83-2.06 1.97s-2.88.08-2.98.76c-.11.71.8 1 1.59 1.42c.79.43 1.46 1 .85 2.28M20.5 19c-.95 0-1.44-.74-1.44-1.5s.48-1.5 1.44-1.5c1 0 1.5.74 1.5 1.5s-.5 1.5-1.5 1.5"></path></svg>
                                <p className='text-xl' ><strong>{sumarise.inksTotal}</strong></p>
                            </div>
                            <p className='text-xs opacity-50'>Total de tintas</p>
                        </div>
                        <Separator orientation="vertical" />
                        <div className='mx-3'>
                            <div className='flex flex-row align-center items-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 16 16"><g fill="currentColor"><path d="m14.12 10.163l1.715.858c.22.11.22.424 0 .534L8.267 15.34a.6.6 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858l5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.6.6 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.6.6 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535z"></path><path d="m14.12 6.576l1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.6.6 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858l5.317 2.659c.505.252 1.1.252 1.604 0z"></path></g></svg>
                                <p className='text-xl'><strong>{sumarise.totalRemaining}</strong></p>
                            </div>
                            <p className='text-xs opacity-50'>Total restante Kg's</p>
                        </div>
                        <Separator orientation="vertical" />

                        <div>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant={'ghost'}>
                                        <div className='flex flex-row items-center gap-2'>
                                            <p>
                                                Total de existencias por tipo
                                            </p>
                                            <ChevronsUpDown className='w-4 h-4' />
                                        </div>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className='w-72'>
                                    <ScrollArea className='h-72'>
                                        <div className='flex flex-col gap-2 w-auto pr-3 pb-1'>
                                            {sumarise.orderDesInkDtoList.map((item, index) => (
                                                <div key={index} className='flex flex-col justify-between items-center'>
                                                    <div className='flex flex-row justify-between w-full'>
                                                        <p className='text-sm'>{item.typeMaterial}</p>
                                                        <div className='flex flex-row items-baseline'>
                                                            <p className='text-sm'>{item.remainingVolume}</p><p className='text-[12px] opacity-50 ml-1'>Kg's</p>
                                                        </div>
                                                    </div>
                                                    {index !== sumarise.orderDesInkDtoList.length - 1 && (
                                                        <Separator orientation='horizontal' className='h-6 mx-2 w-5/6' />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </PopoverContent>
                            </Popover>
                        </div>

                    </div>
                </div>
            </div>
            <div className='w-0 h-0'>
                <GlobalDialog>
                    <FormOutputInk />
                </GlobalDialog>
            </div>
        </div>
    )
}