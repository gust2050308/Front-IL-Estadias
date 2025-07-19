import { useEffect, useState, useContext } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import axios from "axios"
const url = import.meta.env.VITE_API_URL;
import { StockContext } from "./StockContext"
import type { filterType } from "./StockContext"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup
} from "@/components/ui/select"
import { toast } from "sonner"

const formSchema = z.object({
  provider: z.preprocess(
    (val) => {
      if (val === "none" || val === "" || val == null) return null
      const num = Number(val)
      return isNaN(num) ? null : num
    },
    z.number().optional().nullable()
  ), providerBatch: z.string().optional().nullable(),
  internalBatch: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
  code: z.string().optional().nullable(),
  remainingVolumeMin: z.number().optional().nullable(),
  remainingVolumeMax: z.number().optional().nullable()
});

export default function FilterStock() {
  const [providers, setProviders] = useState<any[]>([])
  const { setFilter, refreshData } = useContext(StockContext)
  const [filter, setFilterState] = useState<filterType | undefined>(undefined)

  const filterForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: filter
  })

  useEffect(() => {
    const storedFilters = localStorage.getItem('filters-stock')
    if (storedFilters) {
      try {
        const parsed = JSON.parse(storedFilters)

        filterForm.reset(parsed)

        setFilterState(parsed as filterType)

        setFilter?.({
          idProvider: parsed.provider ?? undefined,
          batchProvider: parsed.providerBatch ?? "",
          internalBatch: parsed.internalBatch ?? "",
          typeMaterial: parsed.type ?? "",
          codeItem: parsed.code ?? "",
          minRemaining: parsed.remainingVolumeMin ?? undefined,
          maxRemaining: parsed.remainingVolumeMax ?? undefined
        } as filterType)
      } catch (err) {
        console.error("No se pudieron cargar los filtros persistidos:", err)
      }
    }

    getProviders()
  }, [])

  async function getProviders() {
    axios.post(`${url}/provider/ProvidersByType`, "TINTA", {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        setProviders(response.data)
      })
      .catch((error) => {
        toast.error(`Error: ${error}`)
      })
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    localStorage.setItem("filters-stock", JSON.stringify(values))
    setFilter?.({
      idProvider: values.provider ?? undefined,
      batchProvider: values.providerBatch ?? "",
      internalBatch: values.internalBatch ?? "",
      typeMaterial: values.type ?? "",
      codeItem: values.code ?? "",
      minRemaining: values.remainingVolumeMin ?? undefined,
      maxRemaining: values.remainingVolumeMax ?? undefined
    } as filterType)
    refreshData()
  }

  return (
    <div className="w-md h-full px-5 py-10 min-w-50">

      <h1 className=''><strong>FILTROS</strong></h1>

      <div className='px-2 py-3 grid grid-cols-1 gap-y-5'>
        <Form {...filterForm}>
          <form onSubmit={filterForm.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-1 gap-y-5'>
              <div className='grid grid-cols-1 gap-y-5'>
                <FormField
                  control={filterForm.control}
                  name="provider"
                  render={({ field }) => (
                    <FormItem className='w-auto'>
                      <FormLabel>Proveedor:</FormLabel>
                      <Select
                        key={field.value}
                        onValueChange={(value) => field.onChange(value ? Number(value) : null)}
                        value={field.value?.toString() ?? ""}
                      >
                        <FormControl>
                          <SelectTrigger className='w-auto bg-white'>
                            <SelectValue placeholder="Seleccionar proveedor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-60 overflow-y-auto">
                          <SelectGroup>
                            <SelectItem value='none'>Ninguno</SelectItem>
                            {providers.map((provider) => (
                              <SelectItem
                                key={provider.idProvider}
                                value={provider.idProvider.toString()}
                              >
                                {provider.providerName}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={filterForm.control}
                  name="providerBatch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lote Proveedor: </FormLabel>
                      <FormControl>
                        <Input placeholder='Buscar por Lote de Proveedor ' {...field} value={field.value ?? ""} type="text" className="w-full bg-white" onChange={(e) => { field.onChange(e.target.value.toUpperCase()) }} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={filterForm.control}
                  name="internalBatch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lote Interno: </FormLabel>
                      <FormControl>
                        <Input placeholder='Buscar por Lote Interno' {...field} value={field.value ?? ""} type="text" className="w-full bg-white" onChange={(e) => { field.onChange(e.target.value.toLocaleUpperCase()) }} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={filterForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Material: </FormLabel>
                      <FormControl>
                        <Input placeholder='Buscar por Tipo de Material ' {...field} value={field.value ?? ""} type="text" className="w-full bg-white" onChange={(e) => { field.onChange(e.target.value.toLocaleUpperCase()) }} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={filterForm.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Código: </FormLabel>
                      <FormControl>
                        <Input placeholder='Buscar por Proveedor' {...field} value={field.value ?? ""} type="text" className="w-full bg-white" onChange={(e) => { field.onChange(e.target.value.toLocaleUpperCase()) }} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormLabel>Kg's Restantes:</FormLabel>
                <div className='grid-cols-2 gap-x-0 flex flex-row'>
                  <FormField
                    control={filterForm.control}
                    name='remainingVolumeMin'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Min: </FormLabel>
                        <FormControl>
                          <Input placeholder='0' {...field} value={field.value ?? ''} type="number" className="w-5/6 bg-white" onChange={(e) => { field.onChange(e.target.valueAsNumber) }} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={filterForm.control}
                    name='remainingVolumeMax'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max: </FormLabel>
                        <FormControl>
                          <Input placeholder='0' {...field} value={field.value ?? ''} type="number" className="w-5/6 bg-white" onChange={(e) => { field.onChange(e.target.valueAsNumber) }} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className='flex flex-row justify-between items-center'>
                <Button type='submit' className='bg-gradient-to-r from-blue-600 to-sky-800 w-5/6 p-0 m-0 hover:bg-blue-300' >Aplicar</Button>
                <Button className='bg-gray-300 hover:bg-gray-400' onClick={() => {
                  filterForm.reset({
                    provider: null,
                    providerBatch: null,
                    internalBatch: null,
                    type: null,
                    code: null,
                    remainingVolumeMin: null,
                    remainingVolumeMax: null
                  })
                  localStorage.removeItem('filters-stock')
                  setFilter?.({
                    idProvider: undefined,
                    batchProvider: "",
                    internalBatch: "",
                    typeMaterial: "",
                    codeItem: "",
                    minRemaining: undefined,
                    maxRemaining: undefined
                  } as filterType)
                  refreshData()
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className='text-black hover:text-gray-900' width={32} height={32} viewBox="0 0 24 24"><g className="trash-outline"><g fill="currentColor" fillRule="evenodd" className="Vector" clipRule="evenodd"><path d="M4.917 6.003a1 1 0 0 1 1.08.914l.849 10.248A2 2 0 0 0 8.839 19h6.322a2 2 0 0 0 1.993-1.835l.85-10.248a1 1 0 0 1 1.993.166l-.85 10.247A4 4 0 0 1 15.162 21H8.84a4 4 0 0 1-3.987-3.67l-.85-10.247a1 1 0 0 1 .914-1.08"></path><path d="M3 7a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1m7 2a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-4a1 1 0 0 1 1-1"></path><path d="M10.441 5a1 1 0 0 0-.948.684l-.544 1.632a1 1 0 1 1-1.898-.632l.544-1.633A3 3 0 0 1 10.441 3h3.117a3 3 0 0 1 2.846 2.051l.545 1.633a1 1 0 0 1-1.898.632l-.544-1.632A1 1 0 0 0 13.56 5h-3.117Z"></path></g></g></svg>
                </Button>
              </div>
            </div>
          </form>
        </Form>        
      </div>
    </div>
  )
}