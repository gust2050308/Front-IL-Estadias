import Stock from './Stock';
import StockProvider from './StockContext';
import { StockPDFDocument } from './StockPDFDocument';

export default function StockContextProvider() {
  return (
    <div>
        <StockProvider>
            <Stock />
        </StockProvider>
    </div>
  )
}
