import React, { FC } from 'react';
import { Card, Image, Text, Badge, Button, Group, useMantineTheme, Title } from '@mantine/core';


interface cardsProps {
  img: string,
  text: string,
  title: string,
  color: string
}
const Cards: FC<cardsProps> = (props) => {
  const theme = useMantineTheme();

  const secondaryColor = theme.colorScheme === 'dark'
    ? theme.colors.dark[1]
    : theme.colors.gray[7];

  return (
    <div style={{ width: 340, margin: 'auto', backgroundColor: 'red' }} >

      <Card shadow="sm" padding="lg">
      <Title align='center' >{props.title}</Title>
        <Card.Section>
          <Image src={props.img} height={300} alt={props.title} />
        </Card.Section>

        <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
          <Text weight={500} size='lg'>{ }</Text>
          <Badge color={props.color} variant="light">
            On Sale
          </Badge>
        </Group>

        <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
          {props.text}
        </Text>

        <Button variant="light" color={props.color} fullWidth style={{ marginTop: 14 }}>
          Book classic tour now
        </Button>
      </Card>
    </div>
  );
}

export default Cards