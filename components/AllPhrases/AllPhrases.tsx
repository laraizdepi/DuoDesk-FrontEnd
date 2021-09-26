import Phrase from "../Phrase/Phrases";
import Leader from '../../Img/home/Leader.svg'
import science from '../../Img/home/science.svg'
import payment from '../../Img/home/payment.svg'
import { Row, Col, Container } from 'react-bootstrap'
import style from './AllPhrases.module.sass'
import Image from 'next/image'
// import { Component } from "react";


const AllPhrases = () => {
    return (
        <div>
            {/* Phrase  Relaciones*/}

            <div className={style.ImgLeft} style={{ backgroundColor: '#edf1f8' }} >
                <Row>
                    <Col xs={5} className={style.Text} >
                        <Phrase 
                        title='Encuentra tu proximo' 
                        wordImp=' cofundador' 
                        color='#12b886' 
                        subtitle= 'lo importante de las relaciones '
                        />
                    </Col>
                    {/* Image  */}
                    <Col xs={7} className={style.Image} >
                        <Image src={Leader.src} alt="" width={750}
                            height={750} />
                    </Col>
                </Row>
            </div>

            {/* Phrase Explora */}

            <div className={style.ImgRight} style={{ backgroundColor: '#f6f8fb' }} >
                <Row>
                    {/* Image  */}
                    <Col xs={7} className={style.Image} >
                        <Image src={science.src} alt="" width={750}
                            height={750} />
                    </Col>
                    <Col xs={5} className={style.Text}>
                        <Phrase 
                        title='Trabaja donde quieras' 
                        wordImp='explora' 
                        color="#e64980"
                        subtitle= 'lo importante de la libertad'
                        />
                    </Col>
                </Row>
            </div>

            {/* Phrase Mas Economico */}

            <div className={style.ImgLeft} style={{ backgroundColor: '#edf1f8' }} >
                <Row>
                    <Col xs={5} className={style.Text}>
                        <Phrase 
                        title=' Mas economico' 
                        wordImp='no contratos' 
                        color='#4c6ef5'
                        subtitle= 'lo importante de la libertad'
                         />
                    </Col>
                    {/* Image  */}
                    <Col xs={7} className={style.Image}>
                        <Image src={payment.src} alt="" width={750}
                            height={750} />
                    </Col>
                </Row>
            </div>


        </div>
    )
}

export default AllPhrases