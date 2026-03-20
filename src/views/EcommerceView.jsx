import React, { useEffect, useMemo, useState } from 'react'
import CardProduct from '../components/CardProduct'
import "../css/viewsCSS/EcommerceView.css"
import Pagination from '../components/Pagination'
import SearchBar from '../components/SearchBar'
import { getProducts } from '../helpers/product';


export default function EcommerceView() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [paginaActual, setPaginaActual] = useState(1)

  const productosPorPagina = 8

  const normalizarTexto = (texto) => {
    return (texto || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
  }

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        setLoading(true)
        setError("")

        const productosRecibidos = await getProducts();
        setProducts(productosRecibidos)
      } catch (error) {
        console.error("Error al traer productos:", error)
        setError(error.message || "Error del servidor al cargar productos")
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProductsData()
  }, [])

  const categorias = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(
        products
          .map((product) => product.category?.name)
          .filter(Boolean)
      )
    ).sort((a, b) => a.localeCompare(b, "es"))

    return ["Todas", ...uniqueCategories]
  }, [products])

  const productosFiltrados = useMemo(() => {
    const busquedaNormalizada = normalizarTexto(search)
    const categoriaSeleccionada = normalizarTexto(selectedCategory)


    return products
      .filter((product) => {
        const nombre = normalizarTexto(product.name)
        const descripcion = normalizarTexto(product.description)
        const categoria = normalizarTexto(product.category?.name)
        const coincideCategoria =
          categoriaSeleccionada === normalizarTexto("Todas") ||
          categoria === categoriaSeleccionada

        return (
          coincideCategoria &&
          (
            nombre.includes(busquedaNormalizada) ||
            descripcion.includes(busquedaNormalizada) ||
            categoria.includes(busquedaNormalizada)
          )
        )
      })
      .sort((a, b) => {
        const nombreA = normalizarTexto(a.name)
        const nombreB = normalizarTexto(b.name)
        return nombreA.localeCompare(nombreB, "es")
      })
  }, [products, search, selectedCategory])

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina) || 1

  const productosPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * productosPorPagina
    const fin = inicio + productosPorPagina
    return productosFiltrados.slice(inicio, fin)
  }, [productosFiltrados, paginaActual])

  const handleChangeSearch = (e) => {
    setSearch(e.target.value)
    setPaginaActual(1)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setPaginaActual(1)
  }

  const handleCambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina)
  }

  return (
    <div>
      <div className="container-fluid p-0">


        <section className="hero-section d-flex flex-column justify-content-center align-items-center text-center">
          <h1 className="display-3 fw-bold">Tienda oficial</h1>
          <p className="lead">Equipate con lo mejor para tu proximo partido</p>
        </section>

        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <SearchBar 
                value={search} 
                onChange={handleChangeSearch} 
                placeholder="Buscar por nombre o categoría..." 
              />
            </div>
          </div>
        </div>

        {!loading && categorias.length > 1 && (
          <div className="container mt-4">
            <div className="category-filters">
              {categorias.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`category-filter-chip ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        <section className="container-fluid px-4 py-5 bg-white">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold">Nuestros Productos</h2>
            <hr
              className="mx-auto"
              style={{ width: '60px', height: '4px', backgroundColor: '#000' }}
            />
          </div>

          {loading && (
            <div className="text-center py-5">
              <p className="fs-5 mb-0">Cargando productos...</p>
            </div>
          )}

          {!loading && error && (
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}

          {!loading && !error && productosFiltrados.length === 0 && (
            <div className="text-center py-5">
              <p className="fs-5 mb-0">No se encontraron productos.</p>
            </div>
          )}

          {!loading && !error && productosFiltrados.length > 0 && (
            <>
              <div className="products-carousel mb-5">
                {productosPaginados.map((product) => (
                  <CardProduct key={product._id} product={product} />
                ))}
              </div>

              <Pagination
                paginaActual={paginaActual}
                totalPaginas={totalPaginas}
                alCambiarPagina={handleCambiarPagina}
              />
            </>
          )}
        </section>
      </div>
    </div>
  )
}
