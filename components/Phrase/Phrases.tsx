import React, { FC } from 'react';

interface PhraseProps {
    wordImp?: string
    title?: string
    img?: string
}

const Phrase: FC<PhraseProps> = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <h2>{props.wordImp}</h2>
            <img src={props.img} alt="" />

        </div>
    )
}

export default Phrase