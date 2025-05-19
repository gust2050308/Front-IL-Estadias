import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InkActions from './ink/InkActions';
import PaperActions from './paper/PaperActions';

export default function AlmacenHome() {
    return (
        <div>
            <Tabs defaultValue="Ink" className='w300'>
                <TabsList>
                    <TabsTrigger value="Ink">Tinta</TabsTrigger>
                    <TabsTrigger value="Paper">Papel</TabsTrigger>
                </TabsList>
                <TabsContent value="Ink">
                    <InkActions />
                </TabsContent>
                <TabsContent value="Paper">
                    <PaperActions />
                </TabsContent>
            </Tabs>
        </div>
    )
}
