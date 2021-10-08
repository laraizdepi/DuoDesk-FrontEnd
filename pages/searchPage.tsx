import Navbar from '../components/NavBar/Navbar'
// import { Row, Col } from 'react-bootstrap'
import CardSlideRSuite from '../components/Search/CardSlideRSuite'
// import { Grid, Col } from '@mantine/core';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
const SearchPage = () => {
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
    return (
        <div>
            <Navbar />
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    {/* <Item>xs=8</Item> */}
                    <CardSlideRSuite />
                </Grid>
                <Grid item xs={3}>
                    {/* <Item>xs=8</Item> */}
                    <CardSlideRSuite />
                </Grid>
                <Grid item xs={6} style = {{backgroundColor : 'red'}}>
                    {/* <Item>xs=4</Item> */}
                    <h1>Hello World</h1>
                </Grid>
            </Grid>

            {/* <Grid id="my-grid">
                <Col span={3}>
                    <CardSlideRSuite />
                </Col>
                <Col span={3}>
                    <CardSlideRSuite />
                </Col>
                <Col span={5}>
                    <div style={{ backgroundColor: 'red' }}>
                        <h1>Maps</h1>
                    </div>
                </Col>
            </Grid> */}
        </div>
    )
}

export default SearchPage