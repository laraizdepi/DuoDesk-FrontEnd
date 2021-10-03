import ListOfSteps from "./ListOfSteps";
import { Container, Row, Col } from 'react-bootstrap'
import science from '../../Img/home/science.svg'
const ListWithSvg = () => {
    return (
        <Container>
            <Row>
                <ListOfSteps />
            </Row>
            <Row>

                {/* <img src={science.src} alt="" /> */}

            </Row>
        </Container>

    )
}

export default ListWithSvg