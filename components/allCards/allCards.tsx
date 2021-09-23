import react from 'react'
import Cards from '../Cards/Cards'
import { Col, Container, Row } from 'react-bootstrap';
import meetingRoom from '../../Img/home/Business-Meeting.svg'
import office from '../../Img/home/officePersonalCopy.svg'
import coworking from '../../Img/home/coworkin.svg'

const AllCards = () => {
    return (
        <div>
            <Container style={{marginTop: '60px', marginBottom: '60px'}}>
                <Row>
                    <Col>
                        <Cards title='Sala De Presentacion' text='las mejoras salas de reuniones' img={meetingRoom.src} color= 'pink' />
                    </Col>
                    <Col>
                        <Cards title='Oficina Privada Persona' text='las mejores oficinas privadas' img={office.src} color='teal' />
                    </Col>
                    <Col>
                        <Cards title='Espacio de coworking' text='las mejores sitios de coworking' img={coworking.src} color='indigo' />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AllCards