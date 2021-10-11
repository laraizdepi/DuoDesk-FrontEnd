import { FC } from "react"
import { Carousel, Col, Row } from 'react-bootstrap'
import { Image } from 'primereact/image';

interface TestProps {
  office: any[]
}

const ViewOffice: FC<TestProps> = (props) => {
  const office = props.office
  return (
    <div>
      <h1>{office.name}</h1>
      <Carousel>
        <Carousel.Item>
          <Image
            className="d-block w-100"
            src="https://www.coworker.com/mag/wp-content/uploads/2019/12/Potential-Feature-Image-2-1280x640.png"
            alt="Second slide"
            preview
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="d-block w-100"
            src="https://www.zaplo.es/blog/wp-content/uploads/2019/07/coworking.jpeg"
            alt="Second slide"
            preview
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="d-block w-100"
            src="https://www.aden.org/files/sites/9/2018/07/Coworking.png"
            alt="Third slide"
            preview
          />
        </Carousel.Item>
      </Carousel>
      <Image
            className="d-block w-100"
            src="https://www.aden.org/files/sites/9/2018/07/Coworking.png"
            alt="Third slide"
            preview
          />
    </div>
  )
}

export default ViewOffice