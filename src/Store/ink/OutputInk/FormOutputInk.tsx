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

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer"

import { TableRow, TableCell, Table, TableBody, TableHeader, TableHead } from "@/components/ui/table"
import { toast } from "sonner"
import axios from "axios"

const formSchema = z.object({
    production: z.number().min(9999, { message: "Debe tener almenos 5 digitos" }),
    whoDelivers: z.string().min(1, { message: "Este campo es requerido" }),
    whoReceives: z.string().min(1, { message: "Este campo es requerido" }),
    inks: z.array(
        z.object({
            kilogramsRequired: z.number().min(0.001, { message: "Debe ser mayor o igual a 0.001Ks's" }),
            kilogramsDelivered: z.number().min(0.001, { message: "Debe ser mayor o igual a 0.001Ks's" }),
        }))
})

export default function FormOutputInk() {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const { setOpen, numbers, setNumbers } = useContext(StockContext)
    type TempDataType = {
        production: number;
        whoDelivers: string;
        whoReceives: string;
        inks: { id: number; kilogramsRequired: number; kilogramsDelivered: number; }[];
    } | null;

    const [tempData, setTempData] = useState<TempDataType>(null);
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
            production: undefined,
            inks: [{
                kilogramsRequired: 0,
                kilogramsDelivered: 0,
            }],
            whoDelivers: '',
            whoReceives: '',
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const dataToSend = {
            production: values.production,
            whoDelivers: values.whoDelivers,
            whoReceives: values.whoReceives,
            inks: ApiData.map((item, index) => ({
                id: numbers[index],
                kilogramsRequired: values.inks[index].kilogramsRequired,
                kilogramsDelivered: values.inks[index].kilogramsDelivered,
            })),
        };

        // Guarda los datos temporalmente si necesitas usarlos después
        setTempData(dataToSend);
        console.log("Datos a enviar:", tempData);
        // Muestra el diálogo
        setIsAlertOpen(true);
    }

    const handleConfirm = async () => {
        setIsAlertOpen(false);
        try {
            const response = await axios.post(`${url}/ink/inksRequiredToProduction`, tempData);
            if (response.status === 200) {
                toast.success("Datos enviados correctamente");
                setOpen(false);
                setNumbers([]);
            }
        } catch (error) {
            toast.error(`Error al enviar los datos: ${error}`);
        }
    };

    return (
        <div className="w-full flex flex-row items-center justify-center max-h-150 overflow-y-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div>
                        <div className="flex flex-row items-center justify-between">
                            <FormField
                                defaultValue={0}
                                control={form.control}
                                name="production"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Numero de orden de produccion</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="00000" {...field} onChange={(e) => { field.onChange(e.target.valueAsNumber) }} max={99999} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="mt-4">
                            <FormField
                                defaultValue="0"
                                control={form.control}
                                name="whoDelivers"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quién entrega</FormLabel>
                                        <FormControl>
                                            <Input placeholder="¿Quien entrega?" {...field} maxLength={255} onChange={(e) => {field.onChange(e.target.value.toLocaleUpperCase())}}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="mt-4">
                            <FormField
                                defaultValue="0"
                                control={form.control}
                                name="whoReceives"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quién recibe</FormLabel>
                                        <FormControl>
                                            <Input placeholder="¿Quien recibe?" {...field} maxLength={255} onChange={(e) => {field.onChange(e.target.value.toLocaleUpperCase())}}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="mt-4 max-h-80 overflow-y-auto ">
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

            <Drawer open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>¿Estas completamentente seguro?</DrawerTitle>
                        <DrawerDescription>Esta accion no se podra deshacer</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pl-12 pr-12">
                        <p className="text-sm text-gray-700">Se enviaran los siguientes datos:</p>
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
                                {tempData && tempData.inks.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="w-auto">{item.id}</TableCell>
                                        <TableCell className="w-auto">{ApiData[index].provider}</TableCell>
                                        <TableCell className="w-auto">{ApiData[index].typeMateria}</TableCell>
                                        <TableCell className="w-auto">{ApiData[index].volumenRemaiming}</TableCell>
                                        <TableCell className="w-auto">{item.kilogramsRequired}</TableCell>
                                        <TableCell className="w-auto">{item.kilogramsDelivered}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <DrawerFooter>
                        <Button onClick={handleConfirm}>Submit</Button>
                        <DrawerClose>
                            <Button variant="outline" onClick={() => { setIsAlertOpen(false) }}>Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

        </div>
    )
}