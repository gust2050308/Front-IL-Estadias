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
import type { filterType } from "./TableInputContext";
import { TableFormContext } from "./TableInputContext";

const formSchema = z.object({
  minRequestedDate: z.date().optional().nullable(),
  maxRequestedDate: z.date().optional().nullable(),
  idInk: z.number().optional().nullable(),
  type: z.string().optional().nullable(),
  internalBatch: z.string().optional().nullable(),
  minKgRequested: z.number().optional().nullable(),
  maxKgRequested: z.number().optional().nullable(),
  minKgDelivered: z.number().optional().nullable(),
  maxKgDelivered: z.number().optional().nullable(),
  whoDelivered: z.string().optional().nullable(),
  WhoRecibed: z.string().optional().nullable(),
});

export default function Filter() {
  const { setFilter, refreshData } = useContext(TableFormContext);
  useEffect(() => {
    const storedFilter = localStorage.getItem("filterOutputs");
    if (storedFilter) {
      console.log("FilterOutputs: ", storedFilter);
      const parsedFilter = JSON.parse(storedFilter);

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
      };

      filterForm.reset(formValues);
    }

  }, [])

  const filterForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      minRequestedDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
      maxRequestedDate: new Date(),
    }
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    localStorage.setItem("filterOutputs", JSON.stringify(values));

    // Normalizamos fechas
    if (values.minRequestedDate) {
      values.minRequestedDate.setHours(0, 0, 0, 0); // Inicio del día
    }

    if (values.maxRequestedDate) {
      // Sumamos un día para cubrir hasta el final del día
      values.maxRequestedDate.setDate(values.maxRequestedDate.getDate() + 1);
      values.maxRequestedDate.setHours(0, 0, 0, 0); // Inicio del siguiente día (equivale a 23:59:59.999 del día actual)
    }

    // Validación de rango
    if (
      values.minRequestedDate &&
      values.maxRequestedDate &&
      values.minRequestedDate > values.maxRequestedDate
    ) {
      toast.error("La fecha mínima no puede ser mayor que la fecha máxima.");
    } else {
      setFilter?.({
        minRequestedDate: values.minRequestedDate ?? undefined,
        maxRequestedDate: values.maxRequestedDate ?? undefined,
        idInk: values.idInk ?? undefined,
        type: values.type ?? "",
        internalBatch: values.internalBatch ?? "",
        minKgRequested: values.minKgRequested ?? undefined,
        maxKgRequested: values.maxKgRequested ?? undefined,
        minKgDelivered: values.minKgDelivered ?? undefined,
        maxKgDelivered: values.maxKgDelivered ?? undefined,
        whoDelivered: values.whoDelivered ?? "",
        WhoRecibed: values.WhoRecibed ?? "",
      } as filterType);

      refreshData();
    }
  }

  const [isMinCalendarOpen, setIsMinCalendarOpen] = useState(false);
  const [isMaxCalendarOpen, setIsMaxCalendarOpen] = useState(false);

  return (
    <div className="w-md h-full px-5 py-5 min-w-50">

      <h1 className=''><strong>FILTROS</strong></h1>

      <div className='px-2 py-3 grid grid-cols-1 gap-y-5'>
        <Form {...filterForm}>
          <form onSubmit={filterForm.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-1 gap-y-5'>
              <div className='grid grid-cols-1 gap-y-5'>
                <div className=''>
                  <FormField
                    control={filterForm.control}
                    name="minRequestedDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Fecha <p className='text-xs opacity-65' >Min - max</p> </FormLabel>
                        <Popover open={isMinCalendarOpen} onOpenChange={setIsMinCalendarOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-auto pl-3 text-left font-normal rounded-bl-none rounded-br-none",
                                !field.value && "text-muted-foreground"
                              )}
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
                                    setIsMinCalendarOpen(false)
                                  }
                                }}
                                disabled={(date) =>
                                  date > new Date(new Date().setHours(23, 59, 59, 999))
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
                  <FormField
                    control={filterForm.control}
                    name='maxRequestedDate'
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <Popover open={isMaxCalendarOpen} onOpenChange={setIsMaxCalendarOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-auto pl-3 text-left font-normal rounded-tl-none rounded-tr-none",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Fecha</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="z-[10] w-auto p-0 bg-white" align="start">
                            <div onClick={(e) => e.stopPropagation()}>
                              <Calendar
                                mode="single"
                                selected={field.value ? new Date(field.value) : undefined}
                                onSelect={(date) => {
                                  if (date) {
                                    field.onChange(date)
                                    setIsMaxCalendarOpen(false)
                                  }
                                }}
                                disabled={(date) =>
                                  date > new Date(new Date().setHours(23, 59, 59, 999))
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
                  name="idInk"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID de origen </FormLabel>
                      <FormControl>
                        <Input placeholder='Ej. 1005' {...field} value={field.value ?? ""} type='number' className="w-full bg-white" onChange={(e) => { field.onChange(e.target.valueAsNumber) }} />
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
                      <FormLabel>Tipo de material </FormLabel>
                      <FormControl>
                        <Input placeholder='Buscar por Lote Interno' {...field} value={field.value ?? ""} type="text" className="w-full bg-white" onChange={(e) => { field.onChange(e.target.value.toLocaleUpperCase()) }} />
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
                      <FormLabel>Lote interno </FormLabel>
                      <FormControl>
                        <Input placeholder='Buscar por Tipo de Material ' {...field} value={field.value ?? ""} type="text" className="w-full bg-white" onChange={(e) => { field.onChange(e.target.value.toLocaleUpperCase()) }} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormLabel>Kg's requeridos <p className='text-xs opacity-65' >Min - max</p> </FormLabel>
                <div className='grid-cols-2 flex flex-row' style={{ marginTop: "-0.5rem" }}>
                  <FormField
                    control={filterForm.control}
                    name='minKgRequested'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder='0' {...field} value={field.value ?? ''} type="number" className="w-5/6 bg-white mx-0" onChange={(e) => { field.onChange(e.target.valueAsNumber) }} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={filterForm.control}
                    name='maxKgRequested'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder='0' {...field} value={field.value ?? ''} type="number" className="w-5/6 bg-white" onChange={(e) => { field.onChange(e.target.valueAsNumber) }} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormLabel className='items-baseline' >Kg's entregados <p className='text-xs opacity-65' >Min - max</p></FormLabel>
                <div className='grid-cols-2 gap-x-2 flex flex-row' style={{ marginTop: "-0.5rem" }}>
                  <FormField
                    control={filterForm.control}
                    name='minKgDelivered'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder='0' {...field} value={field.value ?? ''} type="number" className="w-5/6 bg-white" onChange={(e) => { field.onChange(e.target.valueAsNumber) }} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={filterForm.control}
                    name='maxKgDelivered'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder='0' {...field} value={field.value ?? ''} type="number" className="w-5/6 bg-white" onChange={(e) => { field.onChange(e.target.valueAsNumber) }} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={filterForm.control}
                  name='whoDelivered'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quien entrega?</FormLabel>
                      <FormControl>
                        <Input placeholder='Buscar por Lote Interno' {...field} value={field.value ?? ""} type="text" className="w-full bg-white" onChange={(e) => { field.onChange(e.target.value.toLocaleUpperCase()) }} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /><FormField
                  control={filterForm.control}
                  name='WhoRecibed'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quien recibe?</FormLabel>
                      <FormControl>
                        <Input placeholder='Buscar por Lote Interno' {...field} value={field.value ?? ""} type="text" className="w-full bg-white" onChange={(e) => { field.onChange(e.target.value.toLocaleUpperCase()) }} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex flex-row justify-between items-center'>
                <Button type='submit' className='bg-gradient-to-r from-blue-600 to-sky-800 w-5/6 p-0 m-0 hover:bg-blue-300' >Aplicar</Button>
                <Button className='bg-gray-300 hover:bg-gray-400' onClick={() => {
                  filterForm.reset({
                    minRequestedDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
                    maxRequestedDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // today
                    idInk: undefined,
                    type: "",
                    internalBatch: "",
                    minKgRequested: undefined,
                    maxKgRequested: undefined,
                    minKgDelivered: undefined,
                    maxKgDelivered: undefined,
                    whoDelivered: "",
                    WhoRecibed: "",
                  })
                  localStorage.removeItem('filters-stock')
                  setFilter?.({
                    minRequestedDate: undefined,
                    maxRequestedDate: undefined,
                    idInk: undefined,
                    type: "",
                    internalBatch: "",
                    minKgRequested: undefined,
                    maxKgRequested: undefined,
                    minKgDelivered: undefined,
                    maxKgDelivered: undefined,
                    whoDelivered: "",
                    WhoRecibed: "",
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