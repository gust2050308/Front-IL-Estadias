import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InkActions from './ink/InkActions';
import PaperActions from './paper/PaperActions';

export default function AlmacenHome() {
    return (
        <div className=' flex flex-col items-center justify-center h-full w-full'>
            <div className="w-350">
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
        </div>

        
    )
}
