import React, { FC, useState } from "react";
import { Carousel } from "react-bootstrap";

interface imagesProps {
  images: any[]
}

const ImagesSlide: FC<imagesProps> = (props) => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex: any, e: any) => {
    setIndex(selectedIndex);
  };
  const imagesAll: any = props.images
  // const {images} = props.images
  return (
    <div>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {imagesAll.map((image: any) => {
          console.log(image.src);
          return (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={image.src}
                alt="First slide"
                style={{ maxWidth: 350 , maxHeight: 230, minHeight: 230 }}
              />
            </Carousel.Item>
          )
        }
        )}
      </Carousel>
    </div>

    // <Carousel activeIndex={index} onSelect={handleSelect}>
    //    <Carousel.Item>
    //       <img
    //          className="d-block w-100"
    //          src="http://muchosnegociosrentables.com/wp-content/uploads/2021/05/coworking.jpg"
    //          alt="First slide"
    //          style={{ maxWidth: 350, maxHeight: 300 }}
    //       />

    //    </Carousel.Item>
    //    <Carousel.Item>
    //       <img
    //          className="d-block w-100"
    //          src="https://www.zaplo.es/blog/wp-content/uploads/2019/07/coworking.jpeg"
    //          alt="Second slide"
    //          style={{ maxWidth: 350, maxHeight: 300 }}
    //       />

    //    </Carousel.Item>
    //    <Carousel.Item>
    //       <img
    //          className="d-block w-100"
    //          src="http://muchosnegociosrentables.com/wp-content/uploads/2021/05/coworking.jpg"
    //          alt="Third slide"
    //          style={{ maxWidth: 350, maxHeight: 300 }}

    //       />
    //    </Carousel.Item>
    // </Carousel>
  )
}

export default ImagesSlide