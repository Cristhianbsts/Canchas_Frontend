import React from 'react'
import CardProduct from '../components/CardProduct'
import "../css/viewsCSS/EcommerceView.css"
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'
import Navbar from '../components/Navbar'

export default function EcommerceView() {



  return (
    <div>
      <div class="container-fluid p-0">
        <Navbar/>
        <section class="hero-section d-flex flex-column justify-content-center align-items-center text-center">
            <h1 class="display-3 fw-bold">Tienda oficial</h1>
            <p class="lead">Equipate con lo mejor para tu proximo partido</p>
        </section>
        <div class="container mt-5">
          <SearchBar/>
        </div>

        {/* Contenedor Principal de la Galería */}
<section className="container-fluid px-4 py-5 bg-white">
  
  {/* Título de la Sección General */}
  <div className="text-center mb-5">
    <h2 className="display-6 fw-bold">Nuestros Productos</h2>
    <hr className="mx-auto" style={{ width: '60px', height: '4px', backgroundColor: '#000' }} />
  </div>

  {/* --- CATEGORÍA: CALZADO --- */}
  <div className="category-section mb-5">
    <div className="d-flex justify-content-between align-items-end mb-4">
      <h3 className="h4 fw-bold mb-0 text-uppercase border-start border-4 border-primary ps-3">
        Calzado
      </h3>
      <a href="#" className="text-decoration-none text-muted small">Ver todo</a>
    </div>
    
    <div className="row g-4">
      {/* Aquí irían tus <CardProducto /> */} 
      <CardProduct/>
      <CardProduct/>
      <CardProduct/>
      <CardProduct/> 
      {/* Ejemplo de estructura para el map: */}
      {/* productosCalzado.map(prod => <CardProducto key={prod.id} {...prod} />) */}
    </div>
  </div>

  {/* --- CATEGORÍA: INDUMENTARIA --- */}
  <div className="category-section mb-5">
    <div className="d-flex justify-content-between align-items-end mb-4">
      <h3 className="h4 fw-bold mb-0 text-uppercase border-start border-4 border-success ps-3">
        Indumentaria
      </h3>
      <a href="#" className="text-decoration-none text-muted small">Ver todo</a>
    </div>
    
    <div className="row g-4">
      {/* Espacio para componentes de Indumentaria */}
       <CardProduct/> 
        <CardProduct/> 
         <CardProduct/> 
    </div>
  </div>

  {/* --- CATEGORÍA: ACCESORIOS --- */}
  <div className="category-section mb-5">
    <div className="d-flex justify-content-between align-items-end mb-4">
      <h3 className="h4 fw-bold mb-0 text-uppercase border-start border-4 border-warning ps-3">
        Accesorios
      </h3>
      <a href="#" className="text-decoration-none text-muted small">Ver todo</a>
    </div>
    
    <div className="row g-4">
      {/* Espacio para componentes de Accesorios */}
    </div>
  </div>

  {/* --- CATEGORÍA: COMIDA (Suplementos/Energía) --- */}
  <div className="category-section mb-5">
    <div className="d-flex justify-content-between align-items-end mb-4">
      <h3 className="h4 fw-bold mb-0 text-uppercase border-start border-4 border-danger ps-3">
        Comida y Nutrición
      </h3>
      <a href="#" className="text-decoration-none text-muted small">Ver todo</a>
    </div>
    
    <div className="row g-4">
      {/* Espacio para componentes de Comida */}
    </div>
  </div>
  <Pagination
  paginaActual={1} 
  totalPaginas={5} 
  alCambiarPagina={(n) => console.log("Cambiando a página", n)} 
   />
</section>
    </div>
    </div>
  )
}


