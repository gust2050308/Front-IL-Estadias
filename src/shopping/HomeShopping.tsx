import { Button } from "@/components/ui/button"
import CreateOrderForm from "./NewOreders/CreateOrderForm"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export default function HomeShopping() {
    return (
        <div
            style={{
                marginTop: 100,
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Dialog modal={false}>
                <DialogTrigger asChild>
                    <button
                        className="bg-black font-bold w-30 h-8 rounded-[10px] text-white flex justify-center items-center"
                    >
                        <h1 className="m-1.5">Nueva</h1>
                    </button>
                </DialogTrigger>
                
                <DialogContent contentClassName="max-w-[600]"
                    style={{ width: "60%" }}>
                    <DialogHeader>
                        <DialogTitle>Nueva orden de compra</DialogTitle>
                        <p className="text-sm text-muted-foreground">
                            Llena todos los campos para poder realizar la orden
                        </p>
                    </DialogHeader>

                    <CreateOrderForm />

                    <div className="flex justify-end gap-4 mt-6">
                        <Button variant="ghost">Cancelar</Button>
                        <Button className="bg-blue-600 text-white">Aceptar</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
