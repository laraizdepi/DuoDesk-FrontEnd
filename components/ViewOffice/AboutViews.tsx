import { Typography } from "@mui/material"
import React, { FC } from "react"
import style from './View.module.sass'
// import GoLocation from 'react-icons/go'
import GrLocation from 'react-icons/gr'
interface AboutProps {
  office: any[]
}

const AboutViews: FC<AboutProps> = (props) => {
  const office = props.office
  return (
    <div>
      {/* <h1>{office.name}</h1> */}

      <Typography variant="h3" component="h2">
        {office.name}
      </Typography>

      <Typography variant="body1" >
        {office.description}
      </Typography>
      
      {/* <div>
        <GrLocation />
      </div> */}
      
      <Typography variant="body1" >
        {office.address.formatted_address}
      </Typography>

    </div>


  )
}

export default AboutViews