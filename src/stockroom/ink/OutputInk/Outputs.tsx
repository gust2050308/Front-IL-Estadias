import { DataTable } from './OutPutInksDataTable'
import { columns } from './Columns'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
const url = import.meta.env.VITE_API_URL
import type { OutPut } from './Columns'
import { toast } from 'sonner'
import DialogForm from './DialogForm'
import { OutputContext } from './OutputContext'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import FilterOutputs from './FilterOutputs'

export default function Outputs() {
  const { refreshKey } = useContext(OutputContext)
  const [data, setData] = useState<OutPut[]>([])
  async function getOutputs() {
    await axios.get(`${url}/outputInks/findAll`)
      .then((response) => {
        const datos: OutPut[] = response.data.map((output: any): OutPut => ({
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
        }));
        setData(datos)
      }, (error) => {
        toast.error("Error fetching data:" + error);
      })
  }

  useEffect(() => {
    getOutputs();
    toast.info('Buscando información...')
  }, [refreshKey])

  return (
    <div className=' mt-2 h-150 w-full items-start'>
      <div className='flex flex-row w-full'>
        <ResizablePanelGroup
          direction="horizontal"
          className="rounded-md">
          <ResizablePanel defaultSize={18}>
            <div className="flex h-full items-center justify-center">

              <FilterOutputs />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={82} >
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
