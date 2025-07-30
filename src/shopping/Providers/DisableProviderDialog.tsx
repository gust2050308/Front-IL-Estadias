// Componente de confirmación
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import axios from "axios";
import { Switch } from "@/components/ui/switch";

import { ProviderContext } from "./ProvidersContext"
import { useContext } from "react";

const url = import.meta.env.VITE_API_URL;

export default function DisableProviderDialog({ idProvider, isEnabled }: { idProvider: number; isEnabled: boolean }) {
    const [open, setOpen] = useState(false);

    const { refreshData } = useContext(ProviderContext)

    const handleConfirm = async () => {
        try {
            const res = await axios.post(`${url}/provider/disableProvider/${idProvider}`);
            if (res.status === 200) {
                refreshData()

                toast.success("Acción realizada con éxito", {
                    action: {
                        label: "Deshacer",
                        onClick: async () => {
                            const responseProvider = res.data;
                            const undoRes = await axios.post(`${url}/provider/disableProvider/${responseProvider.idProvider}`);
                            if (undoRes.status === 200) {
                                refreshData()
                                toast.success("Acción revertida con éxito");
                            }
                        },
                    },
                });
            }
        } catch (error) {
            toast.error("Ocurrió un error al deshabilitar el proveedor");
        } finally {
            setOpen(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Switch className='
                bg-gray-300
                data-[state=checked]:bg-blue-600
                rounded-full
                relative
                transition-colors
                duration-300
                border border-gray-300'
                checked={isEnabled} onCheckedChange={() => setOpen(true)} />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción deshabilitará al proveedor. Puedes revertirla con "Deshacer".
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>Confirmar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
