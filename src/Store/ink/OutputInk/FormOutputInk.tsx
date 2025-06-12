import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { StockContext } from "../Stock/StockContext"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState, useEffect, useContext } from "react"
const url = import.meta.env.VITE_API_URL
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { TableRow, TableCell, Table, TableBody, TableHeader, TableHead } from "@/components/ui/table"
import { toast } from "sonner"
import axios from "axios"

const productions = ['Productions 1', 'Productions 2', 'Productions 3', 'Productions 4', 'Productions 5', 'Produuctions 6', 'Productions 7', 'Productions 8', 'Productions 9', 'Productions 10', 'Productions 11', 'Produuctions 12', 'Productions 13', 'Productions 14', 'Productions 15', 'Productions 16', 'Productions 17', 'Produuctions 18',] as const;


const formSchema = z.object({
    select: z.enum(productions, {
        errorMap: () => ({ message: 'Selecciona una producción' }),
    }),
    whoDelivers: z.string().min(1, { message: "Este campo es requerido" }),
    whoReceives: z.string().min(1, { message: "Este campo es requerido" }),
    inks: z.array(
        z.object({
            kilogramsRequired: z.number().min(0.01, { message: "Debe ser mayor o igual a 0.01" }),
            kilogramsDelivered: z.number().min(0.01, { message: "Debe ser mayor o igual a 0.01" }),
        }))
})

export default function FormOutputInk() {

    const { setOpen, numbers, setNumbers } = useContext(StockContext)

    const [ApiData, setApiData] = useState<any[]>([])

    async function fetchData() {
        try {
            const response = await axios.post(  // <- Cambiado a POST
                `${url}/ink/findSelectedInks`,
                numbers,  // Array de IDs
                { headers: { 'Content-Type': 'application/json' } }
            );
            toast.info(`Numero de ids: ${numbers}`);
            if (response.status == 200) {
                setApiData(response.data);
            }
        } catch (error) {
            toast.error(`Error Api-datos: ${error}`);
        }
    }
    // useEffect para obtener los datos al cargar el componente
    useEffect(() => {
        fetchData()
    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            select: undefined,
            inks: [{
                kilogramsRequired: 0,
                kilogramsDelivered: 0,
            }],
            whoDelivers: '',
            whoReceives: '',
        },

    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
        const dataToSend ={
            production: values.select,
            whoDelivers: values.whoDelivers,
            whoReceives: values.whoReceives,
            inks: ApiData.map((item, index) => ({
                id: numbers[index], // Asumiendo que numbers tiene los IDs correspondientes
                kilogramsRequired: values.inks[index].kilogramsRequired,
                kilogramsDelivered: values.inks[index].kilogramsDelivered,
            })),
        }

        console.log("Datos a enviar:", dataToSend);

        try{
            axios.post(`${url}/ink/outputInk`, dataToSend)
                .then((response) => {
                    if (response.status === 200) {
                        toast.success("Datos enviados correctamente");
                        setOpen(false);
                        setNumbers([]); // Limpiar los números después de enviar
                    } else {
                        toast.error("Error al enviar los datos");
                    }
                })
                .catch((error) => {
                    toast.error(`Error al enviar los datos: ${error}`);
                });
        } catch (error) {
            toast.error(`Error al e nviar los datos: ${error}`);
        }
    }

    return (
        <div className="w-full flex flex-row items-center justify-center">
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
                                                <SelectLabel>Producciones</SelectLabel>
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
                    </div>
                    <div>
                        <FormField
                            defaultValue="0"
                            control={form.control}
                            name="whoDelivers"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quién entrega</FormLabel>
                                    <FormControl>
                                        <Input placeholder="¿Quien entrega?" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="mt-4">
                            <FormField
                                defaultValue="0"
                                control={form.control}
                                name="whoReceives"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quién recibe</FormLabel>
                                        <FormControl>
                                            <Input placeholder="¿Quien recibe?" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <Table className="mt-4">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-auto">id</TableHead>
                                        <TableHead className="w-auto">Proveedor</TableHead>
                                        <TableHead className="w-auto">Tipo de material</TableHead>
                                        <TableHead className="w-auto">Kg's restantes</TableHead>
                                        <TableHead className="w-auto">Kilos requeridos</TableHead>
                                        <TableHead className="w-auto">Kilos entregados</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {ApiData && ApiData.map((item: any, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell className="w-auto">{item.id}</TableCell>
                                            <TableCell className="w-auto">{item.provider}</TableCell>
                                            <TableCell className="w-auto">{item.typeMateria}</TableCell>
                                            <TableCell className="w-auto">{item.volumenRemaiming}</TableCell>
                                            <TableCell className="w-auto">
                                                <FormField
                                                    control={form.control}
                                                    name={`inks.${index}.kilogramsRequired`}
                                                    render={({ field }) => (

                                                        <FormItem>
                                                            <FormControl>
                                                                <Input type="number" placeholder="Kg's requeridos" {...field} onChange={(e) => { field.onChange(e.target.valueAsNumber) }} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </TableCell>
                                            <TableCell className="w-auto">
                                                <FormField
                                                    control={form.control}
                                                    name={`inks.${index}.kilogramsDelivered`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input type="number" placeholder="Kg's entregados" {...field} onChange={(e) => { field.onChange(e.target.valueAsNumber) }} max={item.volumenRemaiming} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>

                                                    )}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    <Button type="submit" className="bg-blue-600">Hecho</Button>
                </form>
            </Form>
        </div>
    )
}