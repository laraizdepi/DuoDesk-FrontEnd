import { FC } from "react"
import { Container, Row, Col } from 'react-bootstrap'
import style from './VIew.module.sass'
import { List } from '@mantine/core';
interface AmenidadSingle {
  title?: string
  amenidadGroup: any[]
}

const AmenidadSingle: FC<AmenidadSingle> = (props) => {
  const amenidadGroup = props.amenidadGroup
  const title = props.title

  if (amenidadGroup.length == 0) {
    return (
      <div>
        <h3 className={style.titleAmenidad}>{title}</h3>
        <h3>No hay amenidades en esta categoria</h3>
        <List>
              {/* <List.Item>No hay amenidades en esta categoria</List.Item> */}
              <h3>No hay amenidades en esta categoria}</h3>
            </List>
      </div>
    )
  } else {
    return (
      <Col>
        <h3 className={style.titleAmenidad}>{title}</h3>
        {/* <Col> */}
        {amenidadGroup.map((amenidad) => {
          return (
            <List>
              <List.Item>{amenidad}</List.Item>
              <h3>{amenidad}</h3>
            </List>
          )
        })}

        {/* </Col> */}
      </Col>
    )
  }


}

export default AmenidadSingle