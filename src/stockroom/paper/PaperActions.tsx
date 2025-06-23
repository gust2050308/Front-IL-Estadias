import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NewEntries from './InputPaper/NewEntries';
import Entries from './InputPaper/EntriesPaper';
import PaperInUse from './InputPaper/PaperInUse';
import Existence from './InputPaper/Existence';

export default function PaperActions() {
    return (
        <div className="bg-green-400 w-full h-full">
            <Tabs defaultValue="Exist" className='w300'>
                <TabsList>
                    <TabsTrigger value="Exist">Existencia</TabsTrigger>
                    <TabsTrigger value="inUse">En uso</TabsTrigger>
                    <TabsTrigger value="newEntries">Agregar</TabsTrigger>
                    <TabsTrigger value="entries">Entradas</TabsTrigger>
                </TabsList>

                <TabsContent value="Exist">
                    <Existence />
                </TabsContent>

                <TabsContent value="inUse">
                    <PaperInUse/>
                </TabsContent>

                <TabsContent value="newEntries">
                    <NewEntries />
                </TabsContent>

                 <TabsContent value="entries">
                    <Entries />
                </TabsContent>
            </Tabs>
        </div>
    )
}
