import React from "react"
import ExcelJS from "exceljs"
import { saveAs } from "file-saver"

interface Props {
    data: any[]
}

const StockExcelExport: React.FC<Props> = ({ data }) => {
    const exportToExcel = async () => {
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet("Reporte de Stock")

        const filters = JSON.parse(localStorage.getItem("inkFilters") || "{}")

        worksheet.addRow([])

        worksheet.columns = [
            { header: "ID", key: "idInk", width: 10 },
            { header: "Proveedor", key: "provider_Name", width: 20 },
            { header: "Lote Proveedor", key: "batchProvider", width: 20 },
            { header: "Lote Interno", key: "internalBatch", width: 20 },
            { header: "Tipo", key: "type", width: 15 },
            { header: "Código", key: "code", width: 15 },
            { header: "Kg's Totales", key: "totalQuantityKilograms", width: 20 },
            { header: "Volumen Restante", key: "remainingVolume", width: 20 },
            { header: "Volumen Usado", key: "volumeUsed", width: 20 },
        ]

        data.forEach((item) => {
            worksheet.addRow(item)
        })

        worksheet.getRow(1).font = { bold: true }

        const buffer = await workbook.xlsx.writeBuffer()
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })

        saveAs(blob, `reporte_stock_${new Date().toISOString().slice(0, 10)}.xlsx`)
    }

    return (
        <div
            onClick={exportToExcel}
            className="px-0 py-0 bg-transparent hover:bg-transparent"
        >
            XLSX
        </div>
    )
}

export default StockExcelExport
