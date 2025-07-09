import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useContext, useEffect, useState } from 'react'
import { TableFormContext } from './TableInputContext'
import { TableRow, TableCell, Table, TableBody, TableHeader, TableHead } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
const url = import.meta.env.VITE_API_URL
import axios from 'axios'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const itemSchema = z.object({
    unitsArrived: z.number().min(1, "Al menos 1 unidad"),
    invoiceRemission: z.string().min(1, "El campo es requerido"),
    typeMaterial: z.string().min(1, "El campo es requerido"),
    batchProvider: z.string().min(1, "El campo es requerido"),
    internalBatch: z.string().min(1, "El campo es requerido"),
    qualityCertificate: z.string().optional(),
    isSelected: z.boolean().optional(),
    syncGroup: z.number().optional()
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
    const { orderData, setOpen } = useContext(TableFormContext)
    const [itemsOrder, setItemsOrder] = useState<InkItem[]>([])
    const [visibleIndexes, setVisibleIndexes] = useState<number[]>([])
    const [nextGroupId, setNextGroupId] = useState(1)
    const [filteredData, setFilteredData] = useState<InkItem[]>([])
    const [currentGroupId, setCurrentGroupId] = useState<number | null>(null);


    useEffect(() => {
        if (orderData?.inkItems) {
            setItemsOrder(orderData.inkItems)
            const defaultFormValues = orderData.inkItems.map(() => ({
                unitsArrived: 0,
                invoiceRemission: '',
                typeMaterial: '',
                batchProvider: '',
                internalBatch: '',
                qualityCertificate: '',
                isSelected: false,
                syncGroup: 0
            }))
            form.reset({ inkItems: defaultFormValues })
            setVisibleIndexes(orderData.inkItems.map((_: InkItem, idx: number) => idx))
        }
    }, [orderData])

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            inkItems: [{
                unitsArrived: 0,
                invoiceRemission: "",
                typeMaterial: "",
                batchProvider: "",
                internalBatch: "",
                qualityCertificate: '',
                isSelected: false,
                syncGroup: 0
            }]
        }
    })

    const { control, handleSubmit, watch, setValue, getValues } = form

    const { fields, remove } = useFieldArray({
        name: "inkItems",
        control,
    })

    // Verifica si todos los items están seleccionados
    const areAllItemsSelected = () => {
        const values = getValues();
        return values.inkItems.length > 0 &&
            values.inkItems.every(item => item.isSelected);
    };

    // Maneja el cambio del checkbox global
    const handleGlobalCheckboxChange = (checked: boolean) => {
        const currentValues = getValues();

        if (checked) {
            // Crear un nuevo grupo para la selección global
            const newGroupId = nextGroupId;
            setCurrentGroupId(newGroupId);
            setNextGroupId(newGroupId + 1);

            // Actualizar todos los items
            currentValues.inkItems.forEach((_, index) => {
                setValue(`inkItems.${index}.isSelected`, true);
                setValue(`inkItems.${index}.syncGroup`, newGroupId);
            });
        } else {
            // Deseleccionar todos y limpiar grupos
            currentValues.inkItems.forEach((_, index) => {
                setValue(`inkItems.${index}.isSelected`, false);
                setValue(`inkItems.${index}.syncGroup`, 0);
            });
            setCurrentGroupId(null);
        }
    };

    const handleCheckboxChange = (index: number, checked: boolean) => {
        const currentValues = getValues();
        const currentItem = currentValues.inkItems[index];

        if (checked) {
            // Si hay un grupo global activo, unirse a él
            if (currentGroupId !== null) {
                setValue(`inkItems.${index}.syncGroup`, currentGroupId);
            } else {
                // Buscar si hay otros checkboxes seleccionados
                const selectedGroups = currentValues.inkItems
                    .map(item => item.isSelected ? item.syncGroup : 0)
                    .filter(group => group !== 0);

                if (selectedGroups.length > 0) {
                    // Unirse a un grupo existente
                    setValue(`inkItems.${index}.syncGroup`, selectedGroups[0]);
                } else {
                    // Crear un nuevo grupo
                    setValue(`inkItems.${index}.syncGroup`, nextGroupId);
                    setNextGroupId(nextGroupId + 1);
                }
            }
        } else {
            // Cuando se deselecciona: salir del grupo
            setValue(`inkItems.${index}.syncGroup`, 0);
        }

        // Actualizar el estado del checkbox
        setValue(`inkItems.${index}.isSelected`, checked);
    };

    const handleFieldChange = (fieldName: keyof typeof itemSchema.shape, index: number, value: any) => {
        const currentValues = getValues()
        const currentItem = currentValues.inkItems[index]

        // Actualizar el valor en la fila actual
        setValue(`inkItems.${index}.${fieldName}`, value)

        // Si está en un grupo, actualizar todas las filas del mismo grupo
        if (currentItem.syncGroup !== 0) {
            currentValues.inkItems.forEach((item, idx) => {
                if (idx !== index && item.syncGroup === currentItem.syncGroup) {
                    setValue(`inkItems.${idx}.${fieldName}`, value)
                }
            })
        }
    }

    const onSubmit = (data: any) => {
        const filteredData = visibleIndexes.map(i => ({
            ...itemsOrder[i],
            ...data.inkItems[i],
        }));
        setFilteredData(filteredData);
        saveData(filteredData);
    };

    type InkEntry = {
        dateEntry: string;
        invoiceRemission: string;
        typeMaterial: string;
        batchProvider: string;
        internalBatch: string;
        unitsArrived: number;
        qualityCertificate: string;
    };

    type InfoToApi = {
        idItemOrder: number;
        inkEntry: InkEntry;
    };

    async function saveData(filteredData: any[]) {
        try {
            const now = new Date().toISOString();

            const dataToSend: InfoToApi[] = filteredData.map(item => ({
                idItemOrder: item.idItemOrder,
                inkEntry: {
                    dateEntry: now,
                    invoiceRemission: item.invoiceRemission,
                    typeMaterial: item.typeMaterial,
                    batchProvider: item.batchProvider,
                    internalBatch: item.internalBatch,
                    unitsArrived: item.unitsArrived,
                    qualityCertificate: item.qualityCertificate || "PENDIENTE",
                }
            }));

            const response = await axios.post(`${url}/inink`, dataToSend, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                setOpen(false);
                setItemsOrder([]);
                setVisibleIndexes([]);
                form.reset();
                toast.success("Datos enviados correctamente");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || error.message;
                toast.error(`Error al enviar los datos: ${errorMessage}`);
            } else {
                toast.error("Error inesperado al enviar los datos");
            }
        }
    }

    const handleRemove = (index: number) => {
        remove(index)
        setItemsOrder(prev => prev.filter((_, i) => i !== index))
    }

    return (
        <div className='mt-4 max-h-110 overflow-y-auto'>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className='mt-4 max-h-90 overflow-y-auto'>
                        <Table className="min-w-full border-collapse">
                            <TableHeader className='sticky top-0 z-10'>
                                <TableRow>
                                    <TableHead className="sticky top-0 z-10 px-4 py-2 border-b">
                                        <Tooltip >
                                            <TooltipTrigger
                                                className='none'
                                                asChild>
                                                <Checkbox
                                                    checked={areAllItemsSelected()}
                                                    onCheckedChange={(checked) => handleGlobalCheckboxChange(!!checked)}
                                                    className="mr-2 bg-gray-300"
                                                />
                                            </TooltipTrigger>
                                            <TooltipContent className='bg-gray-200 text-black'>
                                                <p>Seleccionar todo</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TableHead>
                                    <TableHead className="sticky top-0 z-10 px-4 py-2 border-b">Unidades solicitadas</TableHead>
                                    <TableHead className="sticky top-0 z-10 px-4 py-2 border-b">Unidades Entrantes</TableHead>
                                    <TableHead className="sticky top-0 z-10 px-4 py-2 border-b">Cantidad(Kg)</TableHead>
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
                                        <TableCell>
                                            <FormField
                                                control={control}
                                                name={`inkItems.${index}.isSelected`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Checkbox
                                                                className='bg-gray-300'
                                                                checked={field.value}
                                                                onCheckedChange={(checked) => {
                                                                    handleCheckboxChange(index, !!checked)
                                                                    field.onChange(checked)
                                                                }}
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        </TableCell>
                                        <TableCell>{itemsOrder[index]?.unitsQuantity}</TableCell>
                                        <TableCell>
                                            <FormField
                                                control={control}
                                                name={`inkItems.${index}.unitsArrived`}
                                                render={({ field }) =>
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                type='number'
                                                                {...field}
                                                                onChange={(e) => {
                                                                    const value = e.target.valueAsNumber
                                                                    handleFieldChange('unitsArrived', index, value)
                                                                }}
                                                            />
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
                                                            <Input
                                                                {...field}
                                                                onChange={(e) => {
                                                                    handleFieldChange('invoiceRemission', index, e.target.value.toLocaleUpperCase())
                                                                }}
                                                            />
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
                                                            <Input
                                                                {...field}
                                                                onChange={(e) => {
                                                                    handleFieldChange('typeMaterial', index, e.target.value.toLocaleUpperCase())
                                                                }}
                                                            />
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
                                                            <Input
                                                                {...field}
                                                                onChange={(e) => {
                                                                    handleFieldChange('batchProvider', index, e.target.value.toLocaleUpperCase())
                                                                }}
                                                            />
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
                                                            <Input
                                                                {...field}
                                                                onChange={(e) => {
                                                                    handleFieldChange('internalBatch', index, e.target.value.toLocaleUpperCase( ))
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <FormField
                                                control={control}
                                                name={`inkItems.${index}.qualityCertificate`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <Select
                                                            onValueChange={(value) => {
                                                                field.onChange(value)
                                                                handleFieldChange('qualityCertificate', index, value)
                                                            }}
                                                            value={field.value || "PENDIENTE"}
                                                            defaultValue="PENDIENTE"
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Seleccionar">
                                                                        {field.value === "SI" ? "Sí" :
                                                                            field.value === "NO" ? "No" :
                                                                                field.value === "PENDIENTE" ? "Pendiente" :
                                                                                    "Seleccionar"}
                                                                    </SelectValue>
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value="SI">Sí</SelectItem>
                                                                    <SelectItem value="NO">No</SelectItem>
                                                                    <SelectItem value="PENDIENTE">Pendiente</SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </TableCell>
                                        <TableCell>

                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Button
                                                        type="button"
                                                        className="bg-rose-800 text-white hover:bg-red-600"
                                                        onClick={() => setVisibleIndexes(prev => prev.filter(i => i !== index))}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                                            <path fill="currentColor" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m11.333-2.167a.825.825 0 0 0-1.166-1.166l-5.5 5.5a.825.825 0 0 0 1.166 1.166Z" />
                                                        </svg>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent className='bg-gray-200 text-black'>
                                                    <p>Quitar </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className='flex flex-row justify-between gap-4 mt-4'>
                        <Button type="submit" className='bg-blue-600'>Listo</Button>
                    </div>
                </form>
            </Form>

            {/* Sección de ítems pendientes */}
            {itemsOrder.length > visibleIndexes.length && (
                <div className="w-full border-amber-95 p-1.5 max-h-35 overflow-y-auto mt-6" style={{ borderRadius: "17px" }}>
                    <div className="pt-2 rounded-md">
                        <h2 className="text-lg font-semibold mb-2">Ítems pendientes</h2>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Unidades</TableHead>
                                    <TableHead>Kilogramos</TableHead>
                                    <TableHead>Código</TableHead>
                                    <TableHead>Reagregar</TableHead>
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
                                                        onClick={() => setVisibleIndexes(prev => [...prev, index])}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="2048" height="2048" viewBox="0 0 2048 2048">
                                                            <path fill="currentColor" d="M1024 128v896h896v1024H0V128zM896 1920v-768H128v768zm0-896V256H128v768zm896 128h-768v768h768zm-128-768h384v128h-384v384h-128V512h-384V384h384V0h128z" />
                                                        </svg>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                    return null
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}
        </div>
    )
}