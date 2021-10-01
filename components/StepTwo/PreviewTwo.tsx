import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";


import React, { useState, useEffect, FC, Component } from "react";
import { Carousel } from "primereact/carousel";
import { Button } from "primereact/button";
import { ProductService } from "./ProductoService";
import ImagesSlide from "./ImagesSlide";
import Review from "./Review";
// import "./CarouselDemo.css";
import style from './stepTwo.module.sass'

interface PreviewProps {
   ComponentReview?: React.ReactNode
}

const PreviewTwo: FC<PreviewProps> = (props) => {
   const [products, setProducts] = useState([]);
   const productService = new ProductService();

   useEffect(() => {
      productService
         .getProductsSmall()
         .then((data) => setProducts(data.slice(0, 3)));
   }, []);

   const productTemplate = (product: any) => {
      return (
         <div className="productItem">
            <div className="productItemContent" style = {{backgroundColor: "#edf1f8", padding: '30px'}}>
               <div>
                  <ImagesSlide />
               </div>
               
               <h1 className="p-mb-1">{product.title}</h1>
               <h5 style={{ marginTop: '10px' }}>
               {/* descripción*/}
               {product.description}
               </h5>
               <div style={{ marginTop: '10px' }}>
                  <h5>Cantidad de espacios disponible: {product.quantity}</h5>
                  <h5>Capacidad de personas: {product.cantidadPersonas}</h5>
               </div>
               <div style={{ marginTop: '20px' }}>
                  <h5 className="p-mt-0 p-mb-3">
                     Precio por hora:  {JSON.stringify(product.prices.priceHour)}
                  </h5>
                  <h5 className="p-mt-0 p-mb-3">
                     Precio por day: {JSON.stringify(product.prices.priceDay)}
                  </h5>
                  <h5 className="p-mt-0 p-mb-3">
                     Precio por semana: {JSON.stringify(product.prices.priceWeek)}
                  </h5>
                  <h5 className="p-mt-0 p-mb-3">
                     Precio por mes: {JSON.stringify(product.prices.priceMoth)}
                  </h5>
                  {/* <Review product = {products}/> */}
               </div>
            </div>
         </div>
      );
   };

   return (
      <div className={style.carouselDemo}>
         {/* <ComponentReview /> */}

         {/* <div className="carousel-demo">  */}
         <div className="card">
            <Carousel
               value={products}
               numVisible={1}
               numScroll={1}
               //   responsiveOptions={responsiveOptions}
               // itemTemplate={Review}
               itemTemplate={productTemplate}
               // header={<h1>{product.type}</h1>}
               circular
               autoplayInterval={10000}

            />
         </div>
      </div>
   );
};

export default PreviewTwo