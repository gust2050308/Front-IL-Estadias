import React from "react"
import ExcelJS from "exceljs"
import { saveAs } from "file-saver"

interface Props {
    data: any[]
}

const OutputExcelExport: React.FC<Props> = ({ data }) => {
    const exportToExcel = async () => {
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet("Reporte de Stock")

        worksheet.addRow([])

        worksheet.columns = [
            { header: "ID", key: "idOutputInk", width: 10 },
            { header: "Fecha de requisición", key: "date", width: 20 },
            { header: "No. de Produccion", key: "production", width: 20 },
            { header: "ID de origen", key: "idInk", width: 10 },
            { header: "Tipo de material", key: "typeMaterial", width: 20 },
            { header: "Lote interno", key: "internalBatch", width: 15 },
            { header: "Kg's Requeridos", key: "kilogramsRequired", width: 20 },
            { header: "Kg's Entregados", key: "kilogramsDelivered", width: 20 },
            { header: "Quien entrega", key: "whoDelivers", width: 20 },
            { header: "Quien recibe", key: "whoReceives", width: 20 },
            { header: "Kg's Devueltos", key: "returnedKilogramsRequired", width: 20 },
        ]

        data.forEach((item) => {
            worksheet.addRow(item)
        })

        worksheet.getRow(1).font = { bold: true }

        const buffer = await workbook.xlsx.writeBuffer()
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })

        saveAs(blob, `reporte_salidas_${new Date().toISOString().slice(0, 10)}.xlsx`)
    }

    return (
        <div
            onClick={exportToExcel}
            className="px-0 py-0 bg-transparent hover:bg-transparent w-full h-full"
        >
            XLSX
        </div>
    )
}

export default OutputExcelExport
