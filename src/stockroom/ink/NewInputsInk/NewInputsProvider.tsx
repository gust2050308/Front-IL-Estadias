import TableFormProvider from './TableInputContext'
import InputsFromOrders from './InputsFromOrders'
import {GlobalDialog}  from './GlobalDialog'

export default function NewInputsProvider() {
    return (
        <div>
            <TableFormProvider>
                <InputsFromOrders />
                <GlobalDialog>
                    <p></p>
                </GlobalDialog>
            </TableFormProvider>
        </div>
    )
}
