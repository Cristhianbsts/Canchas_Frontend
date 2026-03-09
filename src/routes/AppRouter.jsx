import { Routes, Route } from 'react-router-dom';
import { AdminDashboard } from '../views/AdminDashboard'; 

export const AppRouter = () => {
  return (
    <Routes>
     
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
};