import React, { FC } from "react"
import OfficeMap from '../Maps/OfficeMap'
import style from './VIew.module.sass'

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

const Maps: FC<{ office: Offices }> = (props) => {
    const office = props.office

    return (
        <div id = 'map' style={{ width: '90%', marginLeft: '50px' }}>
            <h1 className={style.titleEnterAme}>
                Ubicacion de la oficina
            </h1>
            <OfficeMap office={office} />
        </div>
    )
}

export default Maps