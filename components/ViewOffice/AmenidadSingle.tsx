import { FC } from "react"

interface AmenidadSingle {
    title ?: string
    amenidadGroup : any[]
}

const AmenidadSingle:FC<AmenidadSingle> = (props) =>{
    const amenidadGroup = props.amenidadGroup
    const title = props.title
    return(
        <div>
            <h1>{title}</h1>
            {amenidadGroup.map((amenidad) =>{
                return(
                    <h3>{amenidad}</h3>
                )
            })}

        </div>
    )
}

export default AmenidadSingle