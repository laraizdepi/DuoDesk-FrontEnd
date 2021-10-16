import { FC } from "react"
import CardSearchBaseTest from "./CardSearchBaseTest"
import style from './VIew.module.sass'
interface CardsProps {
    office: any[]
}
const CardSpace: FC<CardsProps> = (props) => {
    return (
        <div>
            <div className={style.titleEnterAme}>
                <h1>Espacios</h1>
            </div>
            <CardSearchBaseTest office={props.office} />
        </div>
    )
}
export default CardSpace