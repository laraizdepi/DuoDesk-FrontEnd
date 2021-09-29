import style from "./stepTwo.module.sass"
import { Input } from '@mantine/core';
import React from "react";

const FormTwo = () => {
    return (
        <div className={style.FormTwo}>
            <Input
                // icon={<MailIcon />}
                placeholder="Your email"
                radius="lg"
            />

        </div>
    )
}

export default FormTwo