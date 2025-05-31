import { useContext, useEffect, useState } from 'react'
import { TableFormContext } from './TableInputContext'
import axios from 'axios'

const url = import.meta.env.VITE_API_URL;


type InkItem = {
    idItemOrder: number;
    unitsQuantity: number;
    amountKilograms: number;
    codeItem: string;
    isSatisfied: boolean;
    ink: any | null; // puedes reemplazar `any` si tienes un modelo para `ink`
};

type Provider = {
    id_Provider: number;
    provider_Email: string;
    provider_Person: string;
    provider_Phone: string;
    provider_Name: string;
    provider_Address: string;
};

type OrderData = {
    id_PurchaseOrder: number;
    purchaseOrderNumber: number;
    provider: Provider;
    requestDate: string;
    deliveryDateExpected: string;
    dateDelivered: string | null;
    requiredBy: string;
    paymentMethod: string;
    shipment: string;
    deliveryPlace: string;
    isComplete: boolean;
    typeMaterial: boolean;
    inkItems: InkItem[];
    paperItems: any[]; // puedes reemplazar si sabes la estructura de los items de papel
};


export default function MainForm() {
const [orderData, setOrderData] = useState<OrderData | null>(null);
    const { open, setOpen, selectedRow } = useContext(TableFormContext)
    const [itemsOrder, setItemsOrder] = useState([])

    async function getDataOrder() {
        try {
            const response = await axios.get(`${url}/PurchaseOrder/findByNumber/${selectedRow.orderNumber}`)
            setOrderData(response.data)
            setItemsOrder(response.data.inkItems)
        } catch (error) {
            console.error("Error al consultar la orden", error)
        }
    }

    useEffect(() => {
    if (selectedRow?.orderNumber) {
        getDataOrder()
    }
}, [selectedRow?.orderNumber])

    return (
        <div>
            {orderData && (
                <div className="flex flex-row justify-between gap-6">
                    <div className='flex flex-col space-y-2'>
                        <p><strong>No. de orden: </strong>{orderData.purchaseOrderNumber}</p>
                        <p><strong>Proveedor: </strong>{orderData.provider.provider_Name}</p>
                        <p><strong>Fecha de solicitud: </strong>{orderData.requestDate?.substring(0, 10)}</p>
                        <p><strong>Fecha esperada de entraga: </strong>{orderData.deliveryDateExpected?.substring(0, 10)}</p>
                    </div>
                    <div className="flex flex-col space-y-2 max-w-[50%]">
                        <p><strong>Requerido por: </strong>{orderData.requiredBy}</p>
                        <p><strong>Metodo de pago: </strong>{orderData.paymentMethod}</p>
                        <p><strong>Embarque: </strong>{orderData.shipment}</p>
                        <p className=' overflow-auto break-words'><strong>Lugar de entrega: </strong>{orderData.deliveryPlace}</p>
                    </div>
                </div>
            )}
        </div>
    )
}