import React, { useEffect, useMemo, useState } from 'react'
import CardProduct from '../components/CardProduct'
import "../css/viewsCSS/EcommerceView.css"
import Pagination from '../components/Pagination'
import SearchBar from '../components/SearchBar'
import { getProducts, isVisibleProduct } from '../helpers/product';


export default function EcommerceView() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [sortBy, setSortBy] = useState("relevancia")
  const [stockFilter, setStockFilter] = useState("todos")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
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
        setProducts(
          Array.isArray(productosRecibidos)
            ? productosRecibidos.filter(isVisibleProduct)
            : []
        )
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
    const minPriceValue = minPrice === "" ? null : Number(minPrice)
    const maxPriceValue = maxPrice === "" ? null : Number(maxPrice)


    return products
      .filter((product) => {
        const nombre = normalizarTexto(product.name)
        const descripcion = normalizarTexto(product.description)
        const categoria = normalizarTexto(product.category?.name)
        const precio = Number(product.price) || 0
        const stock = Number(product.stock) || 0
        const coincideCategoria =
          categoriaSeleccionada === normalizarTexto("Todas") ||
          categoria === categoriaSeleccionada
        const coincideStock =
          stockFilter === "todos" ||
          (stockFilter === "disponibles" && stock > 0) ||
          (stockFilter === "sin-stock" && stock <= 0)
        const coincidePrecioMin =
          minPriceValue === null || Number.isNaN(minPriceValue) || precio >= minPriceValue
        const coincidePrecioMax =
          maxPriceValue === null || Number.isNaN(maxPriceValue) || precio <= maxPriceValue

        return (
          coincideCategoria &&
          coincideStock &&
          coincidePrecioMin &&
          coincidePrecioMax &&
          (
            nombre.includes(busquedaNormalizada) ||
            descripcion.includes(busquedaNormalizada) ||
            categoria.includes(busquedaNormalizada)
          )
        )
      })
      .sort((a, b) => {
        if (sortBy === "precio-menor") {
          return (Number(a.price) || 0) - (Number(b.price) || 0)
        }

        if (sortBy === "precio-mayor") {
          return (Number(b.price) || 0) - (Number(a.price) || 0)
        }

        if (sortBy === "nombre-desc") {
          const nombreA = normalizarTexto(a.name)
          const nombreB = normalizarTexto(b.name)
          return nombreB.localeCompare(nombreA, "es")
        }

        const nombreA = normalizarTexto(a.name)
        const nombreB = normalizarTexto(b.name)
        return nombreA.localeCompare(nombreB, "es")
      })
  }, [products, search, selectedCategory, sortBy, stockFilter, minPrice, maxPrice])

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

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
    setPaginaActual(1)
  }

  const handleStockChange = (e) => {
    setStockFilter(e.target.value)
    setPaginaActual(1)
  }

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value)
    setPaginaActual(1)
  }

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value)
    setPaginaActual(1)
  }

  const handleClearFilters = () => {
    setSearch("")
    setSelectedCategory("Todas")
    setSortBy("relevancia")
    setStockFilter("todos")
    setMinPrice("")
    setMaxPrice("")
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
            <div className="col-12 col-md-11 col-lg-9 searchbar-shell">
              <SearchBar 
                value={search} 
                onChange={handleChangeSearch} 
                placeholder="Buscar por nombre o categoría..." 
              />
            </div>
          </div>
        </div>

        {!loading && (
          <div className="container mt-3">
            <div className="advanced-filters">
              <div className="filter-group">
                <label className="filter-label" htmlFor="categoryFilter">Categoría</label>
                <select
                  id="categoryFilter"
                  className="filter-select"
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  {categorias.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label" htmlFor="sortBy">Ordenar por</label>
                <select
                  id="sortBy"
                  className="filter-select"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="relevancia">Nombre A-Z</option>
                  <option value="nombre-desc">Nombre Z-A</option>
                  <option value="precio-menor">Menor precio</option>
                  <option value="precio-mayor">Mayor precio</option>
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label" htmlFor="stockFilter">Disponibilidad</label>
                <select
                  id="stockFilter"
                  className="filter-select"
                  value={stockFilter}
                  onChange={handleStockChange}
                >
                  <option value="todos">Todos</option>
                  <option value="disponibles">Con stock</option>
                  <option value="sin-stock">Sin stock</option>
                </select>
              </div>

              <div className="filter-group price-range-group">
                <label className="filter-label">Rango de precio</label>
                <div className="price-range-inputs">
                  <input
                    type="number"
                    min="0"
                    className="filter-input"
                    placeholder="Desde"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                  />
                  <input
                    type="number"
                    min="0"
                    className="filter-input"
                    placeholder="Hasta"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                  />
                </div>
              </div>

              <button
                type="button"
                className="clear-filters-btn"
                onClick={handleClearFilters}
              >
                Limpiar filtros
              </button>
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
