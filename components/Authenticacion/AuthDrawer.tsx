import React, { FC, useEffect } from 'react';
import { useState } from 'react';
import { Drawer, Group, Button, Tabs, Tab, Title, Text, Center, Modal } from '@mantine/core';

import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { BiUserCheck, BiUserPlus } from 'react-icons/bi';

interface DataProps {
    color: string,
    text: string,
    variant?: 'outline' | 'light' | 'link',
    form: 'login' | 'signup'
}

const AuthModal: FC<DataProps> = (props) => {
    const [opened, setOpened] = useState(false);
    const [activeTabs, setActiveTabs] = useState(0)

    useEffect(() => {
        if (props.form === 'signup') {
            setActiveTabs(1)
        }
    }, [])

    return (
        <div>
            <Modal opened={opened} onClose={() => setOpened(false)}
                title={<Text component={Title} order={2}>Inicia sesión o registrate</Text>}>
                <Tabs active={activeTabs} onTabChange={setActiveTabs}>
                    <Tab label="Iniciar sesión" icon={<BiUserCheck size="20px" />}>
                        <LoginForm />
                    </Tab>
                    <Tab label="Registro" icon={<BiUserPlus size="20px" />}>
                        <RegisterForm changeTabs={setActiveTabs} />
                    </Tab>
                </Tabs>
            </Modal>
            <div>
                <Button
                    id="Auth-Modal"
                    color={props.color}
                    onClick={() => setOpened(true)}
                    variant={props.variant}
                    radius='lg'
                >
                    {props.text}
                </Button>
            </div>
        </div>
    );
}

export default AuthModal;