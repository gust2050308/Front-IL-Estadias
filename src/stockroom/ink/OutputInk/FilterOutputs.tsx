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
import { Calendar } from "@/components/ui/calendar"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"


const formSchema = z.object({
  minRequestedDate: z.date().optional().nullable(),
  maxRequestedDate: z.date().optional().nullable(),
  inkId: z.number().optional().nullable(),
  type: z.string().optional().nullable(),
  internalBatch: z.string().optional().nullable(),
  minKgRequested: z.number().optional().nullable(),
  maxKgRequested: z.number().optional().nullable(),
  minKgDelivered: z.number().optional().nullable(),
  maxKgDelivered: z.number().optional().nullable(),
  whoDelivered: z.string().optional().nullable(),
  WhoRecibed: z.string().optional().nullable(),
});

export default function FilterOutputs() {

  useEffect(() => {
  }, [])

  const filterForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {

    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  return (
    <div className="w-md h-full px-5 py-10 min-w-50">

      <h1 className=''><strong>FILTROS</strong></h1>

      <div className='px-2 py-3 grid grid-cols-1 gap-y-5'>
        <Form {...filterForm}>
          <form onSubmit={filterForm.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-1 gap-y-5'>
              <div className='grid grid-cols-1 gap-y-5'>
                <div className='grid grid-cols-2 gap-x-2'>
                  <FormField
                    control={filterForm.control}
                    name="minRequestedDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Fecha minima</FormLabel>
                        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                              onClick={() => setIsCalendarOpen(true)}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Fecha</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="z-[9999] w-auto p-0 bg-white" align="start">
                            <div onClick={(e) => e.stopPropagation()}>

                              <Calendar
                                mode="single"
                                selected={field.value ? new Date(field.value) : undefined}
                                onSelect={(date) => {
                                  if (date) {
                                    field.onChange(date)
                                    setIsCalendarOpen(false)
                                  }
                                }}
                                disabled={(date) =>
                                  date < new Date(new Date().setHours(0, 0, 0, 0))
                                }

                                initialFocus
                              />
                            </div>
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  /><FormField
                    control={filterForm.control}
                    name='maxRequestedDate'
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Fecha maxima</FormLabel>
                        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Selecciona una fecha</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="z-[9999] w-auto p-0 bg-white" align="start">
                            <div onClick={(e) => e.stopPropagation()}>

                              <Calendar
                                mode="single"
                                selected={field.value ? new Date(field.value) : undefined}
                                onSelect={(date) => {
                                  if (date) {
                                    field.onChange(date)
                                    setIsCalendarOpen(false)
                                  }
                                }}
                                disabled={(date) =>
                                  date < new Date(new Date().setHours(0, 0, 0, 0))
                                }

                                initialFocus
                              />
                            </div>
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </div>

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
                <div className='grid-cols-2 gap-x-2 flex flex-row'>
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
