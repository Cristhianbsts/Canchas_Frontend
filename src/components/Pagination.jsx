import React from 'react';
import "../css/pagination.css"

const Pagination = ({ paginaActual, totalPaginas, alCambiarPagina }) => {
  // Generamos un array de números para las páginas
  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  return (
    <nav aria-label="Navegación de productos" className="my-5">
      <ul className="pagination justify-content-center custom-pagination">
        
        {/* Botón Anterior */}
        <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
          <button 
            className="page-link shadow-none" 
            onClick={() => alCambiarPagina(paginaActual - 1)}
            tabIndex="-1"
          >
            <i className="bi bi-chevron-left"></i>
          </button>
        </li>

        {/* Números de página */}
        {paginas.map((num) => (
          <li key={num} className={`page-item ${paginaActual === num ? 'active' : ''}`}>
            <button 
              className="page-link shadow-none" 
              onClick={() => alCambiarPagina(num)}
            >
              {num}
            </button>
          </li>
        ))}

        {/* Botón Siguiente */}
        <li className={`page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`}>
          <button 
            className="page-link shadow-none" 
            onClick={() => alCambiarPagina(paginaActual + 1)}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;