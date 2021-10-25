import react from 'react'
import Cards from './BaseCards'
import { Col, Container, Row } from 'react-bootstrap';
import { Title } from '@mantine/core'
import meetingRoom from '../../Img/home/Business-Meeting.svg'
import office from '../../Img/home/officePersonalCopy.svg'
import coworking from '../../Img/home/coworkin.svg'

const AllCards = () => {
    return (
        // <div style = {{backgroundColor: '#f6f8fb'}} >
        <div className='my-3 p-5' style={{ backgroundColor: '#f6f8fb' }}>
            <div className="my-3">
                <Title className="mb-15">Multiples servicios para tu comodidad</Title>
            </div>
            <Row className="mt-5">
                <Col xs="12" md="4">
                    <Cards
                        title='Sala De Presentacion'
                        text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed vulputate odio ut enim blandit volutpat maecenas. Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo.'
                        img={meetingRoom.src}
                    />
                </Col>
                <Col xs="12" md="4">
                    <Cards
                        title='Oficina Privada Persona'
                        text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed vulputate odio ut enim blandit volutpat maecenas. Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo.'
                        img={office.src}
                    />
                </Col>
                <Col xs="12" md="4">
                    <Cards
                        title='Espacio de coworking'
                        text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed vulputate odio ut enim blandit volutpat maecenas. Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo.'
                        img={coworking.src}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default AllCards