import { Container, Row, Col } from 'react-bootstrap'
import PreviewTwo from './PreviewTwo'
import AddSpace from './AddSpace'
import style from "./stepTwo.module.sass"


const StepTwo = () => {
    return (
        <div className = {style.StepTwo}>
            <Container>
                <Row>
                    <Col xs={12} md={6}>
                        <PreviewTwo />
                    </Col>

                    <Col xs={12} md={6}>
                        <AddSpace />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default StepTwo