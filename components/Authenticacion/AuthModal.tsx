import React, { FC } from 'react';
import { useState } from 'react';
import { Modal, Group, Button } from '@mantine/core';
import { Col, Grid } from '@mantine/core'
// icons
import { FcGoogle } from "react-icons/fc"
import { SiFacebook } from "react-icons/si"
import { TiVendorMicrosoft } from 'react-icons/ti'

import AuthForm from './AuthForm';

import style from "./AuthModal.module.sass"

interface DataProps {
	color: string,
	text: string,
	variant?: 'outline' | 'light',
	form: 'login' | 'signup'
}

const AuthModal: FC<DataProps> = (props) => {
	const [opened, setOpened] = useState(false);
	return (
		<div>
			<Modal opened={opened} onClose={() => setOpened(false)} size={600}>
				<AuthForm initial={props.form}/>
				<div style={{ textAlign: 'center', marginBottom: '30px' }}>
					<Grid justify="center">
						<Col span={12} md={6}>
							<Button 
								className={style.ButtonGoogle}
								component="a"
								rel="noopener noreferrer"
								href="http://localhost:5000/google/auth"
								leftIcon={<FcGoogle />}
								styles={{
									root: {
										backgroundColor: '#ffffff',
										border: 1,
										height: 42,
										paddingLeft: 28,
										paddingRight: 28,
										marginBottom: 10,
										marginTop: 10,
										color: '#898989',
									},
									leftIcon: {
										marginRight: 15,
									},
							}}>
								Sign in with google
							</Button>
						</Col>
					</Grid>
					<Grid justify="center">
						<Col span={12} md={6}>
							<Button
								component="a"
								rel="noopener noreferrer"
								href="http://localhost:5000/facebook/auth"
								leftIcon={<SiFacebook />}
								styles={{
									root: {
										backgroundColor: '#4267b2',
										border: 0,
										height: 42,
										paddingLeft: 20,
										paddingRight: 20,
										marginBottom: 10,
										color: 'white'
									},

									leftIcon: {
										marginRight: 15,
									},

								}}
							>Sign in with Facebook
							</Button>
						</Col>
					</Grid>
					<Grid justify="center">
						<Col span={12} md={6}>
							{/* Button microsoft */}
							<Button
								component="a"
								href="http://localhost:5000/microsoft/auth"
								leftIcon={<TiVendorMicrosoft />}
								styles={{
									root: {
										backgroundColor: '#2f2f2f',
										border: 0,
										height: 42,
										paddingLeft: 20,
										paddingRight: 20,
										marginBottom: 10,
										color: 'white'
									},

									leftIcon: {
										marginRight: 15,
									},

								}}
							>Sign in with microsoft
							</Button>
						</Col>
					</Grid>
				</div>
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