import React, { useState, useContext } from "react";
import ModalRegistro from "../ModalRegistro";
import "../../css/navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useCartContext } from "../../context/CartContext";
import { logOut } from "../../helpers/logout";

const Navbar = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarDropdown, setMostrarDropdown] = useState(false);

  const { user, clearUserData } = useContext(UserContext);
  const { items, resetCartState } = useCartContext();
  const navigate = useNavigate();

  const totalCartItems = items.reduce(
    (total, item) => total + (Number(item?.quantity) || 0),
    0
  );

  const buildNavClass = ({ isActive }) =>
    `nav-link-custom ${isActive ? "active" : ""}`;

  const handleLogout = async () => {
    try {
      await logOut();
      clearUserData();
      resetCartState();
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
              <NavLink to="/" end className={buildNavClass}>
                <i className="bi bi-house-door"></i>
                <span>Inicio</span>
              </NavLink>
            </li>

            <li className="nav-item-custom">
              <NavLink to="/fields" className={buildNavClass}>
                <i className="bi bi-calendar-event"></i>
                <span>Reservas</span>
              </NavLink>
            </li>

            <li className="nav-item-custom">
              <NavLink to="/ecommerce" className={buildNavClass}>
                <i className="bi bi-bag-check"></i>
                <span>Tienda</span>
              </NavLink>
            </li>

            {user && user.role === "admin" && (
              <li className="nav-item-custom">
                <NavLink to="/admin" className={buildNavClass}>
                  <i className="bi bi-columns-gap"></i>
                  <span>Administración</span>
                </NavLink>
              </li>
            )}

            {user && user.role !== "admin" && (
              <li className="nav-item-custom">
                <NavLink to="/my-bookings" className={buildNavClass}>
                  <i className="bi bi-calendar2-check"></i>
                  <span>Mis reservas</span>
                </NavLink>
              </li>
            )}

            {user && user.role !== "admin" && (
              <li className="nav-item-custom">
                <NavLink to="/cart" className={buildNavClass}>
                  <span className="nav-icon-wrapper">
                    <i className="bi bi-cart"></i>
                    {totalCartItems > 0 && (
                      <span className="cart-badge-count">{totalCartItems}</span>
                    )}
                  </span>
                  <span>Carrito</span>
                </NavLink>
              </li>
            )}

            <li className="nav-item-custom position-relative">
              <div
                className="nav-link-custom nav-link-profile cursor-pointer"
                onClick={() => setMostrarDropdown(!mostrarDropdown)}
              >
                <i className="bi bi-person"></i>
                <span>Perfil</span>
                <i className="bi bi-caret-down-fill profile-caret"></i>
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
                    <>
                      <button
                        className="dropdown-item-custom logout"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </>
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
