import NavbarBoot from '../components/NavBar/Navbar'
import React from "react";
import RegisterSteps from '../components/RegisterOffice/RegisterSteps'
import { Container } from "react-bootstrap";
import Head from "next/head";

const RegisterOffice = () => {
    return (

        <div>
            <Head>
                <title>New Office</title>
            </Head>
            <NavbarBoot />
            <Container>
                <RegisterSteps />
            </Container>
        </div>
    )
}

export default RegisterOffice