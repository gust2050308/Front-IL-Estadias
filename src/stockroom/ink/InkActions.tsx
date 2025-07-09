import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Entries from './InputInk/EntriesInk';
import Existence from './Stock/Stock';
import InputsFromOrders from './NewInputsInk/InputsFromOrders'
import Outputs from './OutputInk/Outputs'
import StockProvider from './Stock/StockContext'
import { useState } from "react";
import OutPutProvider from "./OutputInk/OutputContext";

export default function TintaActions() {

    const [activeTab, setActiveTab] = useState("existence")

    return (
        <div className="w-full my-0">
            <Tabs defaultValue="existence" className="w-full" onValueChange={(val) => setActiveTab(val)}>
                <TabsList className="mx-85 w-1/3 bg-gray-200 rounded-sm">
                    <TabsTrigger className="rounded-sm" value="existence">Existencia</TabsTrigger>
                    <TabsTrigger className="rounded-sm" value="Outputs">Requeridas</TabsTrigger>
                    <TabsTrigger className="rounded-sm" value="add">Agregar</TabsTrigger>
                    <TabsTrigger className="rounded-sm" value="entries">Entradas</TabsTrigger>
                </TabsList>

                {/* En vez de usar TabsContent, usas esto: */}
                <div className="relative mt-4">
                    <div className={activeTab === "existence" ? "block" : "hidden"}>
                    </div>
                    <div className={activeTab === "Outputs" ? "block" : "hidden"}>
                        <OutPutProvider>
                            <Outputs />
                        </OutPutProvider>
                    </div>
                    <div className={activeTab === "add" ? "block" : "hidden"}>
                        <InputsFromOrders />
                    </div>
                    <div className={activeTab === "entries" ? "block" : "hidden"}>
                        <Entries />
                    </div>
                </div>
            </Tabs>

        </div>
    )
}
