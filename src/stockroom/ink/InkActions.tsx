import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Entries from './InputInk/EntriesInk';
import Existence from './Stock/Stock';
import InputsFromOrders from './NewInputsInk/InputsFromOrders'
import Outputs from './OutputInk/Outputs'
import StockProvider from './Stock/StockContext'

export default function TintaActions() {
    return (
        <div className="w-full my-0">
            <Tabs defaultValue="existence" className='w-full'>
                <div className='mx-85 w-1/3 '>
                    <TabsList className='w-full bg-zinc-200'>
                        <TabsTrigger className='rounded-sm w-1/4' value="existence">Existencia</TabsTrigger>
                        <TabsTrigger className='rounded-sm w-1/4' value="Outputs">Requeridas</TabsTrigger>
                        <TabsTrigger className='rounded-sm w-1/4' value="add">Agregar</TabsTrigger>
                        <TabsTrigger className='rounded-sm w-1/4' value="entries">Entradas</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value='existence' className='w-full' >
                    <StockProvider>
                        <Existence />
                    </StockProvider>
                </TabsContent>

                <TabsContent value="Outputs">
                    <Outputs />
                </TabsContent>

                <TabsContent value="add">
                    <InputsFromOrders />
                </TabsContent>
                <TabsContent value="entries">
                    <Entries />
                </TabsContent>
            </Tabs>
        </div>
    )
}
