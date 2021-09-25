import React, { FC } from 'react';
import { Container, List, Title } from '@mantine/core';
import Item from '@mantine/core'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'

import style from './Phrase.module.sass'
interface PhraseProps {
    wordImp?: string
    title?: string
    img?: string
}

const Phrase: FC<PhraseProps> = (props) => {
    return (
        <div >
            <Row >
                <Col xs = {6} className = {style.List} >
                    <h1> {style.title}</h1>

                    <List size="lg">
                        <List.Item>Clone or download repository from GitHub</List.Item>
                        <List.Item>Install dependencies with yarn</List.Item>
                        <List.Item>To start development server run npm start command</List.Item>
                        <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                        <List.Item>Submit a pull request once you are done</List.Item>
                    </List>
                </Col>
                <Col xs = {6} >
                    <img src={props.img} alt="" />
                </Col>
            </Row>
        </div>
    )
}



export default Phrase