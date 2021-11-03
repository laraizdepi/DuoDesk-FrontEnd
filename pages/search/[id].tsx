import ViewOffice from "../../components/ViewOffice/ViewOffice"
import Navbar from "../../components/NavBar/Navbar"
import React, { FC } from "react"
import Head from "next/head"
import { GetStaticPaths } from "next"

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




export const getStaticPaths = async () => {

    // return {
    //     paths: [], //indicates that no page needs be created at build time
    //     fallback: 'blocking' //indicates the type of fallback
    // }
    // const id = context.params.id
    const res = await fetch(`http://localhost:5000/offices/`)
    const data = await res.json()

    const paths = data.map((office) => {
        return {
            params: { id: office.id.toString() }
        }
    })
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context: { params: { id: any; }; }) => {
    // export const getStaticProps = async () => {
    const id = context.params.id
    const res = await fetch(`http://localhost:5000/offices/${id}`)
    const data = await res.json()
    return {
        props: { oficina: data }
    }
}



const Details: FC<{ oficina: Office }> = (props) => {
    const { oficina } = props
    return (
        <div>
            <Head>
                <title>DuoDesk:{oficina.name}</title>
            </Head>
            <Navbar stick={''}>
                <ViewOffice office={oficina} />
            </Navbar>
        </div>
    )
}
export default Details
