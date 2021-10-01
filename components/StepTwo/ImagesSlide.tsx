import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";


import React, { useState, useEffect, FC } from "react";
import { Carousel } from "primereact/carousel";
import { Button } from "primereact/button";
import { ProductService } from "./ProductoService";
import style from './stepTwo.module.sass'

interface ImageProps {
  id ?: number
}

const ImagesSlide:FC<ImageProps> = (props) =>{
    const [products, setProducts] = useState([]);
    const productService = new ProductService();
  
    useEffect(() => {
      productService
        .getProductsSmall()
        .then((data) => setProducts(data.slice(0, 3)));
    }, []);
  
    const productTemplate = (product:any) => {
      return (
          <div>
              <img
                src={product.image}
                alt={product.title}
                className= {style.ImageSlide}
              />
        </div>
      );
    };
    
    return (
        <div className="card">
          <Carousel
            value={products}
            numVisible={1}
            numScroll={1}
            //   responsiveOptions={responsiveOptions}
            itemTemplate={productTemplate}
            circular
            autoplayInterval={3000}
          />
        </div>
      
    );
  };

export default ImagesSlide

