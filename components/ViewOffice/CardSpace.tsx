import { FC } from "react"
import CardSearchBaseTest from "./CardSearchBaseTest"
import style from './VIew.module.sass'
import TabsSpace from './tabsSpace'
import ChangeDates from './ChangeDates'
import {useRouter} from 'next/router'

interface CardsProps {
    office: any[]
}
const CardSpace: FC<CardsProps> = (props) => {
    const office = props.office
    return (
        <div>
            <div className={style.titleEnterAme}>
                <h1>Espacios</h1>
            </div>
            <div>
            <ChangeDates url = 'dsa'/>
            </div>
            <div>
                <TabsSpace office = {office}/>
            </div>
            {/* <CardSearchBaseTest office={props.office} /> */}
        </div>
    )
}
export default CardSpace