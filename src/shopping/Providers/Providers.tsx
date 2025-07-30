import React from 'react'
import { useEffect, useContext, useState } from 'react'
import { DataTable } from './DataTable'
import { columns } from './Columns'
import { ProviderContext } from './ProvidersContext'
import type { Providers } from './Columns'
import axios from 'axios'
const url = import.meta.env.VITE_API_URL

export default function Providers() {
  const { refreshKey, selectedType} = useContext(ProviderContext)
  const [data, setData] = useState<Providers[]>([])

  async function getProviders() {
    try {
      const response = await axios.get(`${url}/provider/findProvidersByType/${selectedType}`)
      setData(response.data)
    } catch (error) {
      console.error("Error fetch data", error)
    }
  }

  useEffect(() => {
    getProviders()
  }, [refreshKey])

  return (
    <div className='w-full h-full px-30'>
      <div className=''>
        <DataTable data={data} columns={columns} />
      </div>
    </div>
  )
}
