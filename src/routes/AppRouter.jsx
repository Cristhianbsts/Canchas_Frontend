import { Routes, Route } from 'react-router-dom';
import { AdminDashboard } from '../views/AdminDashboard'; 
import LoginScreen from '../views/auth/LoginScreen';

export const AppRouter = () => {
  return (
    <Routes>
     
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path='/login' element ={<LoginScreen/>}/>
    </Routes>
  );
};