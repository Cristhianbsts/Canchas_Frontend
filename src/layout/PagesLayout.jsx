import { Outlet } from 'react-router-dom';
import Navbar from '../components/layouts/Navbar'; 
import Footer from '../components/layouts/Footer'; 

 const PagesLayout = () => {
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

export default PagesLayout