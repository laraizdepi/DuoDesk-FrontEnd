import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import style from '../AllCardsSecond/allcards.module.sass'
import icon1 from '../../Img/home/icon1.svg'

interface cardProps {
    title?: string,
    text?: string,
    iconUrl ?: string

}

const CardSecond: React.FC<cardProps> = (props) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardContent>
                <div className={style.Circle}>
                    <div className = {style.Icon}>
                        <img src={props.iconUrl}/>
                    </div>
                </div>
                    {/* <Typography gutterBottom variant="h5" component="div">
                        {props.title}
                    </Typography> */}
                <h4>{props.title}</h4>
                {/* <h3>{props.title}</h3> */}
                {/* <Typography variant="body2" color="text.secondary">
                    {props.text}
                </Typography> */}
                <p>{props.text}</p>
            </CardContent>
            <CardActions>
                <Button size="small">Saber mas</Button>
                <Button size="small">Reserva una oficina</Button>
            </CardActions>
        </Card>
    );
}
export default CardSecond