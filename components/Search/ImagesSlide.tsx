import React, { FC, useState } from "react";
import { Carousel } from "react-bootstrap";

interface imagesProps {
  images: any[]
}

const ImagesSlide: FC<imagesProps> = (props) => {
  // const [index, setIndex] = useState(0);
  // const handleSelect = (selectedIndex: any, e: any) => {
  //   setIndex(selectedIndex);
  // };
  const imagesAll: any = props.images
  // const {images} = props.images
  return (
    <div>
      <Carousel style={{ maxWidth: 350 , maxHeight: 230, minHeight: 230 }} >
        {imagesAll.map((image: any, index : number) => {
          // console.log(image.src);
          return (
            <Carousel.Item key = {index}>
              <img
                className="d-block w-100"
                src={image.src}
                alt="First slide"
                // style={{ maxWidth: 350 , maxHeight: 230, minHeight: 230 }}
              />
            </Carousel.Item>
          )
        }
        )}
      </Carousel>
    </div>
  )
}

export default ImagesSlide