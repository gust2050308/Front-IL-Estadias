import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InkActions from './ink/InkActions';
import PaperActions from './paper/PaperActions';
import AuxiliariesHome from './Auxiliaries/AuxiliariesHome'

export default function AlmacenHome() {
    return (
        <div className='flex items-center justify-center h-full w-full'>
            <div className="w-full h-full">
                <Tabs defaultValue="Ink" className='w-full'>
                    <div className='mx-85 w-1/3 py-0 mb-0'>
                        <TabsList className='w-full bg-zinc-200'>
                            <TabsTrigger className='w-1/2 rounded-sm' value="Ink">Tinta</TabsTrigger>
                            <TabsTrigger className='w-1/2 rounded-sm' value="Paper">Papel</TabsTrigger>
                            <TabsTrigger className='w-1/2 rounded-sm' value="Auxiliaries">Auxiliares</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="Ink">
                        <InkActions />
                    </TabsContent>

                    <TabsContent value="Paper">
                        <PaperActions />
                    </TabsContent>

                    <TabsContent value="Auxiliaries">
                        <AuxiliariesHome />
                    </TabsContent>
                </Tabs>
            </div>
        </div>


    )
}
