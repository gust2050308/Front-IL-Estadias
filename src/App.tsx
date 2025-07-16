import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import HomeShopping from './shopping/HomeShopping';
import AlmacenHome from './stockroom/AlmacenHome';
import StockContextProvider from './stockroom/ink/Stock/StockContextProvider';
import Outputs from './stockroom/ink/OutputInk/Outputs';
import EntriesInk from './stockroom/ink/InputInk/EntriesInk';
import InputsFromOrders from './stockroom/ink/NewInputsInk/InputsFromOrders';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomeShopping />} />
        <Route path="/HomeShopping" element={<HomeShopping />} />
        <Route path="/AlmacenHome" element={<AlmacenHome />} />
        <Route path="/StockContextProvider" element={<StockContextProvider />} />
        <Route path="/Outputs" element={<Outputs />} />
        <Route path="/EntriesInk" element={<EntriesInk />} />
        <Route path="/InputsFromOrders" element={<InputsFromOrders />} />
      </Route>
    </Routes>
  );
}