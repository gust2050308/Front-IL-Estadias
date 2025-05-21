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

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const productions = ['Productions 1', 'Productions 2', 'Productions 3', 'Productions 4', 'Productions 5', 'Produuctions 6', 'Productions 7', 'Productions 8', 'Productions 9', 'Productions 10', 'Productions 11', 'Produuctions 12', 'Productions 13', 'Productions 14', 'Productions 15', 'Productions 16', 'Productions 17', 'Produuctions 18',] as const;


const formSchema = z.object({
    select: z.enum(productions, {
        errorMap: () => ({ message: 'Selecciona una producción' }),
    }),
    kilogramsRequired: z.coerce.number().min(1, { message: "Debe ser mayor a 0" }),
    kilogramsDelivered: z.coerce.number().min(1, { message: "Debe ser mayor a 0 " }),
    whoDelivers: z.string().min(1, { message: "Este campo es requerido" }),
    whoReceives: z.string().min(1, { message: "Este campo es requerido" }),

})



function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
}

export default function FormOutputInk() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            select: undefined,
            kilogramsRequired: 0,
            kilogramsDelivered: 0,
            whoDelivers: '',
            whoReceives: '',
        },

    })

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
                        <FormField
                            control={form.control}
                            name="kilogramsRequired"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kilogramos requeridos</FormLabel>
                                    <FormControl>
                                        <Input placeholder='0' {...field} type="number" style={{ width: 200 }} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="kilogramsDelivered"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kilogramos entregados</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="0" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div>
                        <FormField
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
                    </div>
                    <Button type="submit" className="bg-blue-600">Hecho</Button>
                </form>
            </Form>
        </div>
    )
}