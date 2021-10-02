import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";


import React, { useState, useEffect, FC, Component } from "react";
import { Carousel } from "primereact/carousel";
import { Button } from "primereact/button";
import { ProductService } from "./ProductoService";
import ImagesSlide from "./ImagesSlide";
import Review from "./Review";
import axios from 'axios'
import { Badge, Text, Divider, Group } from "@mantine/core"
import Amenidades from "./Amenidades";
import style from './stepTwo.module.sass'
import { Container, Row, Col } from 'react-bootstrap'
import ImagesAll from './ImagesAll'


interface PreviewProps {
   ComponentReview?: React.ReactNode
}

const PreviewTwo: FC<PreviewProps> = (props) => {
   const [products, setProducts] = useState([]);
   const productService = new ProductService();
   const getData = () => {
      axios.get("data/office-info.json")
      .then(data => console.log(data.data.data));
  }

   useEffect(() => {
      productService
         .getProductsSmall()
         .then((data) => setProducts(data.slice(0, 3)));
   }, []);

   const productTemplate = (product: any) => {

      return (
         <div>
            <div style={{ padding: '30px' }}>
               <div>
                  <ImagesSlide />
               </div>

               <div>
                  <div className={style.InfoBasics}>
                     <div>
                        <Row style = {{marginBottom : '10px'}}>
                           <Col xs = {7}>
                              <p className={style.TitleBasics}>{product.title}</p>
                           </Col>
                           <Col xs = {5}>
                              <Badge
                                 color="pink"
                                 variant="filled"
                                 size="md"
                                 radius='md'
                                 className={style.Badge}>
                                 {product.type}
                              </Badge>
                           </Col>
                        </Row>
                     </div>
                     <p>Capacidad: {product.cantidadPersonas} personas</p>
                     <p>Cantidad: {product.quantity} espacios</p>
                  </div>
                  <div className={style.Prices}>
                     <Divider margins="xs" label="Precios" labelPosition="center" />
                     <p className={style.PricesTitle}>Precios</p>

                     <Group position="center">

                        <div className={style.PriceUnid} >
                           <h5>Por Hora</h5>
                           <p>${(product.prices.priceHour)}</p>
                        </div>

                        <Divider orientation="vertical" margins="sm" />

                        <div className={style.PriceUnid} >
                           <h5>Por Dia</h5>
                           <p>${(product.prices.priceDay)}</p>
                        </div>

                        <Divider orientation="vertical" margins="sm" />

                        <div className={style.PriceUnid} >
                           <h5>Por Semana</h5>
                           <p>${(product.prices.priceWeek)}</p>
                        </div>

                        <Divider orientation="vertical" margins="sm" />

                        <div className={style.PriceUnid} >
                           <h5>Por Mes</h5>
                           <p>${(product.prices.priceMoth)}</p>
                        </div>
                     </Group>
                  </div>

                  <ImagesAll images ={product.images}/>


                  <Amenidades id = {product.id} AmenidadesL = {product.amenidades}/>
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