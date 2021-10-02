import { Badge } from "@mantine/core"
import { FC, useState, useEffect } from "react"
import { string } from "yup/lib/locale"
import style from "./stepTwo.module.sass"
import axios from 'axios'

interface AmenidadesProps {
    color?: string,
    AmenidadesL?: string[] | []
}
const Amenidades: FC<AmenidadesProps> = (props) => {
    const allAmenidades = props.AmenidadesL
    return (
        <div>
            {allAmenidades.map((amenidad: any) => {
                console.log(amenidad);
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