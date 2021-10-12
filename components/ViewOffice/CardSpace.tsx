import { FC } from "react"
import CardSearchBase from "./CardSearchBase"

interface CardsProps {
    office : any[]
}
const CardSpace:FC<CardsProps> = (props) =>{
    return(
        <div>
            <h1>Espacios</h1>
            <CardSearchBase office = {props.office}/>

        </div>
    )
}
export default CardSpace