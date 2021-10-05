import { Container, Row, Col } from 'react-bootstrap'
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Badge, Center, Divider, Group, Title, Text, Button } from "@mantine/core"
import style from './Search.module.sass'
import { CardActionArea } from '@mui/material';
import { AiOutlineHeart } from 'react-icons/ai'
import { AiTwotoneHeart } from 'react-icons/ai'
import { useState } from 'react';
import ImagesSlide from './ImagesSlide';
const SearchVertical = () => {
  const theme = useTheme();
  const [liked, setliked] = useState(false)

  const Images = [
    {
      "main": true,
      "src": "https://www.petguide.com/wp-content/uploads/2018/07/funniest-dog-breeds-pug.jpg",
      "id": 1
    },
    {
      "main": false,
      "src": "https://coworker.imgix.net/photos/colombia/bogota/selina-chapinero-cowork/3.jpg?w=580&h=323&q=90&auto=format&fit=crop&mark=/template/img/wm_icon.png&markscale=5&markalign=center,middle",
      "id": 1
    },
    {
      "main": false,
      "src": "https://coworker.imgix.net/photos/colombia/medellin/selina-medellin-cowork/2.jpg",
      "id": 1
    }
  ]

  const example = () => {
    console.log('It Worked');
    if (liked == false) {
      setliked(true)
    } else {
      setliked(false)
    }
  }
  const ButtonCorazon =
    <IconButton color="primary" aria-label="upload picture" component="span" onClick={example}>
      <AiOutlineHeart />
    </IconButton>

  return (
    <div style={{ margin: '00px' }}>
      <Card sx={{ maxWidth: 350 }}>
        <CardActionArea>
          <ImagesSlide images={Images} />

          {/* <CardMedia
            component="img"
            height="230"
            image="https://www.coworker.com/mag/wp-content/uploads/2019/12/Potential-Feature-Image-2.png"
            alt="green iguana"
          /> */}
          <CardContent>
            <div>
              <Row>
                <Col xs={10}>
                  <Typography gutterBottom variant="h5" component="div">
                    Oficina WeWork calle 26
                    <Typography gutterBottom variant="body2" color="text.secondary">
                      Ac. 26 ## 92-32
                    </Typography>
                  </Typography>
                </Col>
                <Col xs={2}>
                  {ButtonCorazon}
                </Col>
              </Row>
            </div>

            <Typography gutterBottom variant="body2" color="text.secondary">
              Surrounded by booming business across industries, WeWork’s coworking space in Fontibón is the place to be for established businesses and budding entrepreneurs alike ...
            </Typography>
            <div style={{ display: 'flex' }}>
              <Typography variant="h6" component="div" style={{ margin: 'auto' }}>
                Officina personal Duodesk
              </Typography>
            </div>

            {/* Prices	 */}
            <div className={style.TextCard}>
              <Divider margins="xs" label="Precios" labelPosition="center" />
              {/* <Title order={3} >Precios</Title> */}
              <Group position="center" noWrap spacing="xs">
                <div>
                  <Title order={5}>Hora</Title>
                  <Text>$5K</Text>
                </div>
                <Divider orientation="vertical" margins="xs" />
                <div>
                  <Title order={5}>Dia</Title>
                  <Text>$30K</Text>
                </div>

                <Divider orientation="vertical" margins="xs" />
                <div>
                  <Title order={6}>Semana</Title>
                  <Text>$280K</Text>
                </div>
                <Divider orientation="vertical" margins="xs" />
                <div>
                  <Title order={5}>Mes</Title>
                  <Text>$1.35M</Text>
                </div>
              </Group>
              <Divider margins="xs" label="Amenidades del espacio" labelPosition="center" />
              <Group>

              </Group>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
      <div>
      </div>
      {/* <div>
            <ImagesSlide/>
      </div> */}
    </div>
  );

}

export default SearchVertical