import { FC } from "react"
import { Badge } from "@mantine/core"
import style from "./stepTwo.module.sass"

interface AmenidadesProps {
    color?: string,
    AmenidadesL: string[]
}
const Amenidades: FC<AmenidadesProps> = (props) => {
    const allAmenidades = props.AmenidadesL
    return (
        <div>
            {allAmenidades.map((amenidad: any) => {
                return (
                    <Badge
                        color="pink"
                        variant="filled"
                        size="md"
                        radius='md'
                        className={style.Badge}>
                        {amenidad}
                    </Badge>
                )
            }
            )}
        </div>
    )
}
export default Amenidades