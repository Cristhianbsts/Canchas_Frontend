import { useForm } from "react-hook-form";
import { useState } from "react";
import { UserContext } from "../context/UserContext.jsx";
import "../../css/login.css";
import imagenlogin from "../../assets/imagen1.webp";

const LoginScreen = () => {
  const [response, setResponse] = useState();
  const { loadUserData } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await logIn(data.email, data.password);
    setResponse(response);

    if (response.ok) {
      await loadUserData();
      navigate("/");
    }
  };

  return (
    <div className="container-fluid login-wrapper">
      <div className="row min-vh-100">
        <div className="col-12 col-lg-7 d-flex justify-content-center align-items-center abajo">
          <div className="login-card">
            <button className="back-button"></button>

            <div className="circulo"></div>

            <h2 className="title">¡Hola de nuevo!</h2>
            <p className="subtitle">Ingresá para gestionar tus reservas</p>

            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
              <label>Correo electrónico</label>
              <input
                type="email"
                placeholder="juan.perez@ejemplo.com"
                {...register("email", { required: "El email es obligatorio" })}
              />

              <label>Contraseña</label>
              <div className="password-wrapper">
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                  })}
                />
                <span className="eye"></span>
              </div>
              {errors.password && <span>{errors.password.message}</span>}

              <button type="submit" className="login-button">
                {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
              </button>
            </form>

            <div className="register-link">
              ¿No tienes cuenta? <span>Registrate acá</span>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-5 p-0">
          <img
            src={imagenlogin}
            alt="Complejo deportivo"
            className="login-image"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
