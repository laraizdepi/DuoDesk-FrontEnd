import { FC } from "react"
import style from './VIew.module.sass'
import TabsSpace from './tabsSpace'
import ChangeDates from './ChangeDates'

interface Offices {
    id: string,
    name: string,
    description: string,
    host: any,
    isActive: boolean,
    generalAmenities: string[]
    spaces: {
        nameSpace: string,
        typeSpace: string,
        capacitySpace: number,
        availableSpace: number,
        hourPrice: number,
        dayPrice: number,
        weekPrice: number,
        monthPrice: number,
        nameAmenities: string[],
        imagesUrls: string[],
        booking?: any
    }[],
    address: any,
    scores?: {
        averageScore: number,
        reviews: any
    },
    days: [{
        day: string,
        isAvailable: boolean,
        startHour?: string,
        endHour?: string
    }],
    notifications: string[],
    official: string[],
    openDate: string
}
const CardSpace: FC<{ office: Offices }> = (props) => {
    const office = props.office
    return (
        <div>
            <div className={style.titleEnterAme}>
                <h1>Espacios</h1>
            </div>
            <div>
                <ChangeDates />
            </div>
            <div>
                <TabsSpace office={office} />
            </div>
        </div>
    )
}
export default CardSpace