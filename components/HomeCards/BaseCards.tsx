import React, { FC } from 'react';
import { Card, Image, Text, Badge, Button, Group, Title, Avatar } from '@mantine/core';

interface cardsProps {
	img: string,
	text: string,
	title: string,
	link?: string
}
const Cards: FC<cardsProps> = (props) => {
	return (
		<div className="flex flex-col p-5 space-y-5 bg-white border shadow-md rounded-xl">
			<div className="flex justify-center -mt-20">
				<Avatar src={props.img} className="border bg-white p-2" size="xl"/>
			</div>
			<div>
				<Text component={Title} order={3} align="center" className='font-title'>
					{props.title}
				</Text>
			</div>
			<div className="p-3">
				<Text align="center" className='font-title'>
					{props.text}
				</Text>
			</div>
			<div className="flex justify-center">
				<Button color="teal" className='hover:bg-indigo hover:cursor-pointer'>
					¡Leer más!
				</Button>
			</div>
		</div>
	)
}

export default Cards