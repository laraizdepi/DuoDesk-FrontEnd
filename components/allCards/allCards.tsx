import react from 'react'
import Cards from '../Cards/Cards'
import { Col, Container, Row } from 'react-bootstrap';
import meetingRoom from '../../Img/home/Business-Meeting.svg'
import office from '../../Img/home/officePersonalCopy.svg'
import coworking from '../../Img/home/coworkin.svg'

const AllCards = () => {
    return (
        // <div style = {{backgroundColor: '#f6f8fb'}} >
        <div style = {{backgroundColor: '#f6f8fb'}}>
            {/* <div style = {{marginLeft: '60px', marginRight: '60px'}}> */}
            {/* <div style={{marginTop: '60px', marginBottom: '60px'}}> */}
            <Container style={{paddingTop: '60px', paddingBottom: '60px'}}>
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
            {/* </div> */}
        </div>
    )
}

export default AllCards