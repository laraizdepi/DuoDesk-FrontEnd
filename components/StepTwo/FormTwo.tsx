import style from "./stepTwo.module.sass"
import { Input, NumberInput, Select } from '@mantine/core';
import React from "react";

const FormTwo = () => {
    return (
        <div className={style.FormTwo}>
            <h1>Agrega tus espacios</h1>
            <Input
                placeholder="Title"
                radius="lg"
                size="md"

            />
            <NumberInput
                defaultValue={1}
                placeholder="Cuantos espacios tienes?"
                label="Cantidad de espacios"
                radius="lg"
                size="md"
                min={1}
                required
                hideControls
            />

            <Select
                label="Your favorite framework/library"
                placeholder="Pick one"
                radius="lg"
                size="md"

                data={['Escritorio dedicado', 'Oficina Privada', 'Sala De Reuniones']}
            />
        </div>
    )
}

export default FormTwo