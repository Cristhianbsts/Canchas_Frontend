import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getProducts, saveProduct, deleteProduct } from "../../helpers/product";
import { getCategories, saveCategory, deleteCategory } from "../../helpers/category";
import CardProduct from "../CardProduct";
import ProductCardShelf from "../ProductCardShelf";

const IMAGE_DEFAULT =
  "https://res.cloudinary.com/dp7qbi976/image/upload/v1733325605/v7fiv6xngp8o78v7a3sd.webp";

export const TiendaManager = () => {
  const [tabActiva, setTabActiva] = useState("productos");
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  const [mostrarModalProd, setMostrarModalProd] = useState(false);
  const [mostrarModalCat, setMostrarModalCat] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [preview, setPreview] = useState(null);
  const [productSubmitError, setProductSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      price: "",
      stock: "",
      category: "",
      description: "",
      imageFile: null,
    },
  });

  const [formCat, setFormCat] = useState({ name: "" });

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [dataProd, dataCat] = await Promise.all([getProducts(undefined, true), getCategories()]);
      if (dataProd) setProductos(dataProd);
      if (dataCat.ok) setCategorias(dataCat.categories);
    } catch (error) {
      console.error("Error cargando tienda:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("imageFile", file, { shouldValidate: true });
      clearErrors("imageFile");
      setPreview(URL.createObjectURL(file));
    }
  };

  const mapBackendProductErrors = (res) => {
    const fieldMap = {
      name: "name",
      price: "price",
      stock: "stock",
      category: "category",
      description: "description",
      image: "imageFile",
      archivo: "imageFile",
    };
    const backendErrors = res?.errors;
    let hasMappedErrors = false;

    const registerMappedError = (rawField, issue) => {
      const fieldName = rawField || issue?.path || issue?.param || issue?.field;
      const targetField = fieldMap[fieldName];
      const message = issue?.msg || issue?.message || issue;

      if (targetField && typeof message === "string" && message.trim()) {
        hasMappedErrors = true;
        setError(targetField, { type: "server", message });
      }
    };

    if (Array.isArray(backendErrors)) {
      backendErrors.forEach((issue) => registerMappedError(undefined, issue));
    } else if (backendErrors && typeof backendErrors === "object") {
      Object.entries(backendErrors).forEach(([field, issue]) => {
        if (Array.isArray(issue)) {
          issue.forEach((item) => registerMappedError(field, item));
          return;
        }
        registerMappedError(field, issue);
      });
    }

    if (!hasMappedErrors) {
      setProductSubmitError(res?.message || "No se pudo guardar el producto.");
    }
  };

  const guardarProducto = async (values) => {
    clearErrors();
    setProductSubmitError("");

    const data = new FormData();
    data.append("name", values.name.trim());
    data.append("price", values.price);
    data.append("stock", values.stock);
    data.append("category", values.category);
    data.append("description", values.description?.trim() || "");
    data.append("active", true);

    if (values.imageFile) {
      data.append("archivo", values.imageFile);
    }

    try {
      const res = await saveProduct(editandoId, data);
      if (res.ok) {
        setMostrarModalProd(false);
        setEditandoId(null);
        setPreview(null);
        reset();
        cargarDatos();
      } else {
        mapBackendProductErrors(res);
      }
    } catch (error) {
      console.error("Error al guardar producto:", error);
      setProductSubmitError("Error de conexion con el servidor. Revisa la consola.");
    }
  };

  const guardarCategoria = async (e) => {
    e.preventDefault();
    try {
      const res = await saveCategory(editandoId, formCat);
      if (res.ok) {
        setMostrarModalCat(false);
        setEditandoId(null);
        cargarDatos();
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error("Error al guardar categoria:", error);
      alert("Error de conexion con el servidor. Revisa la consola.");
    }
  };

  const borrarItem = async (tipo, id, nombre) => {
    if (!window.confirm(`Estas seguro que deseas eliminar "${nombre}"?`)) return;
    try {
      const data = tipo === "prod" ? await deleteProduct(id) : await deleteCategory(id);
      if (data.ok) cargarDatos();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const abrirEdicionProducto = (producto) => {
    setEditandoId(producto._id);
    setProductSubmitError("");
    setPreview(producto.image || IMAGE_DEFAULT);
    reset({
      name: producto.name || "",
      price: producto.price ?? "",
      stock: producto.stock ?? "",
      category: producto.category?._id || producto.category || "",
      description: producto.description || "",
      imageFile: null,
    });
    setMostrarModalProd(true);
  };

  return (
    <div className="position-relative">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 gap-3">
        <div>
          <h2 className="m-0 fw-bold" style={{ color: "var(--color-title)" }}>
            Tienda
          </h2>
          <p className="text-muted mb-0">Gestion de inventario y clasificacion</p>
        </div>
        <button
          onClick={() => {
            setEditandoId(null);
            if (tabActiva === "productos") {
              setPreview(IMAGE_DEFAULT);
              setProductSubmitError("");
              reset({
                name: "",
                price: "",
                stock: "",
                category: "",
                description: "",
                imageFile: null,
              });
              setMostrarModalProd(true);
            } else {
              setFormCat({ name: "" });
              setMostrarModalCat(true);
            }
          }}
          className="btn text-white shadow-sm d-flex align-items-center gap-2"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <i className="bi bi-plus-lg"></i>
          Nuevo {tabActiva === "productos" ? "Producto" : "Categoria"}
        </button>
      </div>

      <ul className="nav nav-tabs mb-4 border-bottom">
        <li className="nav-item">
          <button
            className={`nav-link border-0 ${tabActiva === "productos" ? "active fw-bold" : "text-muted"}`}
            onClick={() => setTabActiva("productos")}
            style={
              tabActiva === "productos"
                ? {
                    borderBottom: "3px solid var(--color-primary)",
                    color: "var(--color-primary)",
                    borderRadius: 0,
                  }
                : {}
            }
          >
            Productos ({productos.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link border-0 ${tabActiva === "categorias" ? "active fw-bold" : "text-muted"}`}
            onClick={() => setTabActiva("categorias")}
            style={
              tabActiva === "categorias"
                ? {
                    borderBottom: "3px solid var(--color-primary)",
                    color: "var(--color-primary)",
                    borderRadius: 0,
                  }
                : {}
            }
          >
            Categorias ({categorias.length})
          </button>
        </li>
      </ul>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-success"></div>
        </div>
      ) : tabActiva === "productos" ? (
        <ProductCardShelf mobileCarousel>
          {productos.map((producto) => (
            <CardProduct
              key={producto._id}
              product={producto}
              linkTo={null}
              topBadges={
                !producto.active
                  ? [
                      {
                        key: "inactive",
                        text: "Inactivo",
                        position: "end",
                        className: "product-card-badge--warning",
                      },
                    ]
                  : []
              }
              footerAside={
                <span
                  className={`badge rounded-pill border px-3 py-2 ${
                    Number(producto.stock) < 5
                      ? "bg-danger-subtle text-danger border-danger-subtle"
                      : "bg-light text-dark"
                  }`}
                >
                  Stock: {producto.stock}
                </span>
              }
              footerNote="panel admin"
              bottomActions={
                <div className="product-card-actions">
                  <button
                    onClick={() => abrirEdicionProducto(producto)}
                    className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-center gap-1 product-card-action-btn"
                  >
                    <i className="bi bi-pencil-square"></i>
                    Editar
                  </button>
                  <button
                    onClick={() => borrarItem("prod", producto._id, producto.name)}
                    className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center gap-1 product-card-action-btn"
                  >
                    <i className="bi bi-trash3"></i>
                    Borrar
                  </button>
                </div>
              }
            />
          ))}
        </ProductCardShelf>
      ) : (
        <div className="bg-white rounded shadow-sm border overflow-hidden">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="px-4 py-3">Nombre de Categoria</th>
                <th className="text-end px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((categoria) => (
                <tr key={categoria._id} style={{ height: "70px" }}>
                  <td
                    className="px-4 fw-bold text-capitalize"
                    style={{ color: "var(--color-title)" }}
                  >
                    {categoria.name}
                  </td>
                  <td className="text-end px-4">
                    <div className="d-flex justify-content-end gap-2 flex-nowrap">
                      <button
                        onClick={() => {
                          setEditandoId(categoria._id);
                          setFormCat({ name: categoria.name });
                          setMostrarModalCat(true);
                        }}
                        className="btn btn-sm d-flex align-items-center gap-2 px-3 fw-medium"
                        style={{
                          backgroundColor: "var(--color-navbar)",
                          color: "var(--color-primary)",
                          border: "none",
                        }}
                      >
                        <i className="bi bi-pencil-square"></i>
                        Editar
                      </button>
                      <button
                        onClick={() => borrarItem("cat", categoria._id, categoria.name)}
                        className="btn btn-sm btn-outline-danger d-flex align-items-center gap-2 px-3 fw-medium"
                      >
                        <i className="bi bi-trash3"></i>
                        Borrar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {mostrarModalProd && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1070 }}
        >
          <div
            className="bg-white p-4 rounded shadow-lg w-100"
            style={{ maxWidth: "500px", maxHeight: "95vh", overflowY: "auto" }}
          >
            <h5 className="fw-bold mb-4">
              {editandoId ? "Actualizar Producto" : "Crear Nuevo Producto"}
            </h5>
            <form onSubmit={handleSubmit(guardarProducto)} className="row g-3" noValidate>
              <div className="col-12 text-center mb-2">
                <div
                  className="border rounded p-2 bg-light mx-auto"
                  style={{ width: "100%", height: "180px" }}
                >
                  <img
                    src={preview || IMAGE_DEFAULT}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    alt="Preview"
                  />
                </div>
              </div>
              <div className="col-12">
                <label className="form-label small fw-bold text-muted">Imagen del producto</label>
                <input
                  type="file"
                  className="form-control form-control-sm"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {errors.imageFile && (
                  <small className="text-danger d-block mt-1">{errors.imageFile.message}</small>
                )}
              </div>
              <div className="col-12">
                <label className="form-label small fw-bold text-muted">Nombre</label>
                <input
                  type="text"
                  className={`form-control text-uppercase fw-bold ${errors.name ? "is-invalid" : ""}`}
                  {...register("name", {
                    required: "El nombre es obligatorio.",
                    validate: (value) =>
                      value.trim().length > 0 || "El nombre es obligatorio.",
                  })}
                />
                {errors.name && <small className="text-danger d-block mt-1">{errors.name.message}</small>}
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold text-muted">Precio ($)</label>
                <input
                  type="number"
                  className={`form-control fw-bold ${errors.price ? "is-invalid" : ""}`}
                  {...register("price", {
                    required: "El precio es obligatorio.",
                    valueAsNumber: true,
                    validate: (value) =>
                      Number.isFinite(value) || "Ingresa un precio válido.",
                    min: {
                      value: 0,
                      message: "El precio no puede ser menor a 0.",
                    },
                  })}
                />
                {errors.price && <small className="text-danger d-block mt-1">{errors.price.message}</small>}
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold text-muted">Stock inicial</label>
                <input
                  type="number"
                  className={`form-control fw-bold ${errors.stock ? "is-invalid" : ""}`}
                  {...register("stock", {
                    required: "El stock inicial es obligatorio.",
                    valueAsNumber: true,
                    validate: (value) =>
                      Number.isFinite(value) || "Ingresa un stock válido.",
                    min: {
                      value: 0,
                      message: "El stock no puede ser menor a 0.",
                    },
                  })}
                />
                {errors.stock && <small className="text-danger d-block mt-1">{errors.stock.message}</small>}
              </div>
              <div className="col-12">
                <label className="form-label small fw-bold text-muted">Categoria</label>
                <select
                  className={`form-select ${errors.category ? "is-invalid" : ""}`}
                  {...register("category", { required: "La categoria es obligatoria." })}
                >
                  <option value="">Seleccione una categoria...</option>
                  {categorias.map((categoria) => (
                    <option key={categoria._id} value={categoria._id}>
                      {categoria.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <small className="text-danger d-block mt-1">{errors.category.message}</small>
                )}
              </div>
              <div className="col-12">
                <label className="form-label small fw-bold text-muted">Descripcion corta</label>
                <textarea
                  className="form-control"
                  rows="2"
                  {...register("description")}
                  placeholder="Ej: Bebida isotonic 500ml"
                ></textarea>
              </div>
              {productSubmitError && (
                <div className="col-12">
                  <div className="alert alert-danger mb-0 py-2" role="alert">
                    {productSubmitError}
                  </div>
                </div>
              )}
              <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
                <button
                  type="button"
                  className="btn btn-light px-4"
                  onClick={() => {
                    setMostrarModalProd(false);
                    setProductSubmitError("");
                    clearErrors();
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn text-white px-4 fw-bold"
                  style={{ backgroundColor: "var(--color-primary)" }}
                  disabled={!isValid || isSubmitting}
                >
                  {isSubmitting ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {mostrarModalCat && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1070 }}
        >
          <div className="bg-white p-4 rounded shadow-lg w-100" style={{ maxWidth: "400px" }}>
            <h5 className="fw-bold mb-4">
              {editandoId ? "Editar Categoria" : "Nueva Categoria"}
            </h5>
            <form onSubmit={guardarCategoria}>
              <div className="mb-4">
                <label className="form-label small fw-bold text-muted">Nombre de la categoria</label>
                <input
                  type="text"
                  className="form-control fw-bold text-uppercase"
                  value={formCat.name}
                  onChange={(e) => setFormCat({ name: e.target.value })}
                  required
                  placeholder="Ej: BEBIDAS"
                />
              </div>
              <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
                <button
                  type="button"
                  className="btn btn-light px-4"
                  onClick={() => setMostrarModalCat(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn text-white px-4 fw-bold"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
