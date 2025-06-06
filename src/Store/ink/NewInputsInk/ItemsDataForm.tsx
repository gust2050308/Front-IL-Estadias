import { z } from 'zod'
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
import { toast } from "sonner"
import { useContext, useEffect, useState } from 'react'
import { TableFormContext } from './TableInputContext'
import { TableRow, TableCell, Table, TableBody, TableHeader, TableHead } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select"
/*import axios from 'axios'
const url = import.meta.env.VITE_API_URL;*/

const itemSchema = z.object({
    unitsArrived: z.number().min(1, "Al menos 1 unidad"),
    invoiceRemission: z.string().min(1, "El campo es requerido"),
    typeMaterial: z.string().min(1, "El campo es requerido"),
    batchProvider: z.string().min(1, "El campo es requerido"),
    internalBatch: z.string().min(1, "El campo es requerido"),
    qualityCertificate: z.string().optional(),
})

const formSchema = z.object({
    inkItems: z.array(itemSchema)
})

type InkItem = {
    idItemOrder: number
    unitsQuantity: number
    amountKilograms: number
    codeItem: string
}


export default function ItemsDataForm() {
    const { open, setOpen, selectedRow, orderData } = useContext(TableFormContext)
    const [itemsOrder, setItemsOrder] = useState<InkItem[]>([])
    const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);

    useEffect(() => {
        if (orderData?.inkItems) {
            setItemsOrder(orderData.inkItems);

            const defaultFormValues = itemsOrder.map(() => ({
                unitsArrived: 0,
                invoiceRemission: '',
                typeMaterial: '',
                batchProvider: '',
                internalBatch: '',
                qualityCertificate: '',
            }));

            form.reset({ inkItems: defaultFormValues });

            setVisibleIndexes(orderData.inkItems.map((_: InkItem, idx: number) => idx));
        }
    }, [orderData]);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            inkItems: [
                {
                    unitsArrived: 0,
                    invoiceRemission: "",
                    typeMaterial: "",
                    batchProvider: "",
                    internalBatch: "",
                    qualityCertificate: ''
                }
            ]
        }
    })

    const { control, handleSubmit, register } = form

    const { fields, append, remove } = useFieldArray({
        name: "inkItems",
        control,
    })

    const onSubmit = (data: any) => {
        const filteredData = visibleIndexes.map(i => ({
            ...itemsOrder[i],
            ...data.inkItems[i], // los datos ingresados por el usuario
        }));
        console.log(filteredData); // solo los que el usuario mantuvo visibles
        toast.success("Formulario enviado con éxito");
    };


    const handleRemove = (index: number) => {
        remove(index);
        setItemsOrder(prev => prev.filter((_, i) => i !== index));
    }


    return (
        <div className='mt-4 max-h-110 overflow-y-auto'>
            <div>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className='mt-4 max-h-90 overflow-y-auto'>
                            <Table className="min-w-full border-collapse">
                                <TableHeader className='sticky top-0 z-10'>
                                    <TableRow>
                                        <TableHead className="sticky top-0 z-10 px-4 py-2 border-b">Unidades solicitadas</TableHead>
                                        <TableHead className="sticky top-0 z-10 px-4 py-2 border-b">Unidades Entrantes</TableHead>
                                        <TableHead className="sticky top-0 z-10 px-4 py-2 border-b">Cantidadad(Kg)</TableHead>
                                        <TableHead className="sticky top-0 z-10 px-4 py-2 border-b">Código</TableHead>
                                        <TableHead className="sticky top-0 z-10 px-4 py-2 border-b">Factura/Remisión</TableHead>
                                        <TableHead className="sticky top-0 z-10 px-4 py-2 border-b">Tipo de Material</TableHead>
                                        <TableHead className="sticky top-0 z-10 px-4 py-2 border-b">Lote Proveedor</TableHead>
                                        <TableHead className="sticky top-0 z-10 px-4 py-2 border-b">Lote Interno</TableHead>
                                        <TableHead className="sticky top-0 z-10 px-4 py-2 border-b">Certificado de Calidad</TableHead>
                                        <TableHead className="sticky top-0 z-10 px-4 py-2 border-b">No ha llegado</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {visibleIndexes.map((index) => (
                                        <TableRow key={index}>
                                            <TableCell>{itemsOrder[index]?.unitsQuantity}</TableCell>
                                            <TableCell>
                                                <FormField
                                                    control={control}
                                                    name={`inkItems.${index}.unitsArrived`}
                                                    render={({ field }) =>
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input type='number' {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell>{itemsOrder[index]?.amountKilograms}</TableCell>
                                            <TableCell>{itemsOrder[index]?.codeItem}</TableCell>
                                            <TableCell>
                                                <FormField
                                                    control={control}
                                                    name={`inkItems.${index}.invoiceRemission`}
                                                    render={({ field }) =>
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <FormField
                                                    control={control}
                                                    name={`inkItems.${index}.typeMaterial`}
                                                    render={({ field }) =>
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <FormField
                                                    control={control}
                                                    name={`inkItems.${index}.batchProvider`}
                                                    render={({ field }) =>
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <FormField
                                                    control={control}
                                                    name={`inkItems.${index}.internalBatch`}
                                                    render={({ field }) =>
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell >
                                                <FormField control={form.control}
                                                    name={`inkItems.${index}.qualityCertificate`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <Select
                                                                onValueChange={field.onChange}
                                                                value={field.value || "PENDIENTE"}
                                                                defaultValue="PENDIENTE"
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue
                                                                            className='w-full'
                                                                            placeholder="Seleccionar">
                                                                            {field.value === "SI" ? "Sí" :
                                                                                field.value === "NO" ? "No" :
                                                                                    field.value === "PENDIENTE" ? "Pendiente" :
                                                                                        "Seleccionar"}
                                                                        </SelectValue>
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent className="max-h-60 overflow-y-auto">
                                                                    <SelectGroup>
                                                                        <SelectItem key="si" value="SI">
                                                                            Sí
                                                                        </SelectItem>
                                                                        <SelectItem key="no" value="NO">
                                                                            No
                                                                        </SelectItem>
                                                                        <SelectItem key="pendiente" value="PENDIENTE">
                                                                            Pendiente
                                                                        </SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    type="button"
                                                    className="bg-rose-800 text-white hover:bg-red-600"
                                                    onClick={() => {
                                                        setVisibleIndexes(prev => prev.filter(i => i !== index));
                                                    }}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m11.333-2.167a.825.825 0 0 0-1.166-1.166l-5.5 5.5a.825.825 0 0 0 1.166 1.166Z" /></svg>
                                                </Button>
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div>
                            <div className='flex flex-row justify-between gap-4 mt-4'>
                                <Button type="submit" className='bg-blue-600'>Listo</Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
            <div className="w-full bg-zinc-200 h-0.5 my-6" style={{ borderRadius: "17px" }}>
            </div>
            <div className="w-full border-amber-95 p-1.5 max-h-35 overflow-y-auto" style={{ borderRadius: "17px" }}>
                {itemsOrder.length > visibleIndexes.length && (
                    <div className="  pt-2 rounded-md inset-shadow-indigo-500">
                        <h2 className="text-lg font-semibold mb-2">Ítems pendientes</h2>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Unidades</TableHead>
                                    <TableHead>Kilogramos</TableHead>
                                    <TableHead>Código</TableHead>
                                    <div className='flex justify-center items-center'>
                                        <TableHead>Reagregar</TableHead>
                                    </div>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {itemsOrder.map((item, index) => {
                                    if (!visibleIndexes.includes(index)) {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{item.unitsQuantity}</TableCell>
                                                <TableCell>{item.amountKilograms}</TableCell>
                                                <TableCell>{item.codeItem}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        className="bg-green-700 text-white hover:bg-green-600"
                                                        variant="outline"
                                                        onClick={() =>
                                                            setVisibleIndexes((prev) => [...prev, index])
                                                        }
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="2048" height="2048" viewBox="0 0 2048 2048"><path fill="currentColor" d="M1024 128v896h896v1024H0V128zM896 1920v-768H128v768zm0-896V256H128v768zm896 128h-768v768h768zm-128-768h384v128h-384v384h-128V512h-384V384h384V0h128z" /></svg>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    }
                                    return null;
                                })}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </div>
    )
}