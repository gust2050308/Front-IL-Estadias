import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CalendarIcon } from "lucide-react"

import { format } from "date-fns"

const url = import.meta.env.VITE_API_URL

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from "axios"
import { useEffect, useState } from "react"

import { Calendar } from "@/components/ui/calendar"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { cn } from "@/lib/utils"

const productions = ['Productions 1', 'Productions 2', 'Productions 3', 'Productions 4', 'Productions 5', 'Produuctions 6',
  'Productions 7', 'Productions 8', 'Productions 9', 'Productions 10', 'Productions 11', 'Produuctions 12', 'Productions 13',
  'Productions 14', 'Productions 15', 'Productions 16', 'Productions 17', 'Produuctions 18',] as const;


const formSchema = z.object({
  select: z.string().min(1, { message: 'Selecciona una producción' }),
  orderNumber: z.coerce.number().min(1, { message: "Debe ser de al menos 4 digitos" }),
  providers: z.string().min(1, { message: "Selecciona un proveedor" }),
  deliveryDateExpected: z.coerce.date({
    required_error: "Se espera una fecha",
  }),
  requiredBy: z.string().min(1, { message: "Este campo es requerido" }),
  paymentMethod: z.string().min(1, { message: "Este campo es requerido" }),
  shipment: z.string().min(1, { message: "Este campo es requerido" }),
  typeMaterial: z.string().min(1, { message: "Este campo es requerido" }),
  deliveryPlace: z.string().min(1, { message: "Este campo es requerido" }),
})

function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values)
}

export default function InkItemsData() {
  const [providers, setProviders] = useState<any[]>([])

  async function getProviders() {
    try {
      const response = await axios.get(`${url}/provider`);
      const data = response.data.map((entry: any) => ({
        id: entry.id,
        name: entry.provider_Name,
      }));

      setProviders(data); // Asegúrate de que `setProviders` esté definido correctamente

      return data; // Retorna los datos procesados correctamente
    } catch (error) {
      console.error("Error fetching data:", error);
      return []; // Retorna un array vacío en caso de error
    }
  }


  useEffect(() => {
    async function fetchData() {
      await getProviders(); // Esperamos que los datos se carguen   // Ahora sí llamamos la función
    }
    fetchData();
  }, []);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      select: undefined,
      orderNumber: 0,
      providers: undefined,
      deliveryDateExpected: new Date(),
      requiredBy: '',
      paymentMethod: '',
      shipment: '',
      typeMaterial: '',
      deliveryPlace: '',
    },

  })

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);


  return (
    <div className="w-270">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="flex flex-row items-center justify-between">
            <FormField
              control={form.control}
              name="select"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Producción</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="No Producción" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-60 overflow-y-auto"> {/* 👈 aquí el scroll */}
                      <SelectGroup>
                        {productions.map((production) => (
                          <SelectItem key={production} value={production}>
                            {production}
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
              control={form.control}
              name="orderNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No. Orden </FormLabel>
                  <FormControl>
                    <Input placeholder='0' {...field} type="number" style={{ width: 200 }} maxLength={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="providers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proveedor</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Proveedor? " />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-60 overflow-y-auto"> {/* 👈 aquí el scroll */}
                      <SelectGroup>
                        {providers.map((provider, idx) => (
                          <SelectItem key={provider.id || idx} value={provider.name}>
                            {provider.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='justify-between' style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            <FormField
              control={form.control}
              name="deliveryDateExpected"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha esperada de entrega</FormLabel>
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
                            date > new Date() || date < new Date("1900-01-01")
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
              control={form.control}
              name="shipment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Embarque: </FormLabel>
                  <FormControl>
                    <Input placeholder='Lugar ' {...field} type="text" className="w-200" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="requiredBy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Requerido por: </FormLabel>
                <FormControl>
                  <Input placeholder='Nombre' {...field} type="text" className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-row justify-between">
            <FormField
              control={form.control}
              name="providers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de pago</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-60 overflow-y-auto"> {/* 👈 aquí el scroll */}
                      <SelectGroup>
                        <SelectItem value="Efectivo">Efectivo</SelectItem>
                        <SelectItem value="Debito">Debito</SelectItem>
                        <SelectItem value="Credito">Credito</SelectItem>
                        <SelectItem value="Otro">Otro</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deliveryPlace"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lugar de entrega: </FormLabel>
                  <FormControl>
                    <Input placeholder='Nombre' {...field} type="text" className="w-230" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
          <Button type="submit" className="bg-blue-600">Hecho</Button>
        </form>
      </Form>
    </div>
  )
}
