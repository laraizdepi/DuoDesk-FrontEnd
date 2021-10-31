import Test from "../../components/test"
import ViewOffice from "../../components/ViewOffice/ViewOffice"
import Navbar from "../../components/NavBar/Navbar"
import { useRouter } from "next/dist/client/router"
import React from "react"
import Head from "next/head"

export const getStaticProps = async (context: { params: { id: any; }; }) =>{
    const id = context.params.id
    const res = await fetch(`http://localhost:5000/offices/${id}`)
    const data = await res.json()
    return{
        props : {oficina:data}
    }
}

const Details = ({oficina}) => {
    return (
        <div>
            <Head>
                <title>DuoDesk:{oficina.name}</title>
            </Head>
            <Navbar stick  = {''}/>
            <ViewOffice office = {oficina}/>
        </div>
    )
}
export default Details
