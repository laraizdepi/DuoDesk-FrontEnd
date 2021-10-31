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
		<div className="flex flex-col p-5 space-y-5 items-center bg-white border shadow-md rounded-xl w-auto mx-3" style={{ height: '600px' }}>
			<div className="flex justify-center">
				<Avatar src={props.img} radius='xl' className="border bg-white p-2" size="xl"/>
			</div>
			<div>
				<Text component={Title} order={3} align="left" className='font-title'>
					{props.title}
				</Text>
			</div>
			<div className="p-3">
				<Text align="center" className='font-title' style={{ height: '200px', overflow: 'hidden', textOverflow: 'ellipsis'}}>
					{props.text}
				</Text>
			</div>
			<div className="flex justify-center">
				<Button onClick={focusSearch} color="teal" className='hover:bg-indigo hover:cursor-pointer hover:text-white hover:no-underline'>
					¡Leer más!
				</Button>
			</div>
		</div>
	)
}

export default Cards