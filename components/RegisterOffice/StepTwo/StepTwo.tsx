import { Container, Row, Col } from 'react-bootstrap'
import AddSpace from './AddSpace'
import { ScrollPanel } from 'primereact/scrollpanel';

const StepTwo = () => {
    return (
        <div>
            <Container>
                <Row>
                    <Col xs={12} md={6}>
                    </Col>
                    <Col xs={12} md={6}>
                    <ScrollPanel style={{width: '100%', height: '853px'}}>
                        <AddSpace />
                    </ScrollPanel>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default StepTwo