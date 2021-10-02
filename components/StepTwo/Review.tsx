const productTemplate: React.FC = (product: any) => {
   return (
      <div className="productItem">
         <div className="productItemContent">
            <span >
               {product.description}
            </span>
            <div>
               <h4 className="p-mb-1">{product.title}</h4>
               <h6 className="p-mt-0 p-mb-3">
                  Precio por hora {JSON.stringify(product.prices.priceHour)}
               </h6>
               <h6 className="p-mt-0 p-mb-3">
                  Precio por day {JSON.stringify(product.prices.priceDay)}
               </h6>
               <h6 className="p-mt-0 p-mb-3">
                  Precio por semana {JSON.stringify(product.prices.priceWeek)}
               </h6>
               <h6 className="p-mt-0 p-mb-3">
                  Precio por mes {JSON.stringify(product.prices.priceMoth)}
               </h6>
               {/* <h6 className="p-mt-0 p-mb-3">${product.prices.priceHour}</h6> */}
               <div>
                  <h1>Cantidad {product.quantity}</h1>
               </div>
               <div>Precio Por Hora: {product.price}</div>
            </div>
         </div>
      </div>
   );
};


export default productTemplate