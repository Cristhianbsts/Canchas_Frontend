import React, { useEffect, useMemo, useState } from 'react'
import CardProduct from '../components/CardProduct'
import "../css/viewsCSS/EcommerceView.css"
import Pagination from '../components/Pagination'
import Navbar from '../components/layouts/Navbar'

export default function EcommerceView() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
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
    const getProducts = async () => {
      try {
        setLoading(true)
        setError("")

        const response = await fetch("http://localhost:3002/api/products")
        const data = await response.json()

        if (!response.ok) {
          setError(data.message || "No se pudieron cargar los productos")
          setProducts([])
          return
        }

        const productosRecibidos = data.items || data.products || data.data || []
        setProducts(productosRecibidos)
      } catch (error) {
        console.error("Error al traer productos:", error)
        setError("Error del servidor al cargar productos")
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    getProducts()
  }, [])

  const productosFiltrados = useMemo(() => {
    const busquedaNormalizada = normalizarTexto(search)
    

    return products
      .filter((product) => {
        const nombre = normalizarTexto(product.name)
        const descripcion = normalizarTexto(product.description)
        const categoria = normalizarTexto(product.category?.name)

        return (
          nombre.includes(busquedaNormalizada) ||
          descripcion.includes(busquedaNormalizada) ||
          categoria.includes(busquedaNormalizada)
        )
      })
      .sort((a, b) => {
        const nombreA = normalizarTexto(a.name)
        const nombreB = normalizarTexto(b.name)
        return nombreA.localeCompare(nombreB, "es")
      })
  }, [products, search])

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina) || 1

  const productosPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * productosPorPagina
    const fin = inicio + productosPorPagina
    return productosFiltrados.slice(inicio, fin)
  }, [productosFiltrados, paginaActual])

  const productosAgrupadosPorCategoria = useMemo(() => {
    const grupos = productosPaginados.reduce((acc, product) => {
      const nombreCategoria = product.category?.name || "Sin categoría"

      if (!acc[nombreCategoria]) {
        acc[nombreCategoria] = []
      }

      acc[nombreCategoria].push(product)
      return acc
    }, {})

    Object.keys(grupos).forEach((categoria) => {
      grupos[categoria].sort((a, b) => {
        const nombreA = normalizarTexto(a.name)
        const nombreB = normalizarTexto(b.name)
        return nombreA.localeCompare(nombreB, "es")
      })
    })

    return grupos
  }, [productosPaginados])

  const categorias = useMemo(() => {
    return Object.keys(productosAgrupadosPorCategoria).sort((a, b) =>
      normalizarTexto(a).localeCompare(normalizarTexto(b), "es")
    )
  }, [productosAgrupadosPorCategoria])

  const handleChangeSearch = (e) => {
    setSearch(e.target.value)
    setPaginaActual(1)
  }

  const handleCambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina)
  }

  return (
    <div>
      <div className="container-fluid p-0">
        <Navbar />

        <section className="hero-section d-flex flex-column justify-content-center align-items-center text-center">
          <h1 className="display-3 fw-bold">Tienda oficial</h1>
          <p className="lead">Equipate con lo mejor para tu proximo partido</p>
        </section>

        <div className="container mt-5">
          <div className="mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar productos por nombre, descripción o categoría..."
              value={search}
              onChange={handleChangeSearch}
            />
          </div>
        </div>

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
              {categorias.map((categoria) => (
                <div className="category-section mb-5" key={categoria}>
                  <div className="d-flex justify-content-between align-items-end mb-4">
                    <h3 className="h4 fw-bold mb-0 text-uppercase border-start border-4 border-dark ps-3">
                      {categoria}
                    </h3>

                    <span className="text-muted small">
                      {productosAgrupadosPorCategoria[categoria].length} producto(s)
                    </span>
                  </div>

                  <div className="row g-4">
                    {productosAgrupadosPorCategoria[categoria].map((product) => (
                      <CardProduct key={product._id} product={product} />
                    ))}
                  </div>
                </div>
              ))}

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