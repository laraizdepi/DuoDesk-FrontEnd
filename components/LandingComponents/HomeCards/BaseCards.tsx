import React, { FC } from 'react';
import { Card, Image, Text, Badge, Button, Group, Title, Avatar } from '@mantine/core';

interface cardsProps {
	img: string,
	text: string,
	title: string,
	link?: string
}
const Cards: FC<cardsProps> = (props) => {
	const focusSearch = () => {
		const input = document.getElementById('city-search')
		input?.focus()
	}

	return (
		<div className="flex flex-col items-stretch p-5 space-y-5 bg-white border shadow-md rounded-xl w-auto mx-3" style={{ height: '650px' }}>
			<div className='self-center'>
				<Avatar src={props.img} className="border bg-white p-2 self-start justify-self-auto h-full" size="xl" />
			</div>
			<div>
				<Text component={Title} order={3} align="center" className='font-title' transform='capitalize'>
					{props.title}
				</Text>
			</div>
			<div className="self-stretch p-3 h-full">
				<Text align="left" className='font-title' style={{ height: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
					{props.text}
				</Text>
			</div>
			<div className="justify-self-auto flex flex-col space-y-4 justify-center">
				<Button onClick={focusSearch} color="teal" variant='light' className='hover:bg-indigo hover:cursor-pointer hover:text-white hover:no-underline'>
					¡Empieza a reservar tu oficina!
				</Button>
				<Button onClick={() => window.open(props.link, '_blank')} color="pink" variant='white' className='hover:bg-indigo hover:cursor-pointer hover:text-white hover:no-underline'>
					¡Leer más!
				</Button>
			</div>
		</div>
	)
}

export default Cards