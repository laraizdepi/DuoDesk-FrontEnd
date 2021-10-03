import { FC } from "react"
import { Badge } from "@mantine/core"
import style from "./stepTwo.module.sass"

interface AmenidadesProps {
    color: string,
    AmenidadesL: string[]
}
const Amenidades: FC<AmenidadesProps> = (props) => {
    const allAmenidades = props.AmenidadesL.sort((a: string, b: string) => {
        if (a.length < b.length) {
            return -1
        }
        if (a.length > b.length) {
            return 1
        }
        else {
            return 0
        }
    })
    if (!allAmenidades) {
        return (
            <div>
                <Badge
                    color={props.color}
                    variant="filled"
                    size="md"
                    radius='md'
                    className={style.Badge}
                >
                    No escogiste amenidades
                </Badge>
            </div>
        )
    }
    return (
        <div>
            {allAmenidades.map((amenidad: any) => {
                return (
                    <Badge
                        color={props.color}
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