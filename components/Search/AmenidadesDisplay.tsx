import { FC } from "react"
import { Badge } from '@mantine/core';
interface AmenidadesProps {
  amenidades: string[]
  color?: string
}
const AmenidadesDisplay: FC<AmenidadesProps> = (props) => {
  const AllAmenidades = props.amenidades
  // console.log(AllAmenidades);
  let indexM = 0
  return (
    <div style={{
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {AllAmenidades.map((amenidad, indexM) => {
        indexM++
        return (
          < >
            <Badge variant="filled" color={props.color}>
              {amenidad}
            </Badge>
          </>
        )
      })}
    </div>

  )
}



export default AmenidadesDisplay