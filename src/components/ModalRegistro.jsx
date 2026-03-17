import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom';

const ModalRegistro = ({ isOpen, onClose }) => {
  // Estados para controlar la visibilidad de las contraseñas
  const [verPassword, setVerPassword] = useState(false);
  const [verRepetirPassword, setVerRepetirPassword] = useState(false);

     const {
         register,
         handleSubmit,
         watch,
         formState: { errors },
         reset,
       } = useForm()
     
       
     const onSubmit = async (data) => {
     
       try {
     
          const res =   await fetch('http://localhost:2500/api/register', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(data),
           });
          const  response = await res.json();
     
          response.ok?alert("Usuario creado con exito"):alert("Error al crear el usuario");
         
           reset();
       } catch (error) {
         console.log(error);
       } 
     
     };

  if (!isOpen) return null;

  // Función genérica para alternar la visibilidad
  const togglePasswordVisibilidad = (tipo) => {
    if (tipo === 'password') {
      setVerPassword(!verPassword);
    } else {
      setVerRepetirPassword(!verRepetirPassword);
    }
  };

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg p-3" style={{ borderRadius: '20px' }}>
          
          {/* Botón Cerrar Superior Derecha */}
          <div className="d-flex justify-content-end">
            <button type="button" className="btn-close shadow-none" onClick={onClose} aria-label="Close"></button>
          </div>

          <div className="modal-body text-center pt-0">
            {/* Círculo con color específico */}
            <div className="mx-auto mb-3" style={{ 
              width: '70px', 
              height: '70px', 
              backgroundColor: '#1ea53a', 
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <i className="bi bi-person-plus-fill text-white fs-2"></i>
            </div>

            <h2 className="fw-bold h4">Crea tu cuenta</h2>
            <p className="text-muted small mb-4">Completa tus datos y reserva</p>

            <form>
              {/* Usuario con Hombresito */}
              <div className="input-group mb-3">
                <input type="text" className="form-control rounded-start-pill bg-light border-0 py-2 ps-3" placeholder="Usuario" aria-label="Usuario"
                {...register("username",{required:"El nombre es requerido"})}
                />
                <span className="input-group-text rounded-end-pill bg-light border-0 text-muted pe-3">
                  <i className="bi bi-person"></i>
                </span>
              </div>
              {/* Correo con Sobresito */}
              <div className="input-group mb-3">
                <input type="email" className="form-control rounded-start-pill bg-light border-0 py-2 ps-3" placeholder="Correo electrónico" aria-label="Correo electrónico"
                {...register("email",{required:"El email es requerido"})}
                />
                <span className="input-group-text rounded-end-pill bg-light border-0 text-muted pe-3">
                  <i className="bi bi-envelope"></i>
                </span>
              </div>

              {/* Teléfono con Teléfono */}
              <div className="input-group mb-3">
                <input type="tel" className="form-control rounded-start-pill bg-light border-0 py-2 ps-3" placeholder="Número de teléfono" aria-label="Número de teléfono"
                {...register("phoneNumber",{required:"El numero de telefono es requerido"})}
                />
                <span className="input-group-text rounded-end-pill bg-light border-0 text-muted pe-3">
                  <i className="bi bi-telephone"></i>
                </span>
              </div>

              {/* Contraseña con Candado y Ojo */}
              <div className="input-group mb-3">
                <input 
                  type={verPassword ? "text" : "password"} 
                  className="form-control rounded-start-pill bg-light border-0 py-2 ps-3" 
                  placeholder="Contraseña" 
                  aria-label="Contraseña"
                  {...register("password",{required:"La contraseña es requerida"})}
                />
                <button 
                  className="btn btn-light rounded-end-pill border-0 text-muted pe-3 shadow-none" 
                  type="button" 
                  onClick={() => togglePasswordVisibilidad('password')}
                  style={{ backgroundColor: '#f8f9fa' }} // Forzar el fondo gris suave
                >
                  <i className={`bi ${verPassword ? 'bi-eye' : 'bi-eye-slash'}`}></i>
                </button>
              </div>

              {/* Repetir Contraseña con Candado y Ojo */}
              <div className="input-group mb-3">
                <input 
                  type={verRepetirPassword ? "text" : "password"} 
                  className="form-control rounded-start-pill bg-light border-0 py-2 ps-3" 
                  placeholder="Repetir contraseña" 
                  aria-label="Repetir contraseña"
                  {...register("repeatpassword",{required:"Repetir contraseña es requerida"})}
                />
                <button 
                  className="btn btn-light rounded-end-pill border-0 text-muted pe-3 shadow-none" 
                  type="button" 
                  onClick={() => togglePasswordVisibilidad('repetir')}
                  style={{ backgroundColor: '#f8f9fa' }} // Forzar el fondo gris suave
                >
                  <i className={`bi ${verRepetirPassword ? 'bi-eye' : 'bi-eye-slash'}`}></i>
                </button>
              </div>

              {/* Checkbox Términos */}
              <div className="form-check text-start mb-4 small">
                <input className="form-check-input" type="checkbox" id="terminos" 
                {...register("terminos",{required:"Porfavor aceptar terminos y condiciones"})}/>
                <label className="form-check-label text-muted" htmlFor="terminos">
                  Aceptar términos y solicitudes
                </label>
              </div>

              {/* Botón Crear Cuenta */}
              <button type="submit" className="btn w-100 rounded-pill py-2 fw-bold text-white shadow-sm" style={{ backgroundColor: '#1ea53a' }}
              onClick={handleSubmit(onSubmit)}
              >
                Crear cuenta
              </button>
            </form>

            <div className="mt-4 small">
              <span className="text-muted">¿Ya tienes cuenta? </span>
              <Link to="/login" className="text-decoration-none fw-bold" style={{ color: '#1ea53a' }}>Ingresa aquí</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalRegistro;