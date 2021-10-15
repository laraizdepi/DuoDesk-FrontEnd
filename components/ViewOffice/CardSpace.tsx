import { FC } from "react"
import CardSearchBaseTest from "./CardSearchBaseTest"

interface CardsProps {
    office : any[]
}
const CardSpace:FC<CardsProps> = (props) =>{
    return(
        <div>
            <h1>Espacios</h1>
            <CardSearchBaseTest office = {props.office}/>

        </div>
    )
}
export default CardSpace