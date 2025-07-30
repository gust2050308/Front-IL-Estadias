import { useContext, useEffect, useState } from 'react'
import { TableFormContext } from './TableInputContext'
import axios from 'axios'
import ItemsDataForm from './ItemsDataForm'
const url = import.meta.env.VITE_API_URL;


export type InkItem = {
    idItemOrder: number;
    unitsQuantity: number;
    amountKilograms: number;
    codeItem: string;
    totalUnitsQuantityArrived: number;
    isSatisfied: boolean;
};

type OrderData = {
    id_PurchaseOrder: number;
    purchaseOrderNumber: number;
    providerName: string;
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


export default function MainForm({children}: {children: React.ReactNode}) {
    const [orderDataApi, setOrderDataApi] = useState<OrderData | null>(null);
    const { selectedOrder } = useContext(TableFormContext);
    const { setOrderData } = useContext(TableFormContext)!;
    const [itemsFromApi,setitemsFromApi] = useState<InkItem[]>([])
    
    function getItems(){
            try{
                axios.get(`${url}/PurchaseOrder/ItemsByOrderNumber/${selectedOrder}`)
                .then((response) => {
                    if (response.status === 200){
                        setitemsFromApi(response.data)
                    }
                })
            } catch (error){
                console.log('Noup' , error)
            }
        }

    const [itemsOrder, setItemsOrder] = useState([])

    async function getDataOrder() {
        try {
            const response = await axios.get(`${url}/PurchaseOrder/findItemsInsatisfied/${selectedOrder}`)
            setOrderDataApi(response.data)
            setItemsOrder(response.data.inkItems)
            setOrderData(response.data);
        } catch (error) {
            console.error("Error al consultar la orden", error)
        }
    }

    useEffect(() => {
        if (selectedOrder) {
            getDataOrder()
            getItems()
        }
    }, [selectedOrder])

    return (
        <div>
            {orderDataApi && (
                <div>
                    <div className="flex flex-row justify-between gap-6 my-2">
                        <div className='flex flex-col space-y-2'>
                            <p><strong>No. de orden: </strong>{orderDataApi.purchaseOrderNumber}</p>
                            <p><strong>Proveedor: </strong>{orderDataApi.providerName}</p>
                            <p><strong>Fecha de solicitud: </strong>{orderDataApi.requestDate?.substring(0, 10)}</p>
                            <p><strong>Fecha esperada de entraga: </strong>{orderDataApi.deliveryDateExpected?.substring(0, 10)}</p>
                        </div>
                        <div className="flex flex-col space-y-2 min-w-[50%]">
                            <p><strong>Requerido por: </strong>{orderDataApi.requiredBy}</p>
                            <p><strong>Metodo de pago: </strong>{orderDataApi.paymentMethod}</p>
                            <p><strong>Embarque: </strong>{orderDataApi.shipment}</p>
                            <p className=' overflow-auto break-words'><strong>Lugar de entrega: </strong>{orderDataApi.deliveryPlace}</p>
                        </div>
                    </div>
                    <ItemsDataForm inkItems={itemsFromApi}/>
                </div>
            )}
        </div>
    )
}