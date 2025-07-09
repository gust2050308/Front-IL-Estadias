import { useState, useEffect, useContext } from "react"
import { OutputContext } from "../OutputInk/OutputContext"
import axios from "axios"
import { toast } from "sonner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
const url = import.meta.env.VITE_API_URL
import z from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"

type findToFormDevolucion = {
    idOutputInk: number
    date: string
    production: number
    idInk: number
    typeMaterial: string,
    internalBatch: string,
    kilogramsRequired: number
    kilogramsDelivered: number
    whoDelivers: string
    whoReceives: string
}

const formSchema = z.object({
    devolitionValue: z.array(
        z.object({
            devolutionQuantity: z.number().min(0.001, { message: 'Almenos un gramo' })
        })
    )
})

export default function () {
    const [dataFromApi, setDataFromApi] = useState<findToFormDevolucion[]>([])
    const [tempData, setTempData] = useState<any[]>([])
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const { numbers, setOpen, setNumbers } = useContext(OutputContext)


    async function getInfFromSelected() {
        try {
            toast.info('numbers: ' + numbers)
            await axios.post(`${url}/outputInks/findToFormDevolucion`, numbers)
                .then((response) => {
                    setDataFromApi(response.data)
                    console.log(dataFromApi)
                })
        } catch (e) {
            toast.error("Error: " + (e))
        }
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            devolitionValue: [
                { devolutionQuantity: 0 }
            ]
        }
    })


    function onSubmit(values: z.infer<typeof formSchema>) {
        const dataToSend = dataFromApi.map((item, index) => ({
            idOutputInk: item.idOutputInk,
            devolutionQuantity: values.devolitionValue[0].devolutionQuantity
        }))
        console.log("data to axios: " + dataToSend)
        setTempData(dataToSend)
        setIsDrawerOpen(true)
        console.log("Structure of devolitionValue:", values.devolitionValue);
        console.log("Structure of Value:", values);
    }

    const handleConfirm = async () => {
        try {
            const response = await axios.post(`${url}/ink/OutputInkDevolution`, tempData)
            if (response.status === 200) {
                toast.success("Datos enviados correctamente");
                setIsDrawerOpen(false);
                setOpen(false);
                setNumbers([]);
            }
        } catch (e) {
            toast.error("couldn't fetch data, error: " + e)
        }
    }

    useEffect(() => {
        getInfFromSelected()
    }, [])

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='maxh-[400px] overflow-y-auto'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID de requisición</TableHead>
                                    <TableHead>Fecha de requisición</TableHead>
                                    <TableHead>Tipo de Material</TableHead>
                                    <TableHead>Lote interno</TableHead>
                                    <TableHead>Quien Recibió</TableHead>
                                    <TableHead>Kg's Entregados</TableHead>
                                    <TableHead>Cantidad devolución</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    dataFromApi && dataFromApi.map((item, key) => (
                                        <TableRow key={key}>
                                            <TableCell>{item.idOutputInk}</TableCell>
                                            <TableCell>{item.date.substring(0, 10)}</TableCell>
                                            <TableCell>{item.typeMaterial}</TableCell>
                                            <TableCell>{item.internalBatch}</TableCell>
                                            <TableCell>{item.whoReceives}</TableCell>
                                            <TableCell>{item.kilogramsDelivered}</TableCell>
                                            <TableCell>
                                                <FormField
                                                    control={form.control}
                                                    name={`devolitionValue.${key}.devolutionQuantity`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input
                                                                    type='number'
                                                                    placeholder="0"
                                                                    step={0.001}
                                                                    min={0.001}
                                                                    max={item.kilogramsDelivered}
                                                                    {...field}
                                                                    onChange={(e) => { field.onChange(e.target.valueAsNumber) }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </div>
                    <Button type="submit" className="bg-blue-600 ">Listo</Button>
                </form>
            </Form>

            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Devolucion de tinta</DrawerTitle>
                        <DrawerDescription>Revisa una vez mas... NO!! se podrá dehaceer esta acción</DrawerDescription>
                    </DrawerHeader>
                    <div className='w-full px-50'>
                        <Table className='w-full rounded-sm overflow-hidden'>
                            <TableHeader className='bg-[#CECECE] '>
                                <TableRow>
                                    <TableHead>ID de requisición</TableHead>
                                    <TableHead>Fecha de requisición</TableHead>
                                    <TableHead>Tipo de Material</TableHead>
                                    <TableHead>Lote interno</TableHead>
                                    <TableHead>Quien Recibió</TableHead>
                                    <TableHead>Kg's Entregados</TableHead>
                                    <TableHead>Cantidad devolución</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className='bg-[#F7F7F7]'>
                                {
                                    tempData.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className='w-auto'>{item.idOutputInk}</TableCell>
                                            <TableCell className='w-auto'>{dataFromApi[index].date.substring(0,10)}</TableCell>
                                            <TableCell className='w-auto'>{dataFromApi[index].typeMaterial}</TableCell>
                                            <TableCell className='w-auto'>{dataFromApi[index].internalBatch}</TableCell>
                                            <TableCell className='w-auto'>{dataFromApi[index].whoReceives}</TableCell>
                                            <TableCell className='w-auto'>{dataFromApi[index].kilogramsRequired}</TableCell>
                                            <TableCell className='w-auto'>{item.devolutionQuantity}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </div>
                    <DrawerFooter className="px-50">
                        <div className="flex flex-row gap-y-3 justify-around" >
                            <DrawerClose>
                                <Button className='bg-rose-400 text-white w-50' variant="outline">Cancelar</Button>
                            </DrawerClose>
                            <Button className='bg-green-500 w-50' onClick={handleConfirm}>Ok</Button>
                        </div>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

{/*function onSubmit(values: z.infer<typeof formSchema>) {
        const dataToSend = dataFromApi.map((item, index) => ({
            idOutputInk: item.idOutputInk,
            devolutionQuantity: values.devolitionValue
        }))
        console.log("data to axios: " + dataToSend)
        setTempData(dataToSend)
        setIsDrawerOpen(true)
    } */}
