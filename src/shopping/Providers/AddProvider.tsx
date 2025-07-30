import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
const url = import.meta.env.VITE_API_URL
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import { REGEXP_ONLY_DIGITS } from "input-otp";
import axios from "axios";
import { toast } from "sonner";

export const formSchema = z.object({
    providerName: z.string().min(2, { message: "Al menos dos caracteres" }),
    providerEmail: z.string().email({ message: "El correo no es válido" }),
    providerPhone: z
        .string()
        .regex(/^[0-9]{10}$/, { message: "El número de teléfono debe tener 10 dígitos" }),
    providerAddress: z.string().min(5, { message: "La dirección es muy corta" }),
    providerPerson: z.string().min(3, { message: "Al menos 3 caracteres" }),
    providerType: z.enum(["TINTA", "PAPEL", "AUXILIARES"], {
        errorMap: () => ({ message: "Tipo de proveedor no válido" }),
    }),
});

import { useContext, useEffect, useState } from "react";
import { ProviderContext } from './ProvidersContext';
import type { Providers } from './Columns'
type FormValues = z.infer<typeof formSchema>;

export default function AddProvider() {
    const [provider, setProvider] = useState<Providers>()

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            providerName: "",
            providerEmail: "",
            providerPhone: "",
            providerAddress: "",
            providerPerson: "",
            providerType: "TINTA",
        },
    });

    async function deleteProvider(idProvider: number) {
        try {
            axios.delete(`${url}/provider/${idProvider}`)
            refreshData()
        } catch (error) {
            toast.error('No fue posible borrar el proveedor')
        }
    }

    async function onSubmit(values: FormValues) {
        console.log(numbers, values )

        if (numbers !== 0 || undefined) {
            try {
                axios.put(`${url}/provider/${numbers}`, values)
                    .then((response) => {
                        if (response.status === 200) {
                            toast('Proveedor guardado correctamente')
                            setOpen(false)
                            refreshData()
                        }
                    })
            } catch (error) {
                console.error('Error : ' + error)
            }
        } else {
            try {
                axios.post(`${url}/provider`, values)
                    .then((response) => {
                        if (response.status === 201) {
                            toast('Proveedor guardado correctamente', {
                                action: {
                                    label: 'Deshcer',
                                    onClick: () => {
                                        const provider = response.data
                                        deleteProvider(provider.idProvider)
                                    }
                                }
                            })
                            setOpen(false)
                            refreshData()
                        }
                    })
            } catch (error) {
                console.error('Error : ' + error)
            }
        }
    }

    const { refreshData, setOpen, numbers } = useContext(ProviderContext)

    function getProvider() {
        try {
            const providerNumber: number | undefined = numbers
            const response = axios.get(`${url}/provider/${providerNumber}`)
                .then((res) => {
                    setProvider(res.data)
                    const p = res.data
                    if (["TINTA", "PAPEL", "AUXILIARES"].includes(p.providerType)) {
                        form.reset({
                            providerName: p.providerName ?? "",
                            providerEmail: p.providerEmail ?? "",
                            providerPhone: p.providerPhone ?? "",
                            providerAddress: p.providerAddress ?? "",
                            providerPerson: p.providerPerson ?? "",
                            providerType: p.providerType
                        })
                    }
                })
        } catch (error) {
            setOpen(false)
            toast.error('No es posible por el momento')
        }
    }

    useEffect(() => {
        if (numbers) {
            getProvider()
        }
    },[numbers])

    return (
        <div className="w-full mx-auto p-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="providerName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >Nombre del proveedor</FormLabel>
                                <FormControl>
                                    <Input className='bg-gray-100' placeholder="Ej. Proveedor XYZ" {...field} onChange={(e) => { field.onChange(e.target.value.toUpperCase()) }} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="providerEmail"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Correo electrónico</FormLabel>
                                <FormControl>
                                    <Input className='bg-gray-100' placeholder="correo@proveedor.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className='flex flex-row justify-between'>
                        <FormField
                            control={form.control}
                            name="providerPhone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Teléfono</FormLabel>
                                    <FormControl>
                                        <InputOTP
                                            maxLength={10}
                                            pattern={REGEXP_ONLY_DIGITS}
                                            value={!field.value ? "" : String(field.value)}
                                            onChange={(value) => {
                                                if (/^\d*$/.test(value)) {
                                                    field.onChange(value);
                                                }
                                            }}
                                        >
                                            <InputOTPGroup>
                                                {[...Array(10)].map((_, index) => (
                                                    <InputOTPSlot className='bg-gray-100' key={index} index={index} />
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
                            name="providerType"
                            render={({ field }) => (
                                <FormItem className='w-2/5'>
                                    <FormLabel>Tipo de proveedor</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger className='bg-gray-100 w-full'>
                                                <SelectValue placeholder="Selecciona el tipo" className='bg-gray-100 w-full'  />
                                            </SelectTrigger>
                                            <SelectContent className='w-full' >
                                                <SelectGroup >
                                                    <SelectItem className='bg-gray-100' value="TINTA">TINTA</SelectItem>
                                                    <SelectItem className='bg-gray-100' value="PAPEL">PAPEL</SelectItem>
                                                    <SelectItem className='bg-gray-100' value="AUXILIARES">AUXILIARES</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="providerAddress"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Dirección</FormLabel>
                                <FormControl>
                                    <Input className='bg-gray-100' placeholder="Dirección del proveedor" {...field} onChange={(e) => { field.onChange(e.target.value.toUpperCase()) }} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="providerPerson"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Persona de contacto</FormLabel>
                                <FormControl>
                                    <Input className='bg-gray-100' placeholder="Ej. Juan Pérez" {...field} onChange={(e) => { field.onChange(e.target.value.toUpperCase()) }} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='w-full px-20 pt-2'>
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-l from-blue-500 to-blue-900 bg-[length:200%] bg-left hover:bg-right transition-all duration-500 text-white"
                        >
                            Agregar
                        </Button>

                    </div>
                </form>
            </Form>
        </div>
    );
}
