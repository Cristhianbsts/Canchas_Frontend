# 🏟️ Canchas Frontend

![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**Aplicación web para reserva de canchas deportivas y venta de productos.**

</div>

---

## 📋 Descripción

Frontend desarrollado con **React 19** y **Vite** como proyecto final de Rolling Code School.

Interfaz completa para que usuarios puedan reservar canchas deportivas, comprar productos y para que administradores gestionen el complejo desde un panel dedicado.

---

## 👥 Equipo

**Los Piratas Dev** — Proyecto Final Rolling Code School 2025

---

## ✨ Funcionalidades

### Usuario
- 🏠 **Home** — Landing page con presentación del complejo
- 🔐 **Autenticación** — Registro (modal) y login
- 🏅 **Canchas** — Visualización de canchas disponibles con precios
- 📅 **Reservas** — Selección de fecha y horario para reservar
- 🛒 **Tienda** — Ecommerce de productos con carrito de compras
- 💳 **Pagos** — Integración con Mercado Pago

### Administrador
- 📊 **Panel Admin** — Dashboard con navegación persistente
- 🏟️ **Gestión de canchas** — CRUD completo con subida de imágenes
- 📦 **Gestión de productos** — CRUD con categorías e imágenes
- 👥 **Gestión de usuarios** — Visualización y control de accesos
- 🗓️ **Gestión de reservas** — Visualización de reservas activas

---

## ⚙️ Tecnologías

| Tecnología | Uso |
|---|---|
| React 19 | Librería de UI |
| Vite 7 | Bundler y servidor de desarrollo |
| React Router DOM 7 | Navegación entre páginas |
| Bootstrap 5 | Estilos y componentes visuales |
| Bootstrap Icons | Iconografía |
| React Hook Form | Manejo de formularios |
| Font Awesome | Iconos adicionales |

---

## 🚀 Instalación y uso

### 1. Clonar el repositorio

```bash
git clone https://github.com/Cristhianbsts/Canchas_Frontend.git
cd Canchas_Frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env.development` en la raíz del proyecto:

```bash
VITE_API_URL=http://localhost:3002
```

Para producción crear `.env.production`:

```bash
VITE_API_URL=https://tu-backend.vercel.app
```

### 4. Ejecutar en modo desarrollo

```bash
npm run dev
```

La app estará disponible en `http://localhost:5173`

### 5. Build para producción

```bash
npm run build
```

---

## 🔑 Variables de entorno

| Variable | Descripción |
|---|---|
| `VITE_API_URL` | URL base del backend (local o producción) |

> ⚠️ No subas los archivos `.env` al repositorio.

---

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── admin/
│   │   ├── AdminDashboard.jsx    # Panel principal con navegación
│   │   ├── CanchasManager.jsx    # CRUD de canchas
│   │   ├── TiendaManager.jsx     # CRUD de productos y categorías
│   │   ├── UsuariosManager.jsx   # Gestión de usuarios
│   │   └── ReservasManager.jsx   # Vista de reservas
│   └── ...
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   └── ...
├── config/
│   └── api.js                    # URL base de la API
└── main.jsx
```

---

## 🔐 Autenticación

El sistema usa **JWT almacenado en cookies HTTP-only**. Al iniciar sesión el servidor setea la cookie automáticamente. Las rutas protegidas verifican el token antes de renderizar.

Los roles del sistema son:
- `user` — acceso a reservas, tienda y perfil
- `admin` — acceso adicional al panel de administración
- `superadmin` — acceso total

---

## 🔗 Repositorio backend

El backend de este proyecto está disponible en:
👉 [canchas_backend](https://github.com/Cristhianbsts/canchas_backend)

---

## 📄 Licencia

ISC — Rolling Code School 2025