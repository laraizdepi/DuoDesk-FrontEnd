import React, { FC, useEffect, useImperativeHandle, useState } from 'react'
import { Center, Col, Grid, Pagination, LoadingOverlay } from '@mantine/core'
import CardSearchBase from './CardSearchBase'

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

const CardsSearch: FC<{ offices: Offices[], ref: any }> = React.forwardRef((props, ref) => {
    return (
        <div style={{ position: 'relative' }}>
            <div>
                <Grid id="cards-id">
                    {props.offices.map((element, index) => {
                        if (element.spaces.length > 0) {
                            return (
                                <Col span={12} md={6} key={element.name}>
                                    <CardSearchBase
                                        office={element}
                                        key={element.name}
                                    />
                                </Col>
                            )
                        }
                    })}
                </Grid>
            </div>
        </div>
    )
})

export default CardsSearch
