import { Text, Title } from "@mantine/core";
import { Container } from "react-bootstrap";
import {FC} from 'react'
interface navbar{title:string, text:string}
import  Styles from './styles.module.sass';


export const TextInfo:FC<navbar> = (props) => {
    return (  
        <div className = {Styles.TextTemplate}>
            <Container >
                <div>
                    <Title className = {Styles.Title} order = {1}>{props.title}</Title>
                </div>
                    <Text className = {Styles.Text} size = 'xl' >{props.text}</Text>
            </Container>
        </div>
    );
}
 
