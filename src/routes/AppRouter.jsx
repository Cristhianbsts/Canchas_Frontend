import { Routes, Route } from 'react-router-dom';

import AboutScreen from '../views/AboutScreen';
import ContactScreen from '../views/ContactScreen';

import { AdminDashboard } from '../views/AdminDashboard';
import LoginScreen from '../views/auth/LoginScreen';
import HomeScreen from '../views/public/HomeScreen';
import ModalRegistro from '../components/ModalRegistro';
import CartView from '../views/CartView';
import EcommerceView from '../views/EcommerceView';
import PagesLayout from '../layout/PagesLayout';
import ProductDetailView from "../views/ProductDetailView";

import { ProtectedRoute } from './ProtectedRoute';
import Fields from "../views/public/Fields"


export const AppRouter = () => {
  return (
    <Routes>
      {/* <Route element={<PagesLayout />}> */}

      <Route element={<PagesLayout />}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/contact" element={<ContactScreen />} />




        {/* --- RUTAS PROTEGIDAS (Solo Admin) --- */}
        <Route element={<ProtectedRoute adminOnly={false} />}>
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/cart" element={<CartView />} />
          {/* <Route path="/ecommerce" element={<EcommerceView />} />
          <Route path="/producto/:id" element={<ProductDetailView />} />
          <Route path="/fields" element={<Fields />} /> */}
        </Route>
        

        {/* --- RUTAS PROTEGIDAS (Cualquier usuario logueado) --- */}
        <Route element={<ProtectedRoute adminOnly={false} />}>
          <Route path="/cart" element={<CartView />} />
          <Route path="/ecommerce" element={<EcommerceView />} />
          <Route path="/producto/:id" element={<ProductDetailView />} />
          <Route path="/fields" element={<Fields />} />
        </Route>


         <Route path="/cart" element={<CartView />} />
          <Route path="/ecommerce" element={<EcommerceView />} />
          <Route path="/producto/:id" element={<ProductDetailView />} />
          <Route path="/fields" element={<Fields />} />

        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<ModalRegistro />} />

      </Route>
    </Routes>
  );
};
