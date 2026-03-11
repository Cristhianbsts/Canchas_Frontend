import { Routes, Route } from 'react-router-dom';
import { AdminDashboard } from '../views/AdminDashboard'; 
import AboutScreen from '../views/AboutScreen';
import ContactScreen from '../views/ContactScreen';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/contact" element={<ContactScreen/>} />
      <Route path="/about" element={<AboutScreen/>} />
    </Routes>
  );
};