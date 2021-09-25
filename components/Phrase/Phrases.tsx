import React, { FC } from 'react';
import { Container, List, Title } from '@mantine/core';
import Item from '@mantine/core'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
// import React from 'react';
import style from './Phrase.module.sass'
interface PhraseProps {
    wordImp?: string
    title?: string
    img?: string
    backgroundColor ?: string
    color: string
    component ?: React.ReactNode
}

const Phrase: FC<PhraseProps> = (props) => {

    const colorD = props.color
    // style = {{backgroundColor : {props.color}}}
    return (
        <div>
            <Row >
                <Col xs={6} className={style.List}>
                    <div >
                        <h1 className={style.Title}  >{props.title} <h1 className={style.WordImp} style ={{color: colorD}} >{props.wordImp} </h1> </h1>
                        <h1 className={style.WordImp} style ={{color: colorD}} >{props.wordImp} </h1> 
                        <Container>
                            <List size="lg" >
                                <List.Item>Clone or download repository from GitHub</List.Item>
                                <List.Item>Install dependencies with yarn</List.Item>
                                <List.Item>To start development server run npm start command</List.Item>
                                <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                                <List.Item>Submit a pull request once you are done</List.Item>
                            </List>
                        </Container>
                        {props.component}
                    </div>
                </Col>
                <Col xs={6} >
                    <img src={props.img} alt="" />
                </Col>
            </Row>
        </div>
    )
}



export default Phrase