import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { DataTable } from './OutPutInksDataTable'
import { columns } from './Columns'
import { toast } from 'sonner'
import DialogForm from './DialogForm'
import { OutputContext } from './OutputContext'
import FilterOutputs from './FilterOutputs'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import type { OutPut } from './Columns'

const url = import.meta.env.VITE_API_URL

export default function Outputs() {
  const { refreshKey, filter, setFilter } = useContext(OutputContext)
  const [data, setData] = useState([])
  const [filtersApplied, setFiltersApplied] = useState(false)

  useEffect(() => {
    const storedFilter = localStorage.getItem("filterOutputs")
    if (storedFilter) {
      const parsedFilter = JSON.parse(storedFilter)

      const formValues = {
        minRequestedDate: parsedFilter.minRequestedDate ? new Date(parsedFilter.minRequestedDate) : undefined,
        maxRequestedDate: parsedFilter.maxRequestedDate ? new Date(parsedFilter.maxRequestedDate) : undefined,
        idInk: parsedFilter.idInk ?? undefined,
        type: parsedFilter.type ?? "",
        internalBatch: parsedFilter.internalBatch ?? "",
        minKgRequested: parsedFilter.minKgRequested ?? undefined,
        maxKgRequested: parsedFilter.maxKgRequested ?? undefined,
        minKgDelivered: parsedFilter.minKgDelivered ?? undefined,
        maxKgDelivered: parsedFilter.maxKgDelivered ?? undefined,
        whoDelivered: parsedFilter.whoDelivered ?? "",
        WhoRecibed: parsedFilter.WhoRecibed ?? "",
      }

      if (typeof setFilter === 'function') {
        setFilter(formValues)
        setFiltersApplied(true)
      }
    } else {
      setFiltersApplied(true)
    }

    toast.info('Buscando información...')
  }, [refreshKey])

  useEffect(() => {
    if (!filtersApplied) return;

    async function getOutputs() {
      try {
        const response = await axios.get(`${url}/outputInks/findByFilter`, {
          params: {
            minRequestedDate: filter?.minRequestedDate ?? '',
            maxRequestedDate: filter?.maxRequestedDate ?? '',
            idInk: filter?.idInk ?? '',
            type: filter?.type ?? '',
            internalBatch: filter?.internalBatch ?? '',
            minKgRequested: filter?.minKgRequested ?? '',
            maxKgRequested: filter?.maxKgRequested ?? '',
            minKgDelivered: filter?.minKgDelivered ?? '',
            maxKgDelivered: filter?.maxKgDelivered ?? '',
            whoDelivered: filter?.whoDelivered ?? '',
            WhoRecibed: filter?.WhoRecibed ?? '',
          },
        })

        const datos = response.data.map((output : OutPut ) => ({
          idOutputInk: output.idOutputInk,
          date: output.date.substring(0, 10),
          production: output.production,
          idInk: output.idInk,
          typeMaterial: output.typeMaterial,
          internalBatch: output.internalBatch,
          kilogramsRequired: output.kilogramsRequired,
          kilogramsDelivered: output.kilogramsDelivered,
          whoDelivers: output.whoDelivers,
          whoReceives: output.whoReceives,
          returnedKilogramsRequired: output.returnedKilogramsRequired,
        }))
        setData(datos)
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          toast.error("No se encontraron resultados para la búsqueda.")
        }
      }
    }

    getOutputs()
  }, [filter, filtersApplied]) // <-- importante: se ejecuta solo cuando filter ya está definido

  return (
    <div className='mt-2 h-150 w-full items-start'>
      <div className='flex flex-row w-full'>
        <ResizablePanelGroup direction="horizontal" className="rounded-md">
          <ResizablePanel defaultSize={18}>
            <div className="flex h-full items-center justify-center">
              <FilterOutputs />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={82}>
            <div className="flex h-full items-start justify-center px-6">
              <DataTable columns={columns} data={data} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
        <DialogForm>
          Children
        </DialogForm>
      </div>
    </div>
  )
}
