import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import HomeShopping from './shopping/HomeShopping';
import StockContextProvider from './stockroom/ink/Stock/StockContextProvider';
import EntriesInk from './stockroom/ink/InputInk/EntriesInk';
import NewInputsProvider from './stockroom/ink/NewInputsInk/NewInputsProvider';
import OutputContextProvider from './stockroom/ink/OutputInk/OutputContextProvider';
import ContextProvider from './shopping/Providers/ContextProvider'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomeShopping />} />
        <Route path="/HomeShopping" element={<HomeShopping />} />
        <Route path="/StockContextProvider" element={<StockContextProvider />} />
        <Route path="/OutputContextProvider" element={<OutputContextProvider />} />
        <Route path="/EntriesInk" element={<EntriesInk />} />
        <Route path="/NewInputsProvider" element={<NewInputsProvider />} />
        <Route path='/ContextProvider' element={<ContextProvider/>} />
      </Route>
    </Routes>
  );
}