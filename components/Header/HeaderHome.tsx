import NavbarBoot from '../navbar/Navbar'
import { Col, Container, Row } from 'react-bootstrap';
import { TextInfo } from '../TextInfo/TextInfo';
import { Image } from '@mantine/core';
import headerImage  from '../../Img/home/headerTeamWork.svg'
import SearchImput from "../SearchImput/SearchImput"
import wave from "../../Img/home/wave.svg"
import styles from "./Header.module.sass"


const HeaderHome = () => {
    return (
        <div className = {styles.HeaderHome} style = {{backgroundImage: `url(${wave.src})`}}>
            <NavbarBoot/>
            <Container>
                <Row>
                    <Col md={6} xs={12} className = {styles.SearchBar}>
                        <TextInfo title="Encuentra Tu Espacio Ideal"
                        text = 'Aqui encontraras los mejores espacios de trabajo,que estas esperando, comienza a alquilar!'/>
                    <SearchImput/>
                    </Col>
                    <Col md={6} xs={12}>
                        <Image src={headerImage.src} />
                    </Col>

                </Row>
            </Container>
        </div>
    );
}

export default HeaderHome;