import React from "react";
import { Link } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";
import "../css/cardProduct.css";

export default function CardProduct({ product }) {
  if (!product || product.active === false) return null;

  const imageDefault =
    "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=800";

  const construirImagen = (image) => {
    if (!image) return imageDefault;

    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    return `http://localhost:3002${image.startsWith("/") ? image : `/${image}`}`;
  };

  const productImage = construirImagen(product.image || product.images?.[0]);
  const productName = product.name || "Producto sin nombre";
  const productDescription = product.description || "Sin descripción";
  const productPrice = product.price || 0;
  const productStock = product.stock || 0;
  const productCategory = product.category?.name || "Sin categoría";

  return (
    <div className="col-12 col-md-6 col-lg-4 px-3 mb-4">
      <article
        className="card h-100 shadow-sm border-0 product-card mx-auto"
        style={{ maxWidth: "360px" }}
      >
        <Link
          to={`/producto/${product._id}`}
          className="text-decoration-none text-dark"
        >
          <div className="position-relative overflow-hidden">
            <span className="badge badge-card text-dark position-absolute top-0 start-0 m-3 shadow-sm z-1">
              {productStock > 0 ? "Stock disponible" : "Sin stock"}
            </span>

            <img
              src={productImage}
              className="card-img-top img-product"
              alt={productName}
            />
          </div>

          <div className="card-body pb-0">
            <h2 className="h5 card-title fw-bold">{productName}</h2>

            <div className="d-flex gap-2 mb-2 flex-wrap">
              <span
                className="badge badge-card rounded-pill text-dark border text-uppercase"
                style={{ fontSize: "0.7rem" }}
              >
                {productCategory}
              </span>
            </div>

            <p className="text-muted small mb-3">{productDescription}</p>
          </div>

          <hr className="mx-3 my-2 opacity-10" />

          <div className="card-body pt-0 d-flex justify-content-between align-items-center">
            <div>
              <div className="fs-4 fw-bold text-dark">
                ${Number(productPrice).toLocaleString("es-AR")}
              </div>
              <div className="badge badge-card text-dark fw-normal">
                {productStock > 0 ? "Disponible" : "Agotado"}
              </div>
            </div>
          </div>
        </Link>

        <div className="card-body pt-0">
          <AddToCartButton product={product} />
        </div>
      </article>
    </div>
  );
}