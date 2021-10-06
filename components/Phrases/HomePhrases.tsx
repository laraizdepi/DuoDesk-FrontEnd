import React from 'react'
import Image from 'next/image'
import { Row, Col, Container } from 'react-bootstrap'
import { MdPersonPin } from "react-icons/md";

import Phrase from "./BasePhrases";
import Leader from '../../Img/home/Leader.svg'
import science from '../../Img/home/science.svg'

import style from './Home.module.sass'

const AllPhrases = () => {
    return (
        <div>
            <div className={style.ImgLeft} style={{ backgroundColor: '#fff' }} >
                <Row style={{ margin: '2rem' }}>
                    <Col xs={5}>
                        <Phrase
                            items={[
                                { title: 'Titulo 1', value: 'libero id faucibus nisl tincidunt eget nullam non nisi est sit amet facilisis magna etiam' },
                                { title: 'Titulo 2', value: 'libero id faucibus nisl tincidunt eget nullam non nisi est sit amet facilisis magna etiam' },
                                { title: 'Titulo 3', value: 'libero id faucibus nisl tincidunt eget nullam non nisi est sit amet facilisis magna etiam' },
                            ]}
                            icon={<MdPersonPin color="#12b886" />}
                            color="teal"
                        />
                    </Col>
                    <Col xs={7} className={style.Image} >
                        <Image src={Leader.src} alt="" width={750}
                            height={750} />
                    </Col>
                </Row>
            </div>
            <div className={style.ImgRight} style={{ backgroundColor: '#f6f8fb' }} >
                <Row style={{ margin: '2rem' }}>
                    <Col xs={6} className={style.Image} >
                        <Image src={science.src} alt="" width={650}
                            height={750} />
                    </Col>
                    <Col xs={6}>
                        <Phrase
                            items={[
                                { title: 'Titulo 1', value: 'libero id faucibus nisl tincidunt eget nullam non nisi est sit amet facilisis magna etiam' },
                                { title: 'Titulo 2', value: 'libero id faucibus nisl tincidunt eget nullam non nisi est sit amet facilisis magna etiam' },
                                { title: 'Titulo 3', value: 'libero id faucibus nisl tincidunt eget nullam non nisi est sit amet facilisis magna etiam' },
                            ]}
                            color="indigo"
                            icon={<MdPersonPin color="#4C6EF5" />}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default AllPhrases