import React, { FC } from 'react';
import { Card, Image, Text, Badge, Button, Group, Title, Avatar } from '@mantine/core';

interface cardsProps {
	img: string,
	text: string,
	title: string,
	color: string
}
const Cards: FC<cardsProps> = (props) => {
	const styles = {
		margin: '2rem 1rem'
	}

	return(
		<div>
			<Card padding="xl" radius="lg" shadow="xs" withBorder>
				<Card.Section style={styles}>
					<Group position="left">
						<Avatar
							size="xl"
							radius="xl"
							src={props.img}
						/>
					</Group>
				</Card.Section>
				<Card.Section style={styles}>
					<Title order={2}>{props.title}</Title>
				</Card.Section>
				<Card.Section style={styles}>
					<Text>{props.text}</Text>
				</Card.Section>
				<Card.Section style={styles}>
					<Button variant="light" onClick={(event: any) => {
						document.body.scrollTop = 0
						document.documentElement.scrollTop = 0
					}}>¡Me interesa!</Button>
				</Card.Section>
			</Card>
		</div>
	)
}

export default Cards