import {DataTable} from './OutPutInksDataTable'
import { columns } from './Columns'
import axios from 'axios'
import { useEffect, useState } from 'react'
const url = import.meta.env.VITE_API_URL
import type { OutPut } from './Columns'
import { toast } from 'sonner'


export default function Outputs() {

  const [data, setData] = useState<OutPut[]>([])
  async function getOutputs() {
    await axios.get(`${url}/outputInks/findAll`)
      .then((response) => {
        const datos = response.data.map((output: any) => ({
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
        }));
        setData(datos)
      }, (error) => {
        toast.error("Error fetching data:", error);
      })
  }

  useEffect(() => {
    getOutputs();
  }, [])

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
