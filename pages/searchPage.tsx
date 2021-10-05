import Navbar from '../components/NavBar/Navbar'
import Search from '../components/Search/Search'
import { Container, Row, Col } from 'react-bootstrap'
import SearchVertical from '../components/Search/SearchVertical'
const SearchPage = () => {
    return (
        <div>
            <Navbar />
            <div style = {{marginLeft : 30}}>
                <Row>
                    <Col xs={12} md={6}>
                        <Row>
                            <Col><SearchVertical /></Col>
                            <Col><SearchVertical /></Col>
                        </Row>
                    </Col>
                    <Col style = {{backgroundColor : 'gray'}}>
                    
                    </Col>
                </Row>
            </div>

        </div>
    )
}

export default SearchPage