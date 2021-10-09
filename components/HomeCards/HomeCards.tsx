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
        <div style={{ backgroundColor: '#f6f8fb' }}>
            <Container style={{ paddingTop: '60px', paddingBottom: '60px' }}>
                <Container style={{marginBottom: '2rem'}}>
                    <Title>Multiples servicios para tu comodidad</Title>
                </Container>
                <Row>
                    <Col xs="12" md="4">
                        <Cards
                            title='Sala De Presentacion'
                            text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed vulputate odio ut enim blandit volutpat maecenas. Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo.'
                            img={meetingRoom.src}
                            color='pink' />
                    </Col>
                    <Col xs="12" md="4">
                        <Cards
                            title='Oficina Privada Persona'
                            text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed vulputate odio ut enim blandit volutpat maecenas. Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo.'
                            img={office.src}
                            color='teal' />
                    </Col>
                    <Col xs="12" md="4">
                        <Cards
                            title='Espacio de coworking'
                            text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed vulputate odio ut enim blandit volutpat maecenas. Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo.'
                            img={coworking.src}
                            color='indigo' />
                    </Col>
                </Row>
            </Container>
            {/* </div> */}
        </div>
    )
}

export default AllCards