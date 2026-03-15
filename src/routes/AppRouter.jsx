import { Routes, Route } from 'react-router-dom';

import { AdminDashboard } from '../views/AdminDashboard';
import LoginScreen from '../views/auth/LoginScreen';
import HomeScreen from '../views/HomeScreen';
import ModalRegistro from '../components/ModalRegistro';
import CartView from '../views/CartView';
import EcommerceView from '../views/EcommerceView';

export const AppRouter = () => {
  return (
    <Routes>

      <Route path="/" element={<HomeScreen />} />

      <Route path="/cart" element={<CartView />} />

      <Route path="/admin" element={<AdminDashboard />} />

      <Route path="/login" element={<LoginScreen />} />

      <Route path="/register" element={<ModalRegistro />} />
      <Route path="/ecommerce" element={<EcommerceView />} />

    </Routes>
  );
};