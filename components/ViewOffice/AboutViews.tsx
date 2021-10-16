import { Typography } from "@mui/material"
import React, { FC } from "react"
import style from './VIew.module.sass'
import { MdCoffeeMaker } from 'react-icons/md'
import GrLocation from 'react-icons/gr'
import { GoLocation } from 'react-icons/go'
import ListItemIcon from '@mui/material/ListItemIcon';
import OfficeMap from '../Maps/OfficeMap'
interface AboutProps {
  office: any[]
}

const AboutViews: FC<AboutProps> = (props) => {
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

      <div>
        <h1 className={style.titleAbout}>
          Ubicacion de la oficina
        </h1>
        <OfficeMap office={office} />
      </div>
    </div >


  )
}

export default AboutViews