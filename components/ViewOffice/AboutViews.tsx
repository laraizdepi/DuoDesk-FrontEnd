import React, { FC } from "react"
import style from './VIew.module.sass'
import { GoLocation } from 'react-icons/go'
import NavbarSectionMateria from './NavbarSectionMateria'
import { useWindowScroll } from '@mantine/hooks';

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
      <h1 className={style.titleAbout}>
        {office.name}
      </h1>

      <div className={style.direction} >
        <GoLocation color='#E64980' />
        {office.address.formatted_address}.&nbsp;
        <p style={{ color: '#12B886', cursor: 'pointer' }} onClick={() => scrollTo({ y: 10000 })} > Mapa</p>
        {/* <a href="#map">MAPSS</a> */}
      </div>

      <div>
        <NavbarSectionMateria />
      </div>
      <div className={style.description}>
        <p>{office.description}</p>
      </div>
      

    </div >


  )
}

export default AboutViews