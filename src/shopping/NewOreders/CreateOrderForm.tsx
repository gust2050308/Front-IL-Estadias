
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import PapersItemsData from "./PapersItemsData"
import InkItemsData from "./InkItemsData"


export default function FormOutputInk() {



    return (
        <div className="w-full flex flex-row items-start p-2">

            <div className="w-full flex flex-col items-start">
                <Tabs defaultValue="ink" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="ink">Tinta</TabsTrigger>
                        <TabsTrigger value="paper">Papel</TabsTrigger>
                    </TabsList>
                    <TabsContent value="ink">
                        <div className="mt-4">
                            <InkItemsData />
                        </div>
                    </TabsContent>
                    <TabsContent value="paper">
                        <div className="mt-4">
                            <PapersItemsData />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>



        </div>
    )
}