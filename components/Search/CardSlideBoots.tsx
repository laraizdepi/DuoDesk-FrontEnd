import { Container, Carousel } from "react-bootstrap"
import style from './Search.module.sass'
const CardSlideBoots = () => {
    return (
        <Container>
            <Carousel>
                <Carousel.Item className={style.CardSlice}>
                    <div className = {style.CardSlice}>
                        <h1>Hello bitch</h1>
                        <button>Hello bitch</button>
                    </div>
                </Carousel.Item>
                <Carousel.Item className={style.CardSlice}>
                    <div className={style.CardSlice}>
                        <h1>Hello Baby</h1>
                        <button>Hello Baby</button>
                    </div>
                </Carousel.Item>
                <Carousel.Item className={style.CardSlice}>
                    <div className={style.CardSlice}>
                        <h1>Hello Test</h1>
                        <button>Hello Test</button>
                    </div>
                </Carousel.Item>
            </Carousel>
        </Container>
    )
}

export default CardSlideBoots