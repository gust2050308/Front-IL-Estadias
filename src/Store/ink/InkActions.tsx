

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NewEntries from './NewInputsInk/NewEntries';
import Entries from './InputInk/EntriesInk';
import InkInUse from './InkInUse';
import Existence from './Stock/Stock';

export default function TintaActions() {
    return (
        <div>
            <Tabs defaultValue="existence" className='w300'>
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
                    <NewEntries/>
                </TabsContent>
                <TabsContent value="entries">
                    <Entries/>
                </TabsContent>
            </Tabs>
        </div>
    )
}
