import React from 'react'
import "../css/cardProduct.css"

export default function (product) {

// const {name = "Botines de cesped sintetico",description = "Cesped cintetico",price ="122.000",stock = true,category = "Calzado",image,active} = product;


  return (


     <div className="col-12 col-md-6 col-lg-4 px-3 mb-4">
    <article className="card h-100 shadow-sm border-0 product-card mx-auto" style={{ maxWidth: '360px' }}>
        
        <div className="position-relative overflow-hidden">
            <span className="badge badge-card text-dark position-absolute top-0 start-0 m-3 shadow-sm z-1">
                Stock disponible
            </span>
            <img src="https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=800" 
                 className="card-img-top img-product" 
                 alt="Botines para cesped"/>
        </div>

        <div className="card-body pb-0">
            <h2 className="h5 card-title fw-bold">Botines para cesped</h2>
            <div className="d-flex gap-2 mb-3">
                <span className="badge badge-card rounded-pill text-dark border text-uppercase" style={{fontSize: "0.7rem"}}>Calzado</span>
                <span className="badge badge-card rounded-pill text-dark border text-uppercase" style={{fontSize: "0.7rem"}}>Cesped sintético</span>
            </div>
        </div>

        <hr className="mx-3 my-2 opacity-10"/>

        <div className="card-body pt-0 d-flex justify-content-between align-items-center">
            <div>
                <div className="fs-4 fw-bold text-dark">$89.900</div>
                <div className="badge badge-card text-dark fw-normal">Oferta</div>
            </div>
            
            <button className="btn btn-dark btn-card px-4 rounded-pill d-flex align-items-center gap-2">
                <i className="bi bi-cart-plus"></i> Agregar
            </button>
        </div>
    </article>
</div>
  )
}
