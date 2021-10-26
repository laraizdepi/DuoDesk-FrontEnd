import React, { FC } from "react"
import style from './VIew.module.sass'
import { GoLocation } from 'react-icons/go'
import NavbarSectionMateria from './NavbarSectionMateria'
import { useWindowScroll } from '@mantine/hooks';
import { Container, Row, Col } from 'react-bootstrap'
import Schedule from './Schedule'
import { BsHeartFill } from 'react-icons/bs'
import { BsHeart } from 'react-icons/bs'
import { BsStar } from 'react-icons/bs'
interface Offices {
  id: string,
  name: string,
  description: string,
  host: any,
  isActive: boolean,
  generalAmenities: string[]
  spaces: {
    nameSpace: string,
    typeSpace: string,
    capacitySpace: number,
    availableSpace: number,
    hourPrice: number,
    dayPrice: number,
    weekPrice: number,
    monthPrice: number,
    nameAmenities: string[],
    imagesUrls: string[],
    booking?: any
  }[],
  address: any,
  scores?: {
    averageScore: number,
    reviews: any
  },
  days: [{
    day: string,
    isAvailable: boolean,
    startHour?: string,
    endHour?: string
  }],
  notifications: string[],
  official: string[],
  openDate: string
}
const AboutViews: FC<{ office: Offices }> = (props) => {
  const office = props.office
  const [scroll, scrollTo] = useWindowScroll();

  const onclick = () => {
    scrollTo({ y: 10000 })
  }

  return (
    <div style={{ width: '90%', marginLeft: '50px' }}>
      <Row className={style.TitleComplete} style={{ display: 'flex', }}>
        <Col md={10}>
          <h1 className={style.titleAbout}>
            {office.name}
          </h1>
        </Col>
        <Col md={2}>
          <Row style={{ display: 'flex', }}>
            <Col md={3} style = {{paddingRight : '0px'}}>
              <p style = {{fontSize : '28px', marginTop : '25px', paddingLeft : '0px'}}>
                <BsStar />
              </p>
            </Col>
            <Col style = {{margin : '0px'}}>
              <h1 style = {{margin : '0px', marginTop : '9px', fontSize : '28px',padding : '0px'}}>
                4.5
              </h1>
            </Col>
            <Col>
              <h1 style = {{fontSize : '28px', marginTop : '27px', paddingLeft : '0px'}}>
                <BsHeartFill />
              </h1>
            </Col>
          </Row>
          {/* <h1>
            <BsHeartFill />
          </h1> */}
        </Col>

      </Row>

      <div className={style.direction} >
        <GoLocation color='#E64980' />
        {office.address.formatted_address}.&nbsp;
        <p style={{ color: '#12B886', cursor: 'pointer' }} onClick={() => scrollTo({ y: 10000 })} > Mapa</p>
        {/* <a href="#map">MAPSS</a> */}
      </div>

      {/* <div>
        <NavbarSectionMateria />
      </div> */}

      <Row>
        <Col xs={12} md={9} style = {{position: 'sticky', top: '0'}}>
          <NavbarSectionMateria />
          <div className={style.description}>
            <p>{office.description}</p>
          </div>
        </Col>
        <Col xs={12} md={3}>
          <div className={style.ScheduleIn}>
            <Schedule office={office} />
          </div>
        </Col>
      </Row>
      {/* 
      <div className={style.description}>
        <p>{office.description}</p>
      </div> */}

    </div >


  )
}

export default AboutViews