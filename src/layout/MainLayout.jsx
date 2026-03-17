import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
import Footer from '../components/layouts/Footer'; 

export const MainLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      
      <Navbar />
      
      <main className="flex-grow-1">
        <Outlet />
      </main>

      <Footer />
      
    </div>
  );
};