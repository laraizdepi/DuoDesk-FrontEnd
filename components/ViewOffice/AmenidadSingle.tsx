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
        <List>
          <List.Item>No hay amenidades en esta categoria</List.Item>
        </List>
      </div>
    )
  } else {
    return (
      <Col id='amenidades'>
        <h3 className={style.titleAmenidad}>{title}</h3>
        <List className={style.amenidadList}>
          {amenidadGroup.map((amenidad) => {
            return (
              <List.Item>
                <p>{amenidad}</p>
                {/* {amenidad} */}
              </List.Item>
            )
          })}
        </List>
      </Col>
    )
  }


}

export default AmenidadSingle