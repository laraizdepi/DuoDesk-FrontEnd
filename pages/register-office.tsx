import NavbarBoot from "../components/navbar/Navbar";
// import { Steps, ButtonGroup, Panel, Button } from 'rsuite';
import React from "react";
import RegisterSteps from '../components/RegisterOffice/RegisterSteps'

import { Container } from "react-bootstrap";

const RegisterOffice = () => {
    return (
        <div>
            <NavbarBoot />
            <Container>
                <RegisterSteps/>
            </Container>
        </div>


    )
}

export default RegisterOffice