import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";


import React, { useState, useEffect, FC } from "react";
import { Carousel } from "primereact/carousel";
import { Button } from "primereact/button";
import { ProductService } from "./ProductoService";
import style from './stepTwo.module.sass'

interface ImageProps {
  images?: string[]
}

const ImagesSlide: FC<ImageProps> = (props) => {
  const ImagesProp = props.images
  console.log('images', ImagesProp);


  const productTemplate = (image: any) => {
    console.log(`imageSrc = ${image.src}`);

    return (
      <div>
        <img src={image.src} style={{ maxWidth: '100%' }} />
      </div>
    );
  };

  return (
    <div className="card">
      <Carousel
        value={ImagesProp}
        numVisible={1}
        numScroll={1}
        itemTemplate={productTemplate}
        circular
        autoplayInterval={3000}
      />
    </div>

  );
};

export default ImagesSlide

