import React, { useState, useContext } from "react";
import ModalRegistro from "../ModalRegistro";
import "../../css/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { logOut } from "../../helpers/logout";

const Navbar = () => {

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarDropdown, setMostrarDropdown] = useState(false);

  const { user, clearUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      clearUserData();
      setMostrarDropdown(false);
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
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
              <Link to="/fields" className="nav-link-custom">
                <i className="bi bi-calendar-event"></i>
                <span>Reservas</span>
              </Link>
            </li>

            <li className="nav-item-custom">
              <Link to="/ecommerce" className="nav-link-custom">
                <i className="bi bi-bag-check"></i>
                <span>Tienda</span>
              </Link>
            </li>

            {user?.role === "admin" && (
              <li className="nav-item-custom">
                <Link to="/admin" className="nav-link-custom">
                  <i class="bi bi-columns-gap"></i>
                  <span>Administracion</span>
                </Link>
              </li>
            )}
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