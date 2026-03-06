import React from 'react'
import "../css/cardProduct.css"

export default function (product) {

const {name = "Botines de cesped sintetico",description = "Cesped cintetico",price ="122.000",stock = true,category = "Calzado",image,active} = product;


  return (
    <article className='cardContent'>

        {/* seccion de imagen de la tarjeta */}

      <section className='sectionTop'>
         <div className={stock?"stockAvailable":"stockOut"}>{stock?"Stock disponible":"Stock agotado"}</div>
         <img src="" alt="" />
      </section>

        {/* seccion de titulo categoria y descripcion */}

      <section className='sectionMiddle'>
        <h2>{name}</h2>
        <div className='bageCategroy'>{category}</div>
        <div className='bageDescription'>{description}</div>
      </section>

        {/* seccion precio y agregar */}

      <section className='sectionBottom'>
        <div className='bagePrice'>{`$ ${price}`}</div>
        <div className='bageOf'>Oferta</div>
        <button className='buttonAdd'>Agregar</button>
      </section>

    </article>
  )
}
