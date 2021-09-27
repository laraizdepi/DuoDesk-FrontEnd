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
    backgroundColor?: string
    color: string
    component?: React.ReactNode
    subtitle?: string
}

const Phrase: FC<PhraseProps> = (props) => {

    const colorD = props.color
    return (
        <div className={style.List}>
            <div style={{ marginTop: 250 }} >
                <div>
                    <h2 className={style.Title}>
                        {props.title}&nbsp;<strong
                            style={{ color: colorD }}
                        >
                        {props.wordImp}
                        </strong>
                    </h2>
                    <h2 className={style.Subtitle} style={{ fontSize: '1.5rem'}} >
                        {props.subtitle}
                    </h2>
                </div>
                <Container className={style.ListInfo} >
                    <List size="lg" styles={{
                        root: { color: 'red', fontFamily: 'Roboto', fontSize: '1.125rem' },
                        itemWrapper: { color: 'black' },
                        item: { color: props.color },
                    }}>
                        <List.Item>Clone or download repository from GitHub</List.Item>
                        <List.Item>Install dependencies with yarn</List.Item>
                        <List.Item>To start development server run npm start command</List.Item>
                        <List.Item>Run tests to make sure your changes do not break the build</List.Item>
                        <List.Item>Submit a pull request once you are done</List.Item>
                    </List>
                </Container>

            </div>
        </div>
    )
}



export default Phrase