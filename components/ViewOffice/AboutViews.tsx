import { Typography } from "@mui/material"
import React, { FC } from "react"
import style from './VIew.module.sass'
import { MdCoffeeMaker } from 'react-icons/md'
import GrLocation from 'react-icons/gr'
import { GoLocation } from 'react-icons/go'
import ListItemIcon from '@mui/material/ListItemIcon';
import OfficeMap from '../Maps/OfficeMap'
import { useRouter } from "next/dist/client/router"

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
  return (
    <div style={{ width: '90%', marginLeft: '50px' }}>
      <h1 className={style.titleAbout}>
        {office.name}
      </h1>

      <div className={style.direction}>
        <GoLocation color='#E64980' />
        {office.address.formatted_address}
      </div>

      <div className={style.description}>
        <p>{office.description}</p>
      </div>

      <div >
        <h1 className={style.titleAbout}>
          Ubicacion de la oficina
        </h1>
        <OfficeMap office={office} />
      </div>
    </div >


  )
}

export default AboutViews