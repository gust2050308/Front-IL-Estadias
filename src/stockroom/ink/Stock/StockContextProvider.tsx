import StockProvider from './StockContext';
import Stock from './Stock';
import { DataTable } from './DataTableInksStock';

export default function StockContextProvider({ children }: { children: React.ReactNode }) {

    return (
        <StockProvider>
            <Stock />
            {children}
            {/* <GlobalDialog /> */}
            {/* <FilterStock /> */}
        </StockProvider>
    );
}