import Navbar from '../components/NavBar/Navbar'
import Search from '../components/Search/Search'
import { Container, Row, Col } from 'react-bootstrap'
import SearchVertical from '../components/Search/SearchVertical'
import CardChange from '../components/Search/CardChange'
import CardSlideBoots from '../components/Search/CardSlideBoots'
const SearchPage = () => {
    return (
        <div>
            <Navbar />
            <div style = {{marginLeft : 30}}>
                <Row>
                    <Col xs={12} md={6}>
                        <Row>
                            {/* <Col><SearchVertical /></Col>
                            <Col><SearchVertical /></Col> */}
                            <Col> <CardChange/> </Col>
                            {/* <Col> <CardChange/> </Col> */}
                        </Row>
                    </Col>
                    <Col xs = {6}>
                            <CardSlideBoots/>
                    </Col>
                </Row>
            </div>

        </div>
    )
}

export default SearchPage