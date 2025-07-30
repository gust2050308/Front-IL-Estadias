import { DataTable } from "./DataTableInputs"
import { columns } from './Columns'
import axios from "axios"
import { useEffect, useState } from "react"
const url = import.meta.env.VITE_API_URL
import type { PurchaseOrder } from './Columns'

import TableFormContext from './TableInputContext'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"


export default function InputsFromOrders() {

  const [data, setData] = useState<PurchaseOrder[]>([])

  async function getPurchaseOreders() {
    await axios.get(`${url}/PurchaseOrder/findIncompleteOrdersInk`)
      .then((response) => {
        const datos = response.data.map((order: any) => ({
          purchaseOrderNumber: order.purchaseOrderNumber,
          providerName: order.providerName,
          requestDate: order.requestDate.substring(0, 10),
          deliveryDateExpected: order.deliveryDateExpected.substring(0, 10),
          requiredBy: order.requiredBy,
          paymentMethod: order.paymentMethod,
          shipment: order.shipment,
          deliveryPlace: order.deliveryPlace,
          totalItems: order.totalItems,
          itemsArrived: order.itemsArrived
        }));
        setData(datos)
      }, (error) => {
        console.error("Error fetching data:", error);
      })
  }

  useEffect(() => {
    getPurchaseOreders();
  }, [])

  return (
    <div>
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel defaultSize={18}>

        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={82}>
          <DataTable columns={columns} data={data} />
        </ResizablePanel>
      </ResizablePanelGroup>

    </div>
  )
}
