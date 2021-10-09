import React, { FC } from 'react'
import CardSearchBase from './CardSearchBase'

interface Offices {
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

const CardsSearch: FC<{offices: Offices[]}> = (props) => {
    return (
        <div>
            {props.offices.map((element) => {
                return(
                    <CardSearchBase office={element} key={element.name}/>
                )
            })}
        </div>
    )
}

export default CardsSearch
