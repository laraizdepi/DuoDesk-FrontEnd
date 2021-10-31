import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import UpdateSteps from '../../../components/UpdateOffice/UpdateSteps'

interface Office {
    id: any,
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
        isActive: boolean,
        bookings?: {
            idHost: any,
            idUser: any,
            idOffice: any,
            idTransaction?: string,
            startDate: string,
            endDate: string,
            people: number,
            priceSubtotal: number,
            priceTotal: number,
            dateReservation: number | Date,
            state: string,
            isActive: boolean
        }[]
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

const editOffice = () => {
    const [office, setOffice] = useState<Office | undefined>(undefined)
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        const getOffice = async () => {
            if(router.query.id){
                const response = await axios.get(`http://localhost:5000/offices/${id}`)
                if(response.data){
                    setOffice(response.data)
                }
            }
        }
        getOffice()
    }, [id])

    if(!office){
        return (
            <div>
                Hello world
            </div>
        )
    }


    return (
        <div>
            <Head>
                <title>DuoDesk: Actualiza la información de la oficina</title>
            </Head>
            <UpdateSteps office={office}/>
        </div>
    )
}

export default editOffice
