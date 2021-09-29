import { Input } from '@mantine/core';
import UploadImages from '../UploadImages/UploadImages';
import FormTwo from './FormTwo';
import style from "./stepTwo.module.sass"

const AddSpace = () => {
    return (
        <div className = {style.AddSpace}>
            <h1>Hello AddSpace</h1>
            <FormTwo/>
            <UploadImages />
        </div>
    )
}

export default AddSpace