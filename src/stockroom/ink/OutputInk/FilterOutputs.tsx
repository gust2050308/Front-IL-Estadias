import { useEffect, useContext, useState } from "react"
import axios from "axios"
const url = import.meta.env.VITE_API_URL;
import { toast } from "sonner"
import { useForm } from "react-hook-form";
import { z } from "zod"
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
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

const formSchema = z.object({
  provider: z.number().optional().nullable(),
  providerBatch: z.string().optional().nullable(),
  internalBatch: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
  code: z.string().optional().nullable(),
  remainingVolumeMin: z.number().optional().nullable(),
  remainingVolumeMax: z.number().optional().nullable()
});

export default function FilterOutputs() {const [providers, setProviders] = useState<any[]>([])

  useEffect(() => {
    getProviders()
  }, [])

  async function getProviders() {
  axios.post(`${url}/provider/ProvidersByType`, "TINTA", {
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json'
  }})
    .then((response) =>{
      setProviders(response.data)
    })
    .catch( (error) =>{
      toast.error(`Error: ${error}`)
    })
  }

  const filterForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {

    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
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
                    <FormItem className='w-auto' >
                      <FormLabel>Proveedor: </FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))} // Convertir a número
                        value={field.value?.toString()} // Convertir a string para el Select
                      >
                        <FormControl>
                          <SelectTrigger className='w-auto bg-white' >
                            <SelectValue placeholder="Seleccionar proveedor">
                              {providers.find(p => p.idProvider === field.value)?.providerName || "Seleccionar"}
                            </SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-60 overflow-y-auto">
                          <SelectGroup>
                            {providers.map((provider) => (
                              <SelectItem
                                key={provider.idProvider}
                                value={provider.idProvider.toString()} // Convertir a string
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
                        <Input placeholder='Buscar por Lote de Proveedor ' {...field} value={field.value ?? ""} type="text" className="w-full bg-white" onChange={(e) => { field.onChange(e.target.value.toUpperCase()) }}/>
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
                        <Input placeholder='Buscar por Lote Interno' {...field} value={field.value ?? ""} type="text" className="w-full bg-white" onChange={(e) =>{field.onChange(e.target.value.toLocaleUpperCase())}} />
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
                        <Input placeholder='Buscar por Tipo de Material ' {...field} value={field.value ?? ""} type="text" className="w-full bg-white" onChange={(e)=>{field.onChange(e.target.value.toLocaleUpperCase())}} />
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
                        <Input placeholder='Buscar por Proveedor' {...field} value={field.value ?? ""} type="text" className="w-full bg-white" onChange={(e) => { field.onChange(e.target.value.toLocaleUpperCase())}}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormLabel>Kg's Restantes:</FormLabel>
                <div className='grid-cols-2 gap-x-2 flex flex-row'>
                  <FormField
                    control={filterForm.control}
                    name='remainingVolumeMin'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Min: </FormLabel>
                        <FormControl>
                          <Input placeholder='0' {...field} value={field.value ?? ''} type="number" className="w-5/6 bg-white" onChange={(e) => { field.onChange(e.target.valueAsNumber)}} />
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
              <Button type='submit' className='bg-gradient-to-r from-blue-600 to-sky-800' onClick={() => {
                toast.info("Buscando...")
              }}>Aplicar</Button>
            </div>
          </form>
        </Form>
        <div className='w-full grid grid-cols-2 gap-2.5'>
          <Button className='bg-gradient-to-r from-red-950 to-stone-900 w-full'>PDF</Button>
          <Button className='bg-gradient-to-r from-emerald-950 to-stone-900 w-full'>XLSX</Button>
        </div>
      </div>
    </div>
  )
}
