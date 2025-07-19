import React from "react"
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer"
import logo from '../../../assets/Component-logo.png'

const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontSize: 8,
        fontFamily: "Helvetica",
        color: "#000",
        width: "100%",
        height: "100%",
    },
    table: {
        width: "auto",
        marginVertical: 10,
    },
    row: {
        flexDirection: "row",
    },
    cellHeader: {
        flex: 1,
        fontWeight: "bold",
        padding: 4,
        borderTop: "1px solid black",
        borderBottom: "1px solid black",
        backgroundColor: "#e4e4e4",
    },
    cell: {
        flex: 1,
        padding: 2,
        borderBottom: "1px solid black",
    },
})

interface Props {
    data: any[]
}

const ROWS_PER_PAGE = 30

const paginateData = (data: any[], rowsPerPage: number) => {
    const pages = []
    for (let i = 0; i < data.length; i += rowsPerPage) {
        pages.push(data.slice(i, i + rowsPerPage))
    }
    return pages
}


const storedFilters = localStorage.getItem('filters-stock')

export const StockPDFDocument: React.FC<Props> = ({ data }) => {
    const paginated = paginateData(data, ROWS_PER_PAGE);

    return (
        <Document>
            {paginated.map((pageData, pageIndex) => (
                <Page size="A4" style={styles.page} orientation='landscape'>
                    {pageIndex === 0 && (
                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Reporte de Stock</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4, paddingHorizontal: 10, width: '100%' }}>
                                <View>
                                    <Image src={logo} style={{ width: 30, height: 30 }} />
                                </View>
                                <View style={{ flexDirection: 'column', alignItems: 'center', padding: 4, borderRadius: 5, width: '100%' }}>
                                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 10, width: '100%' }}>
                                        <View style={{ flexDirection: 'column', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Filtros Aplicados</Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', paddingRight: 18, paddingVertical: '3' }}>
                                                <Text>Proveedor: {storedFilters ? JSON.parse(storedFilters).provider || 'Todos' : 'Todos'}</Text>
                                                <Text>Lote Proveedor: {storedFilters ? JSON.parse(storedFilters).providerBatch || 'Todos' : 'Todos'}</Text>
                                                <Text>Lote Interno: {storedFilters ? JSON.parse(storedFilters).internalBatch || 'Todos' : 'Todos'}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', paddingRight: 18 }}>
                                                <Text>Tipo: {storedFilters ? JSON.parse(storedFilters).type || 'Todos' : 'Todos'}</Text>
                                                <Text>Código: {storedFilters ? JSON.parse(storedFilters).code || 'Todos' : 'Todos'}</Text>
                                                <Text>Volumen Restante Min: {storedFilters ? JSON.parse(storedFilters).remainingVolumeMin || '0' : '0'}</Text>
                                                <Text>Volumen Restante Max: {storedFilters ? JSON.parse(storedFilters).remainingVolumeMax || 'Sin Límite' : 'Sin Límite'}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ marginTop: 17 }}>
                                    <Text style={{ marginVertical: 3 }}>Fecha: {new Date().toLocaleDateString()}</Text>
                                    <Text>Hora: {new Date().toLocaleTimeString()}</Text>
                                </View>
                            </View>
                        </View>)}
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ height: 2, width: '99%', backgroundColor: '#062264', borderRadius: 15 }} />
                    </View>
                    <View style={styles.table}>
                        <View style={styles.row}>
                            <Text style={styles.cellHeader}>ID</Text>
                            <Text style={styles.cellHeader}>Proveedor</Text>
                            <Text style={styles.cellHeader}>Lote Proveedor</Text>
                            <Text style={styles.cellHeader}>Lote Int.</Text>
                            <Text style={styles.cellHeader}>Tipo</Text>
                            <Text style={styles.cellHeader}>Código</Text>
                            <Text style={styles.cellHeader}>Kg's Totales</Text>
                            <Text style={styles.cellHeader}>Volumen Restante</Text>
                            <Text style={styles.cellHeader}>Volumen Usado</Text>
                        </View>

                        {pageData.map((row, i) => (
                            <View key={i} style={styles.row}>
                                <Text style={styles.cell}>{row.idInk}</Text>
                                <Text style={styles.cell}>{row.provider_Name}</Text>
                                <Text style={styles.cell}>{row.batchProvider}</Text>
                                <Text style={styles.cell}>{row.internalBatch}</Text>
                                <Text style={styles.cell}>{row.type}</Text>
                                <Text style={styles.cell}>{row.code}</Text>
                                <Text style={styles.cell}>{row.totalQuantityKilograms}</Text>
                                <Text style={styles.cell}>{row.remainingVolume}</Text>
                                <Text style={[styles.cell, { alignContent: 'flex-end' }]}>{row.volumeUsed}</Text>
                            </View>
                        ))}
                    </View>
                </Page>
            ))}
        </Document>
    )
}