import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useState, useEffect } from 'react'
const url = import.meta.env.VITE_API_URL;
import { Input } from "@/components/ui/input"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { MoreHorizontal } from "lucide-react"
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface InventoryItem {
    date: string        //2025-05-09T16:04:32.610Z
    provider: string; // Nombre del proveedor
    invoiceRemission: string; // Número de factura o remisión
    purchaseOrderNumber: string; // Número de orden de compra
    type: string; // Tipo de producto
    code: string; // Código del producto
    units: number; // Unidades
    quantityKilograms: number; // Cantidad en kilogramos
    batchProvider: string; // Lote del proveedor
    internalBatch: string; // Lote interno
    qualityCertificate: string; // Certificado de calidad
}


export default function NewEntries() {
    const [items, setItems] = useState<InventoryItem[]>([{
        date: new Date().toISOString(),
        provider: '',
        invoiceRemission: '',
        purchaseOrderNumber: '',
        type: '',
        code: '',
        units: 0,
        quantityKilograms: 0,
        batchProvider: '',
        internalBatch: '',
        qualityCertificate: ''
    }]);
    const [providerOptions, setProviderOptions] = useState<{ id_Provider: number, provider_Name: string }[]>([]);
    const [purchaseOrderOptions, setPurchaseOrderOptions] = useState<{ id_PurchaseOrder: number, purchaseOrderNumber: string }[]>([]);
    const [duplicateIndex, setDuplicateIndex] = useState<number | null>(null);
    const [duplicateCount, setDuplicateCount] = useState<number>(1);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDuplicateRow = () => {
        if (duplicateIndex === null || duplicateCount < 1) return;

        const originalRow = items[duplicateIndex];
        const newRows = Array(duplicateCount).fill({ ...originalRow });

        setItems(prev => [...prev, ...newRows]);
        setDialogOpen(false);
        setDuplicateIndex(null);
        setDuplicateCount(1);
    };


    const fetchProviderOptions = async () => {
        try {
            const response = await axios.get(`${url}/provider`);
            setProviderOptions(response.data);
        } catch (error) {
            console.error('Error fetching provider options:', error);
        }
    };

    const fetchPurchaseOrderOptions = async () => {
        try {
            const response = await axios.get(`${url}/PurchaseOrder`);
            setPurchaseOrderOptions(response.data);
            console.log(response.data[0].id_PurchaseOrder);
        } catch (error) {
            console.error('Error fetching purchase order options:', error);
        }
    }

    useEffect(() => {
        fetchProviderOptions();
        fetchPurchaseOrderOptions();
    }, []);

    const handleChange = (index: number, field: keyof InventoryItem, value: string) => {
        const newItems = [...items];

        switch (field) {
            case 'date':
                newItems[index].date = value;
                break;
            case 'provider':
                newItems[index].provider = value;
                break;
            case 'invoiceRemission':
                newItems[index].invoiceRemission = value;
                break;
            case 'purchaseOrderNumber':
                newItems[index].purchaseOrderNumber = value;
                break;
            case 'type':
                newItems[index].type = value;
                break;
            case 'code':
                newItems[index].code = value;
                break;
            case 'units':
                newItems[index].units = parseInt(value);
                break;
            case 'quantityKilograms':
                newItems[index].quantityKilograms = parseFloat(value);
                break;
            case 'batchProvider':
                newItems[index].batchProvider = value;
                break;
            case 'internalBatch':
                newItems[index].internalBatch = value;
                break;
            case 'qualityCertificate':
                newItems[index].qualityCertificate = value;
                break;
            default:
                break;
        }

        setItems(newItems);
    };



    const handleAddRow = () => {
        setItems([...items, { date: new Date().toISOString(), provider: '', invoiceRemission: '', purchaseOrderNumber: '', type: '', code: '', units: 0, quantityKilograms: 0, batchProvider: '', internalBatch: '', qualityCertificate: '' }]);
    };

    const handleDeleteRow = (index: number) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    const handleSubmit = async () => {
        try {
            const formattedItems = items.map(item => ({
                dateEntry: item.date,
                provider: {
                    id_Provider: parseInt(item.provider)
                },
                invoiceRemission: item.invoiceRemission,
                purchaseOrder: {
                    id_PurchaseOrder: parseInt(item.purchaseOrderNumber)
                },
                type: item.type,
                code: item.code,
                units: item.units,
                quantityKilograms: item.quantityKilograms,
                batchProvider: item.batchProvider,
                internalBatch: item.internalBatch,
                qualityCertificate: item.qualityCertificate.toUpperCase()
            }));
            console.log('Formatted items:', formattedItems);

            await axios.post(`${url}/inink/several`, formattedItems);
            alert('Ítems registrados correctamente');
        } catch (error) {
            console.error('Error al enviar los ítems:', error);
            alert('Error al registrar ítems');
        }
    };


    return (
        <div>
             <div style={{ marginLeft: -85, marginTop: 50, maxHeight: '600px', overflowY: 'auto' }}>
            <div className="rounded-md border" style={{ maxHeight: '600', overflowY: "auto" }}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Proveedor</TableHead>
                            <TableHead>Factura/Remision</TableHead>
                            <TableHead>Orden de Compra</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Código</TableHead>
                            <TableHead>Unidades</TableHead>
                            <TableHead>Cantidad(Kg)</TableHead>
                            <TableHead>Lote Proveedor</TableHead>
                            <TableHead>Lote Interno</TableHead>
                            <TableHead>Certificado de Calidad</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Select
                                        onValueChange={(value) => handleChange(index, 'provider', value)}
                                        value={item.provider}
                                    >
                                        <SelectTrigger className="w-32">
                                            <SelectValue placeholder="Proveedor">
                                                {
                                                    providerOptions.find(option => String(option.id_Provider) === item.provider)?.provider_Name || "Seleccionar"
                                                }
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {providerOptions.map((option, idx) => (
                                                <SelectItem key={idx} value={String(option.id_Provider)}>
                                                    {option.provider_Name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="text"
                                        placeholder="Text"
                                        className='w-32'
                                        value={item.invoiceRemission}
                                        onChange={(e) => handleChange(index, 'invoiceRemission', e.target.value)} />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        onValueChange={(value) => handleChange(index, 'purchaseOrderNumber', value)}
                                        value={item.purchaseOrderNumber}
                                    >
                                        <SelectTrigger className="w-32">
                                            <SelectValue placeholder="Orden">
                                                {
                                                    purchaseOrderOptions.find(option => String(option.id_PurchaseOrder) === item.purchaseOrderNumber)?.purchaseOrderNumber || "Seleccionar"
                                                }
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {purchaseOrderOptions.map((option, idx) => (
                                                <SelectItem key={idx} value={String(option.id_PurchaseOrder)}>
                                                    {option.purchaseOrderNumber}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="text"
                                        value={item.type}
                                        onChange={(e) => handleChange(index, 'type', e.target.value)}
                                        className="w-32 h-full p-2 bg-transparent outline-none"
                                        placeholder='Text'
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="text"
                                        value={item.code}
                                        onChange={(e) => handleChange(index, 'code', e.target.value)}
                                        className="w-32 h-full p-2 bg-transparent outline-none"
                                        placeholder='Text'
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        value={item.units}
                                        onChange={(e) => handleChange(index, 'units', e.target.value)}
                                        className="w-16 h-full p-2 bg-transparent outline-none"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        value={item.quantityKilograms}
                                        onChange={(e) => handleChange(index, 'quantityKilograms', e.target.value)}
                                        className="w-16 h-full p-2 bg-transparent outline-none"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="text"
                                        value={item.batchProvider}
                                        onChange={(e) => handleChange(index, 'batchProvider', e.target.value)}
                                        className="w-32 h-full p-2 bg-transparent outline-none"
                                        placeholder='Text'
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="text"
                                        value={item.internalBatch}
                                        onChange={(e) => handleChange(index, 'internalBatch', e.target.value)}
                                        className="w-32 h-full p-2 bg-transparent outline-none"
                                        placeholder='Text'
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select onValueChange={(value) => handleChange(index, 'qualityCertificate', value)} value={item.qualityCertificate}>
                                        <SelectTrigger className="w-33">
                                            <SelectValue placeholder="Certificado" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Si">SI</SelectItem>
                                            <SelectItem value="No">NO</SelectItem>
                                            <SelectItem value="Pendiente">PENDIENTE</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => handleDeleteRow(index)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    >
                                        Eliminar
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem onClick={() => {
                                                setDuplicateIndex(index);
                                                setDialogOpen(true);
                                            }}>
                                                Multiplicar fila
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>View customer</DropdownMenuItem>
                                            <DropdownMenuItem>View payment details</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            

            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Multiplicar Fila</AlertDialogTitle>
                        <AlertDialogDescription>
                            Ingresa cuántas veces deseas multiplicar esta fila.
                        </AlertDialogDescription>
                        <Input
                            type="number"
                            min={1}
                            value={duplicateCount}
                            onChange={(e) => setDuplicateCount(parseInt(e.target.value))}
                            className="mt-2"
                        />
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDuplicateRow}>Multiplicar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
 <div className='mt-6'>
                <Button
                    onClick={handleAddRow}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                >
                    Agregar Ítem
                </Button>
                <Button
                    onClick={handleSubmit}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Registrar Ítems
                </Button>
            </div>
        </div>
       
    )
}