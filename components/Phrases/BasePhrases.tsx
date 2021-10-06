import React, { FC } from 'react';
import { Group, List, Title, Text, ThemeIcon } from '@mantine/core';
import style from './BasePhrase.module.sass'

interface PhraseProps {
    items: {title: string, value: string}[],
    color: string,
    icon: React.ReactNode
}

const Phrase: FC<PhraseProps> = (props) => {
    return (
        <div style={{margin: '20% 0 20% 8%'}}>
            <List 
            styles={{
                itemIcon: { marginRight: '1rem'}
            }}
            icon={
                <ThemeIcon radius="xl" color={props.color} size="xl" variant="light">
                    {props.icon}
                </ThemeIcon>
            }
            >
                {props.items.map((element, index) => {
                    return(
                        <List.Item key={element.title} style={{margin: '4rem 0'}}>
                            <div>
                                <Group position="left" direction="column" withGutter>
                                    <Title order={3}>{index+1}. &nbsp;{element.title}</Title>
                                    <Text>{element.value}</Text>
                                </Group>
                            </div>
                        </List.Item>
                    )
                })}
            </List>
        </div>
    )
}



export default Phrase