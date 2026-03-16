import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton";

const ProductDetailView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [errorProduct, setErrorProduct] = useState("");

  const imageDefault =
    "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=800";

  const construirImagen = (image) => {
    if (!image) return imageDefault;

    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    return `http://localhost:3002${image.startsWith("/") ? image : `/${image}`}`;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoadingProduct(true);
        setErrorProduct("");

        const response = await fetch("http://localhost:3002/api/products");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "No se pudo cargar el producto");
        }

        const products = data.items || [];
        const foundProduct = products.find((item) => item._id === id);

        if (!foundProduct) {
          throw new Error("Producto no encontrado");
        }

        setProduct(foundProduct);
      } catch (error) {
        console.error("Error cargando detalle:", error);
        setErrorProduct(error.message || "Error al cargar el producto");
      } finally {
        setLoadingProduct(false);
      }
    };

    fetchProduct();
  }, [id]);

  const formatPrice = (value) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(Number(value) || 0);
  };

  if (loadingProduct) {
    return (
      <div className="container py-5">
        <h2>Cargando producto...</h2>
      </div>
    );
  }

  if (errorProduct) {
    return (
      <div className="container py-5">
        <Link to="/ecommerce" className="d-inline-block mb-4">
          ← Volver
        </Link>
        <h2>Error</h2>
        <p>{errorProduct}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5">
        <Link to="/ecommerce" className="d-inline-block mb-4">
          ← Volver
        </Link>
        <h2>Producto no encontrado</h2>
      </div>
    );
  }

  const productImage = construirImagen(product.image);
  const productName = product.name || "Producto sin nombre";
  const productDescription = product.description || "Sin descripción";
  const productPrice = product.price || 0;
  const productStock = product.stock || 0;
  const productCategory = product.category?.name || "Sin categoría";

  return (
    <main className="py-5 bg-light min-vh-100">
      <div className="container">
        <Link to="/ecommerce" className="d-inline-block mb-4 text-decoration-none">
          ← Volver
        </Link>

        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="row g-0">
            <div className="col-12 col-lg-6">
              <div className="p-4 h-100 d-flex align-items-center justify-content-center bg-white">
                <img
                  src={productImage}
                  alt={productName}
                  className="img-fluid rounded-4"
                  style={{ maxHeight: "500px", objectFit: "cover", width: "100%" }}
                />
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="p-4 p-md-5 h-100 d-flex flex-column">
                <span className="badge bg-secondary-subtle text-dark mb-3 align-self-start">
                  {productCategory}
                </span>

                <h1 className="fw-bold mb-3">{productName}</h1>

                <h2 className="display-6 fw-bold text-dark mb-3">
                  {formatPrice(productPrice)}
                </h2>

                <p className="text-muted mb-3">
                  <strong className="text-dark">Stock:</strong>{" "}
                  {productStock > 0 ? productStock : "Sin stock"}
                </p>

                <div className="mb-4">
                  <h3 className="h5 fw-bold mb-2">Descripción</h3>
                  <p className="text-muted mb-0">{productDescription}</p>
                </div>

                <div className="mt-auto">
                  <AddToCartButton product={product} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailView;