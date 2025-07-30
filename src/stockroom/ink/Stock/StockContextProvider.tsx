import Stock from './Stock';
import StockProvider from './StockContext';
import { StockPDFDocument } from './StockPDFDocument';

export default function StockContextProvider() {
  return (
    <div className='h-full w-full'>
        <StockProvider>
            <Stock />
        </StockProvider>
    </div>
  )
}
