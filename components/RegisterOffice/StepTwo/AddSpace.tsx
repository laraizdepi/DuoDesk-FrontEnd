import { Input } from '@mantine/core';
import UploadImages from '../UploadImages/UploadImages';
import { Container } from 'react-bootstrap';
import FormTwo from './FormTwo';
import style from "./stepTwo.module.sass"

const AddSpace = () => {
    return (
        <Container className = {style.AddSpace}>
            <FormTwo/>
            <UploadImages />
        </Container>
    )
}

export default AddSpace