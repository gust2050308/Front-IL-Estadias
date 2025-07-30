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
        width: '100%',
        marginVertical: 10,
    },
    row: {
        flexDirection: "row",
    },
    cellHeader: {
        fontWeight: "bold",
        borderTop: "1px solid black",
        borderBottom: "1px solid black",
        backgroundColor: "#e4e4e4",
    },
    cellId: { width: 30, padding: 2, borderBottom: "1px solid black" },
    cellDate: { width: 70, padding: 2, borderBottom: "1px solid black" },
    cellProduction: { width: 75, padding: 2, borderBottom: "1px solid black" },
    cellIdOrigin: { width: 50, padding: 2, borderBottom: "1px solid black" },
    cellType: { width: 70, padding: 2, borderBottom: "1px solid black" },
    cellBatch: { width: 70, padding: 2, borderBottom: "1px solid black" },
    cellRequired: { width: 50, padding: 2, borderBottom: "1px solid black" },
    cellDelivered: { width: 50, padding: 2, borderBottom: "1px solid black" },
    cellWhoDelivers: { width: 150, padding: 2, borderBottom: "1px solid black" },
    cellWhoReceives: { width: 150, padding: 2, borderBottom: "1px solid black" },
    cellReturned: { width: 67, padding: 2, borderBottom: "1px solid black" },

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


const storedFilters = localStorage.getItem('filterOutputs');
const parsedFilters = storedFilters ? JSON.parse(storedFilters) : {};

export const OutPutPDFDocumnet: React.FC<Props> = ({ data }) => {
    const paginated = paginateData(data, ROWS_PER_PAGE);

    return (
        <Document>
            {paginated.map((pageData, pageIndex) => (
                <Page size="A4" style={styles.page} orientation='landscape'>
                    {pageIndex === 0 && (
                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Reporte Salidas(Tinta)</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4, paddingHorizontal: 10, width: '100%' }}>
                                <View>
                                    <Image src={logo} style={{ width: 30, height: 30 }} />
                                </View>
                                <View style={{ flexDirection: 'column', alignItems: 'center', padding: 4, borderRadius: 5, width: '100%' }}>
                                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 10, width: '100%' }}>
                                        <View style={{ flexDirection: 'column', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Filtros Aplicados</Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', paddingRight: 18, paddingVertical: '3' }}>
                                                <Text>Fecha inicial: {parsedFilters.minRequestedDate.substring(0,10) }</Text>
                                                <Text>Fecha final: {parsedFilters.maxRequestedDate.substring(0,10)}</Text>
                                                <Text>ID de origen: {parsedFilters.idInk || 'Todas'}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', paddingRight: 18 }}>
                                                <Text>Tipo: {parsedFilters.type || 'Todos'}</Text>
                                                <Text>Código: {parsedFilters.code || 'Todos'}</Text>
                                                <Text>Volumen Restante Min: {parsedFilters.remainingVolumeMin || '0'}</Text>
                                                <Text>Volumen Restante Max: {parsedFilters.remainingVolumeMax || 'Sin Límite'}</Text>
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
                            <Text style={[styles.cellId, styles.cellHeader]}>ID</Text>
                            <Text style={[styles.cellDate, styles.cellHeader]}>Fecha de requisición</Text>
                            <Text style={[styles.cellProduction, styles.cellHeader]}>No. Producción</Text>
                            <Text style={[styles.cellIdOrigin, styles.cellHeader]}>ID origen</Text>
                            <Text style={[styles.cellType, styles.cellHeader]}>Tipo de material</Text>
                            <Text style={[styles.cellBatch, styles.cellHeader]}>Lote interno</Text>
                            <Text style={[styles.cellRequired, styles.cellHeader]}>Kg's Requeridos</Text>
                            <Text style={[styles.cellDelivered, styles.cellHeader]}>Kg's Entregados</Text>
                            <Text style={[styles.cellWhoDelivers, styles.cellHeader]}>Entregó</Text>
                            <Text style={[styles.cellWhoReceives, styles.cellHeader]}>Recibió</Text>
                            <Text style={[styles.cellReturned, styles.cellHeader]}>Kg's Devueltos</Text>
                        </View>

                        {pageData.map((row, i) => (
                            <View key={i} style={[styles.row, {width: '100%'} ]}>
                                <Text style={styles.cellId}>{row.idOutputInk}</Text>
                                <Text style={styles.cellDate}>{row.date}</Text>
                                <Text style={styles.cellProduction}>{row.production}</Text>
                                <Text style={styles.cellIdOrigin}>{row.idInk}</Text>
                                <Text style={styles.cellType}>{row.typeMaterial}</Text>
                                <Text style={styles.cellBatch}>{row.internalBatch}</Text>
                                <Text style={styles.cellRequired}>{row.kilogramsRequired}</Text>
                                <Text style={styles.cellDelivered}>{row.kilogramsDelivered}</Text>
                                <Text style={styles.cellWhoDelivers}>{row.whoDelivers}</Text>
                                <Text style={styles.cellWhoReceives}>{row.whoReceives}</Text>
                                <Text style={styles.cellReturned}>{row.returnedKilogramsRequired}</Text>
                            </View>
                        ))}

                    </View>
                </Page>
            ))}
        </Document>
    )
}