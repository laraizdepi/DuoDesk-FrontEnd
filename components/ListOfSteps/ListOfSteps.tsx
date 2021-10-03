import { List } from '@mantine/core';
import { Container, Row, Col } from 'react-bootstrap'
import style from './ListSteps.module.sass'

const ListOfSteps = () => {
    return (
        <div>
            <Container>
                <List withPadding>
                    <List.Item><h1>1. Busca tu oficina</h1></List.Item>
                    <List.Item>Install dependencies with yarn</List.Item>
                    <List.Item>To start development server run npm start command</List.Item>

                </List>
            </Container>

            <Container className = {style.ListPoint}>
                <h1>1. Busca tu oficinas</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius neque, sunt quisquam aliquam repellendus doloribus</p>
            </Container>
            <Container className = {style.ListPoint}>
                <h1>2. Reserva tu espacio ideal</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius neque, sunt quisquam aliquam repellendus doloribus</p>
            </Container>
            <Container className = {style.ListPoint}>
                <h1>3. Disfruta tu espacio</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius neque, sunt quisquam aliquam repellendus doloribus</p>
            </Container>
        </div>
    )
}

export default ListOfSteps