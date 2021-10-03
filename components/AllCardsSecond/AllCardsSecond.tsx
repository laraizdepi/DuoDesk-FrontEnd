import { Container, Row, Col } from "react-bootstrap"
import CardSecond from "../CardSecond/CardSecond"
import styles from "./allcards.module.sass"
import icon1 from '../../Img/home/icon1.svg'


const AllCardsSecond = () => {
    return (
        <div className = {styles.All} >

        <Container >
            <Row className = {styles.Row} >
                <Col xs = {4}>
                    <CardSecond title = 'Oficina' iconUrl = {icon1.src} text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eos adipisci vitae incidunt numquam dolores labore error unde pariatur reprehenderit'/>
                </Col>
                <Col xs ={4}>
                    <CardSecond title = 'Oficina 2' iconUrl = {icon1.src} text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eos adipisci vitae incidunt numquam dolores labore error unde pariatur reprehenderit'/>
                </Col>
                <Col xs = {4}>
                    <CardSecond title = 'Oficina 3' iconUrl = {icon1.src} text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eos adipisci vitae incidunt numquam dolores labore error unde pariatur reprehenderit'/>
                </Col>
            </Row>
        </Container>
        </div>
    )
}
export default AllCardsSecond
