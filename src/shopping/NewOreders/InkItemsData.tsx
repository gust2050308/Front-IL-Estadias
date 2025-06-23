import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
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
import { toast } from "sonner"
import { format } from "date-fns"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

const url = import.meta.env.VITE_API_URL

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"

import { useContext } from "react"

import { GeneralDataContext } from "./GeneralDataContext"

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

import { REGEXP_ONLY_DIGITS } from "input-otp"

import { cn } from "@/lib/utils"

const DeliverPlaces = ['Galeana No. 45, Col. Acapantzingo, Cuernavaca, Morelos, México', 'Plan de Ayala, Cuernavaca, Morelos, México'] as const

const formSchema = z.object({
  //select: z.string().min(1, { message: 'Selecciona una producción' }),
  orderNumber: z.number().min(1000, { message: "Debe ser de al menos 4 digitos" }),
  providers: z.coerce.number().min(1, "Debe seleccionar un proveedor"),
  deliveryDateExpected: z.coerce.date({
    required_error: "Se espera una fecha",
  }),
  requiredBy: z.string().min(1, { message: "Este campo es requerido" }),
  paymentMethod: z.string().min(1, { message: "Este campo es requerido" }),
  shipment: z.string().min(1, { message: "Este campo es requerido" }),
  deliveryPlace: z.string().min(1, { message: "Este campo es requerido" }),
  inkItems: z.array(
    z.object(
      {
        unitsQuantity: z.number().min(1, { message: 'Al menos una unidad ' }),
        amountKilograms: z.number().min(1, { message: 'Debe ser mayor a 1' }),
        codeItem: z.string().min(4, { message: 'Minimo 4 caraceteres' })
      }
    )
  )
})

export default function InkItemsData() {
  const { setOpen } = useContext(GeneralDataContext)
  const [providers, setProviders] = useState<any[]>([])

  async function getProviders() {
    try {
      const response = await axios.get(`${url}/provider`);
      console.log("providers" + response.data)
      setProviders(response.data); // Asegúrate de que `setProviders` esté definido correctamente
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
      //select: undefined,
      orderNumber: undefined,
      providers: undefined,
      deliveryDateExpected: new Date(),
      requiredBy: '',
      paymentMethod: '',
      shipment: '',
      deliveryPlace: '',
      inkItems: [{
        unitsQuantity: 0,
        amountKilograms: 0,
        codeItem: ''
      }]
    },
  })

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  async function deletePurchaseOrder(idOrder: number) {
    try {
      const response = await axios.delete(`${url}/PurchaseOrder/${idOrder}`)
      if (response.status === 200) {
        toast.success("Orden ELIMINADA exitosamente")
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert(`Error al enviar los datos: ${error instanceof Error ? error.message : "Error desconocido"}`);
    }

  }


  async function sendDataToApi(formValues: z.infer<typeof formSchema>) {
    try {
      const payload = {
        purchaseOrderNumber: formValues.orderNumber,
        provider: {
          idProvider: formValues.providers
        },
        requestDate: new Date().toISOString(),
        deliveryDateExpected: formValues.deliveryDateExpected.toISOString(),
        requiredBy: formValues.requiredBy,
        paymentMethod: formValues.paymentMethod,
        shipment: formValues.shipment,
        deliveryPlace: formValues.deliveryPlace,
        isComplete: false,
        typeMaterial: true,
        inkItems: formValues.inkItems.map(item => ({
          ...item,
          isSatisfied: false
        })),
      };

      const response = await axios.post(`${url}/PurchaseOrder`, payload);
      if (response.status === 201) {
        setOpen(false)
        toast("Orden creada exitosamente", {
          description: "Se ha registrado una nueva orden.",
          action: {
            label: "Deshacer",
            onClick: () => {
              const order = response.data;
              deletePurchaseOrder(order.id_PurchaseOrder)
            },
          },
        })
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert(`Error al enviar los datos: ${error instanceof Error ? error.message : "Error desconocido"}`);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted:", values)
    await sendDataToApi(values);
  }

  const { control, handleSubmit, register, formState: { errors } } = form;


  const { fields, append, remove } = useFieldArray({
    name: "inkItems",
    control,
  });

  return (
    <div className="w-270 p-2" style={{ maxHeight: '450px', overflowY: 'auto', overflowX: 'auto' }}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="flex flex-row items-center justify-between">
            <FormField
              control={form.control}
              name="orderNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No. Orden </FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={4}
                      pattern={REGEXP_ONLY_DIGITS}
                      value={field.value === 0 || !field.value ? "" : String(field.value)}
                      onChange={(value) => {
                        const parsed = parseInt(value)
                        if (!isNaN(parsed)) field.onChange(parsed)
                        else field.onChange(undefined)
                      }}
                    >
                      <InputOTPGroup>
                        {[0, 1, 2, 3].map((index) => (
                          <InputOTPSlot key={index} index={index} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
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
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))} // Convertir a número
                    value={field.value?.toString()} // Convertir a string para el Select
                  >
                    <FormControl>
                      <SelectTrigger>
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
          <div className='justify-between w-full' >
            <FormField
              control={form.control}
              name="shipment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Embarque: </FormLabel>
                  <FormControl>
                    <Input placeholder='Lugar ' {...field} type="text" className="w-full" />
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
              name="paymentMethod"
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
                  <FormLabel>Lugar de entrega</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-230">
                        <SelectValue placeholder="Seleccionar lugar" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-60 overflow-y-auto">
                      <SelectGroup>
                        {DeliverPlaces.map((place) => (
                          <SelectItem key={place} value={place}>
                            {place}
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
          <div>
            <div className="flex flex-row justify-between">
              <h1 className="text-lg leading-none font-semibold ml-2.5">Items</h1>
              <Button type="button" onClick={() => append({ unitsQuantity: 0, codeItem: '', amountKilograms: 0 })}>
                Agregar Ítem
              </Button>
            </div>
            <div className="rounded-md border mt-2" style={{ maxHeight: '600', overflowY: "auto" }}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unidades</TableHead>
                    <TableHead>Código</TableHead>
                    <TableHead>Cantidad (Kg)</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell>
                        <FormField
                          control={control}
                          name={`inkItems.${index}.unitsQuantity` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <FormField
                          control={control}
                          name={`inkItems.${index}.codeItem` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} onChange={(e) => {
                                  field.onChange(e.target.value.toUpperCase())
                                }} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <FormField
                          control={control}
                          name={`inkItems.${index}.amountKilograms` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <Button type="button" variant="destructive" onClick={() => remove(index)}>
                          Eliminar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <Button type='submit' className="bg-blue-600">Hecho</Button>
        </form>
      </Form>
    </div>
  )
}