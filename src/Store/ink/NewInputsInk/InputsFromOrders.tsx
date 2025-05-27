import { DataTable } from "./DataTableInputs"
import {columns} from './Columns'
import axios from "axios"
import { useEffect,useState } from "react"
const url = import.meta.env.VITE_API_URL
import type {PurchaseOrder} from './Columns'


export default function InputsFromOrders() {
  const [data, setData] = useState<PurchaseOrder[]>([])

  async function getPurchaseOreders() {
    await axios.get(`${url}/PurchaseOrder`)
    .then((response) =>{
      const datos = response.data.map((order: any) => ({
        orderNumber: order.purchaseOrderNumber,
        provider: order.provider.provider_Name,
        requestDate: order.requestDate.substring(0, 10),
        deliveryDateExpected : order.deliveryDateExpected.substring(0, 10),
        requiredBy: order.requiredBy,
        paymentMethod: order.paymentMethod,
        shipment: order.shipment,
        deliveryPlace: order.deliveryPlace,
        itemsNumber: order.inkItems.length
      }));
      setData(datos)
    },(error) => {
      console.error("Error fetching data:", error);
    } )
  }

  useEffect(() => {
    getPurchaseOreders();
  },[])

  return (
    <div>
        <DataTable columns={columns} data={data}/>
    </div>
  )
}
