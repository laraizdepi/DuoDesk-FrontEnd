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
import SearchVertical from "./SearchVertical"
import style from './Search.module.sass'
import ImagesSlide from './ImagesSlide';
const Search = () => {
  const theme = useTheme();
  return (
    <div>
      <Container>
        <Row >
          <Card sx={{ display: 'flex' }}>
            <CardMedia
              component="img"
              sx={{ width: 280, height: 200 }}
              image="https://www.coworker.com/mag/wp-content/uploads/2019/12/Potential-Feature-Image-2.png"
              alt="Live from space album cover"
            />
            div
            {/* List of prices */}
            <div className={style.TextCard}>
              <Divider margins="xs" label="Precios" labelPosition="center" />
              {/* <Title order={3} >Precios</Title> */}
              <Group position="left" noWrap spacing="xs">
                <div>
                  <Title order={5}>Por Hora</Title>
                  <Text>$5K - $15K</Text>
                </div>
                <Divider orientation="vertical" margins="xs" />
                <div>
                  <Title order={5}>Por Dia</Title>
                  <Text>$30K - $120K</Text>
                </div>

                <Divider orientation="vertical" margins="xs" />
                <div>
                  <Title order={6}>Por Semana</Title>
                  <Text>$280K - $790K</Text>
                </div>
                <Divider orientation="vertical" margins="xs" />
                <div>
                  <Title order={5}>Por Mes</Title>
                  <Text>$1.35M - $4.65M</Text>
                </div>
              </Group>
            </div>
          </Card>
        </Row>
      </Container>

      <div style={{ marginTop: '30px' }}>
        <SearchVertical />
      </div>
    </div>
  )
}


export default Search