import Stock from './Stock';
import StockProvider from './StockContext';

export default function StockContextProvider() {
  return (
    <div>
        <StockProvider>
            <Stock />
        </StockProvider>
    </div>
  )
}
