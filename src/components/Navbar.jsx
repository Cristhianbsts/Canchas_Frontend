import React from 'react';
import { useState } from 'react';
import ModalRegistro from './ModalRegistro';
import "../css/navbar.css"
import { Link } from 'react-router-dom';

const Navbar = () => {

   const [mostrarModal, setMostrarModal] = useState(false);




  return (
    <>
    <nav className="navbar-custom">
      <div className="container-fluid d-flex justify-content-center">
        <ul className="nav-list d-flex list-unstyled mb-0">
          
          <li className="nav-item-custom">
            <a href="/" className="nav-link-custom active">
              <i className="bi bi-house-door"></i>
              <span>Inicio</span>
            </a>
          </li>

          <li className="nav-item-custom">
            <a href="/reservas" className="nav-link-custom">
              <i className="bi bi-calendar-event"></i>
              <span>Reservas</span>
            </a>
          </li>

          <li className="nav-item-custom">
            <a href="/tienda" className="nav-link-custom">
              <i className="bi bi-bag-check"></i>
              <span>Tienda</span>
            </a>
          </li>

          <li className="nav-item-custom">
            <Link to="/register" className="nav-link-custom"onClick={() => setMostrarModal(true)}>
              <i className="bi bi-person"></i>
              <span>Perfil</span>
            </Link>
          </li>

        </ul>
      </div>
    </nav>
    <ModalRegistro isOpen={mostrarModal} onClose={() => setMostrarModal(false)} />
    </>
  );
};

export default Navbar;