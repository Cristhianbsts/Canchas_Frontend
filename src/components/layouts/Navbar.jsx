import React, { useState } from "react";
import ModalRegistro from "../ModalRegistro";
import "../../css/navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarDropdown, setMostrarDropdown] = useState(false);

  // 🔥 simulación usuario logueado
  // después esto viene de context o backend
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
    setMostrarDropdown(false);
  };

  return (
    <>
      <nav className="navbar-custom">
        <div className="container-fluid d-flex justify-content-center">
          <ul className="nav-list d-flex list-unstyled mb-0">

            <li className="nav-item-custom">
              <Link to="/" className="nav-link-custom active">
                <i className="bi bi-house-door"></i>
                <span>Inicio</span>
              </Link>
            </li>

            <li className="nav-item-custom">
              <Link to="/reservas" className="nav-link-custom">
                <i className="bi bi-calendar-event"></i>
                <span>Reservas</span>
              </Link>
            </li>

            <li className="nav-item-custom">
              <Link to="/tienda" className="nav-link-custom">
                <i className="bi bi-bag-check"></i>
                <span>Tienda</span>
              </Link>
            </li>

            {/* ✅ PERFIL DROPDOWN */}
            <li className="nav-item-custom position-relative">

              <div
                className="nav-link-custom cursor-pointer"
                onClick={() => setMostrarDropdown(!mostrarDropdown)}
              >
                <i className="bi bi-person"></i>
                <span>Perfil</span>
                <i className="bi bi-caret-down-fill ms-1"></i>
              </div>

              {mostrarDropdown && (
                <div className="dropdown-menu-custom">

                  {!user ? (
                    <>
                      <button
                        className="dropdown-item-custom"
                        onClick={() => {
                          setMostrarModal(true);
                          setMostrarDropdown(false);
                        }}
                      >
                        Registro
                      </button>

                      <Link
                        to="/login"
                        className="dropdown-item-custom"
                        onClick={() => setMostrarDropdown(false)}
                      >
                        Login
                      </Link>
                    </>
                  ) : (
                    <button
                      className="dropdown-item-custom logout"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  )}

                </div>
              )}

            </li>

          </ul>
        </div>
      </nav>

      <ModalRegistro
        isOpen={mostrarModal}
        onClose={() => setMostrarModal(false)}
      />
    </>
  );
};

export default Navbar;