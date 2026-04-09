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
import MyBookingsView from '../views/MyBookingsView';

import { ProtectedRoute } from './ProtectedRoute';
import Fields from "../views/public/Fields"
import ErrorScreen from '../views/errorScreen';


export const AppRouter = () => {
  return (

<Routes>
    <Route element={<PagesLayout />}>
  <Route path="/" element={<HomeScreen />} />
  <Route path="/about" element={<AboutScreen />} />
  
  <Route path="/login" element={<LoginScreen />} />
  <Route path="/register" element={<ModalRegistro />} />
 

  
  <Route element={<ProtectedRoute adminOnly={false} />}>
    <Route path="/cart" element={<CartView />} />
    <Route path="/my-bookings" element={<MyBookingsView />} />
    <Route path="/ecommerce" element={<EcommerceView />} />
    <Route path="/fields" element={<Fields />} />
    <Route path="/producto/:id" element={<ProductDetailView />} />
  </Route>

  
  <Route element={<ProtectedRoute adminOnly={true} />}>
    <Route path="/admin/" element={<AdminDashboard />} />
    <Route path="/contact" element={<ContactScreen />} />
  </Route>
</Route>
 <Route path='*' element = {<ErrorScreen/>}/>
</Routes>
    <Routes>
      <Route element={<PagesLayout />}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/about" element={<AboutScreen />} />

        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<ModalRegistro />} />



        <Route element={<ProtectedRoute adminOnly={false} />}>
          <Route path="/cart" element={<CartView />} />
          <Route path="/my-bookings" element={<MyBookingsView />} />
          <Route path="/ecommerce" element={<EcommerceView />} />
          <Route path="/fields" element={<Fields />} />
          <Route path="/producto/:id" element={<ProductDetailView />} />
        </Route>


        <Route element={<ProtectedRoute adminOnly={true} />}>
          <Route path="/admin/" element={<AdminDashboard />} />
          <Route path="/contact" element={<ContactScreen />} />
          <Route path="/ecommerce" element={<EcommerceView />} />
          <Route path="/fields" element={<Fields />} />
          <Route path="/producto/:id" element={<ProductDetailView />} />
        </Route>
      </Route>
      <Route path='*' element={<ErrorScreen />} />
    </Routes>

  );
};
