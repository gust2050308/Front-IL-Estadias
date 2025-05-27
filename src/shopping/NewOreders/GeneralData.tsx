import { useContext } from "react"
import { GeneralDataContext } from "./GeneralDataContext"
import CreateOrderForm from "./CreateOrderForm"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function GeneralData() {
  const { open, setOpen, tipoOrden} = useContext(GeneralDataContext)

  return (
    <div style={{ marginTop: 100, flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Dialog modal={false} onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          <button className="bg-black font-bold w-30 h-8 rounded-[10px] text-white flex justify-center items-center">
            <h1 className="m-1.5">Nueva</h1>
          </button>
        </DialogTrigger>

        <DialogContent contentClassName="max-w-[600]" style={{ width: "60%" }}>
          <DialogHeader>
            <div className='flex flex-row justify-between'>
              <div className="flex flex-col">
                <DialogTitle>Nueva orden de compra</DialogTitle>
                <p className="text-sm text-muted-foreground mt-2">Llena todos los campos para poder realizar la orden</p>
              </div>

              <div className='pr-10'>
                {tipoOrden === "tinta" ? (
                  /* Ícono de tinta */
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="gray"
                      d="M496.938 14.063c-95.14 3.496-172.297 24.08-231.282 55.812l-29.47 49.28l-4.967-28.093c-10.535 7.402-20.314 15.222-29.314 23.407l-14.687 45.06l-5.032-25.155c-40.65 45.507-60.41 99.864-58.938 155.906c47.273-93.667 132.404-172.727 211.97-221.155l9.717 15.97c-75.312 45.838-156.387 121.202-202.187 208.25h12.156c19.78-12.02 39.16-26.858 58.406-43.44l-30.28 1.595l54.218-23.094c46.875-43.637 93.465-94.974 143.313-138.28l-24.47-5.19l56.5-21.03c26.853-20.485 54.8-37.844 84.344-49.843zM59.53 312.03v30.408H194V312.03zm20.376 49.095L47.25 389.813L24.97 474.78l14.53 15.876h177.22l14.56-15.875L209 389.814l-30.906-28.688H79.906z"
                    />
                  </svg>
                ) : (
                  /* Ícono de papel */
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="gray"
                      d="m174.2 108.9l24.3 157.3l31.8-15.6zM383 142l28.8 40.6l-38.3-30.4l-2.8 15.3l60.5 33.2l-35.8-61.3zm-18.1 5.5l-13.8 7.2l-41.2 143.4l-3.2 105l11.1-16.6zm9.8 38.3l-37.1 188.3l12.8 7.9zm115.8 13.5l-107.4 21.3l-17.2 125l24.4-73l33.3-6.4zM315 234.7l-21.7 4.8l-3.7 9.4l20.1 1.7zm-38.4 23.4c-37.4-.3-69.1 25.4-69.1 25.4l69.8 14.4l18.2 67.7l-1.2-68.4l11.6-32.9c-9.9-4.3-19.8-6.1-29.3-6.2M170.2 290l-38.4 8.8l-106.33 68.6L218.5 340l31-16.9l35.3 63.4l-20.2-78.1zm78.3 58l-41.1 4.5l4 20.6h35.9l33.4 27.1z"
                    />
                  </svg>
                )}</div>
            </div>
          </DialogHeader>
          <CreateOrderForm />
          <div className="flex justify-end gap-4 mt-6">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
