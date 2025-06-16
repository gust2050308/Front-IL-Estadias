

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
//import NewEntries from '../../NewEntries';
import Entries from './InputInk/EntriesInk';
import InkInUse from './InkInUse';
import Existence from './Stock/Stock';
import InputsFromOrders from './NewInputsInk/InputsFromOrders'

export default function TintaActions() {
    return (
        <div>
            <Tabs defaultValue="existence" className='w-350'>
                <TabsList>
                    <TabsTrigger value="existence">Existencia</TabsTrigger>
                    <TabsTrigger value="Outputs">Requeridas</TabsTrigger>
                    <TabsTrigger value="add">Agregar</TabsTrigger>
                    <TabsTrigger value="entries">Entradas</TabsTrigger>
                </TabsList>

                <TabsContent value="existence">
                    <Existence />
                </TabsContent>

                <TabsContent value="Outputs">
                    <InkInUse />
                </TabsContent>
                
                <TabsContent value="add">
                    <InputsFromOrders/>
                </TabsContent>
                <TabsContent value="entries">
                    <Entries/>
                </TabsContent>
            </Tabs>
        </div>
    )
}
