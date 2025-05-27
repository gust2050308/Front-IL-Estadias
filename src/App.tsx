  import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import HomeShopping from './shopping/HomeShopping';
import AlmacenHome from './Store/AlmacenHome';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomeShopping />} />
        <Route path="/HomeShopping" element={<HomeShopping />} />
        <Route path="/AlmacenHome" element={<AlmacenHome />} />
      </Route>
    </Routes>
  );
}