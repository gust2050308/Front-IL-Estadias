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
import { useNavigate } from 'react-router-dom';

import { format } from "date-fns"

const url = import.meta.env.VITE_API_URL
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"

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

const DeliverPlaces = ['Galeana No. 45, Col. Acapantzingo, Cuernavaca, Morelos, México', 'Plan de Ayala, Cuernavaca, Morelos, México'] as const

const formSchema = z.object({
  select: z.string().min(1, { message: 'Selecciona una producción' }),
  orderNumber: z.coerce.number().min(1, { message: "Debe ser de al menos 4 digitos" }),
  providers: z.coerce.number().min(1, "Debe seleccionar un proveedor"),
  deliveryDateExpected: z.coerce.date({
    required_error: "Se espera una fecha",
  }),
  requiredBy: z.string().min(1, { message: "Este campo es requerido" }),
  paymentMethod: z.string().min(1, { message: "Este campo es requerido" }),
  shipment: z.string().min(1, { message: "Este campo es requerido" }),
  deliveryPlace: z.string().min(1, { message: "Este campo es requerido" }),
})

interface PapersItemsModel {
  unitsQuantity: any; //
  codeItem: string; // 
  amountKilograms: any; // 
}

export default function InkItemsData() {
  const [providers, setProviders] = useState<any[]>([])

  const navigate = useNavigate();

  const [items, setItems] = useState<PapersItemsModel[]>([
    {
      unitsQuantity: '',
      codeItem: '',
      amountKilograms: '',
    },
  ]);

  const handleChange = (index: number, field: keyof PapersItemsModel, value: string) => {
    const newItems = [...items];

    switch (field) {
      case 'unitsQuantity':
        newItems[index].unitsQuantity = parseInt(value); // Manejar valores vacíos
        break;
      case 'codeItem':
        newItems[index].codeItem = value;
        break;
      case 'amountKilograms':
        newItems[index].amountKilograms = parseInt(value); // Manejar valores vacíos
        break;
      default:
        break;
    }
    setItems(newItems);
  }

  const handleAddRow = () => {
    setItems([...items, { unitsQuantity: '', codeItem: '', amountKilograms: '', }]);
  };

  const handleDeleteRow = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

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
      select: undefined,
      orderNumber: 0,
      providers: undefined,
      deliveryDateExpected: new Date(),
      requiredBy: '',
      paymentMethod: '',
      shipment: '',
      deliveryPlace: '',
    },

  })

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  async function sendDataToApi(formValues: z.infer<typeof formSchema>) {
    try {

      const payload = {
        purchaseOrderNumber: formValues.orderNumber,
        provider: {
          id_Provider: formValues.providers // Usar directamente el ID del formulario
        },
        requestDate: new Date().toISOString(),
        deliveryDateExpected: formValues.deliveryDateExpected.toISOString(),
        requiredBy: formValues.requiredBy,
        paymentMethod: formValues.paymentMethod,
        shipment: formValues.shipment,
        deliveryPlace: formValues.deliveryPlace,
        isComplete: false,
        // Corregir el tipo de material usando el valor del formulario
        typeMaterial: true, // Asegurar valor booleano
        inkItems: items.map(item => ({
          unitsQuantity: item.unitsQuantity,
          amountKilograms: item.amountKilograms,
          codeItem: item.codeItem,
          isSatisfied: false,
        })),
      };

      console.log("Payload enviado:", payload); // Agregar log para depuración

      const response = await axios.post(`${url}/PurchaseOrder`, payload);
      if (response.status === 201) {
        alert("Orden enviada correctamente.");
        navigate('/homeShopping');
        console.log("Respuesta del servidor:", response.data);
        alert("Orden enviada correctamente.");

        form.reset();
        setItems([{ unitsQuantity: 0, codeItem: '', amountKilograms: 0 }]);
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


  return (
    <div className="w-270" style={{ maxHeight: '450px', overflowY: 'auto' }}>
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
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))} // Convertir a número
                    value={field.value?.toString()} // Convertir a string para el Select
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar proveedor">
                          {providers.find(p => p.id_Provider === field.value)?.provider_Name || "Seleccionar"}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-60 overflow-y-auto">
                      <SelectGroup>
                        {providers.map((provider) => (
                          <SelectItem
                            key={provider.id_Provider}
                            value={provider.id_Provider.toString()} // Convertir a string
                          >
                            {provider.provider_Name}
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
                        <SelectValue placeholder="Lugar" />
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
              <Button
                type="button"
                onClick={handleAddRow}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600">
                Agregar Ítem
              </Button>
            </div>
            <div className="rounded-md border mt-2" style={{ maxHeight: '600', overflowY: "auto" }}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unidades</TableHead>
                    <TableHead>Código</TableHead>
                    <TableHead>Cantidad(Kg)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Input
                          type="number"
                          placeholder="0"
                          className='w-32'
                          value={item.unitsQuantity}
                          onChange={(e) => handleChange(index, 'unitsQuantity', e.target.value)} />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="text"
                          placeholder="Código"
                          className='w-32 uppercase'
                          value={item.codeItem}
                          onChange={(e) =>
                            handleChange(index, 'codeItem', e.target.value.toUpperCase())
                          } />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          placeholder="0"
                          className='w-32'
                          value={item.amountKilograms}
                          onChange={(e) => handleChange(index, 'amountKilograms', e.target.value)} />
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          onClick={() => handleDeleteRow(index)}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                          Eliminar
                        </Button>
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>))}
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