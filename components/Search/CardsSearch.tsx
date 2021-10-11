import React, { FC, useState } from 'react'
import { Col, Grid } from '@mantine/core'
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

const CardsSearch: FC<{ offices: Offices[] }> = (props) => {
    const [ officeFocus, setOfficesFocus ] = useState<Offices | null>(null)

    const setMouseOver = (element: Offices) => {
        setOfficesFocus(element)
    }

    return (
        <div>
            <Grid id="cards-id">
                {props.offices.map((element, index) => {
                    return (
                        <Col span={12} md={6} key={element.name}>
                            <CardSearchBase
                                office={element} 
                                key={element.name} 
                                />
                        </Col>
                    )
                })}
            </Grid>
        </div>
    )
}

export default CardsSearch
