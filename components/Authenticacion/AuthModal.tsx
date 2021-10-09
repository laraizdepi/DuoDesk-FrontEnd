import React, { FC, useEffect } from 'react';
import { useState } from 'react';
import { Modal, Group, Button, Tabs, Tab, Title, Text } from '@mantine/core';

import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { BiUserCheck, BiUserPlus } from 'react-icons/bi';

interface DataProps {
	color: string,
	text: string,
	variant?: 'outline' | 'light',
	form: 'login' | 'signup'
}

const AuthModal: FC<DataProps> = (props) => {
	const [opened, setOpened] = useState(false);
	const [activeTabs, setActiveTabs] = useState(0)

	useEffect(() => {
		if(props.form === 'signup'){
			setActiveTabs(1)
		}
	}, [])

	return (
		<div>
			<Modal opened={opened} onClose={() => setOpened(false)} size={600} 
			title={<Text component={Title} order={2}>Inicia sesión o registrate</Text>}>
				<Tabs active={activeTabs} onTabChange={setActiveTabs}>
					<Tab label="Iniciar sesión" icon={<BiUserCheck size="20px"/>}>
						<LoginForm/>
					</Tab>
					<Tab label="Registro" icon={<BiUserPlus size="20px" />}>
						<RegisterForm changeTabs={setActiveTabs}/>
					</Tab>
				</Tabs>
			</Modal>
			<Group position="center">
				<Button
					color={props.color}
					onClick={() => setOpened(true)}
					variant={props.variant}
					radius='lg'
					size="md"
					style={{ marginRight: '10px' }}
				>
					{props.text}
				</Button>
			</Group>
		</div>
	);
}



export default AuthModal;