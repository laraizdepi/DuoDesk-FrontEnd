import { Typography } from "@mui/material"
import React, { FC } from "react"
import style from './VIew.module.sass'
import { MdCoffeeMaker } from 'react-icons/md'
import GrLocation from 'react-icons/gr'
import { GoLocation } from 'react-icons/go'
import ListItemIcon from '@mui/material/ListItemIcon';
interface AboutProps {
  office: any[]
}

const AboutViews: FC<AboutProps> = (props) => {
  const office = props.office
  return (
    <div>
      <h1 className={style.titleAbout}>
        {office.name}
      </h1>

      <div className = {style.direction}>
        <GoLocation  color = '#E64980'/>
        {office.address.formatted_address}
      </div>

      {/* <Typography variant="body1" style={{ marginRight: '100px' }}>
        {office.description}
      </Typography> */}
      <div className= {style.description}>
        <p>{office.description}</p>
      </div>
    </div >


  )
}

export default AboutViews