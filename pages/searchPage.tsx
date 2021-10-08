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
            <Grid
                container
                direction="row"
                justifyContent="flex-center"
                alignItems="flex-start"
            >
                <Grid item xs={3} style = {{marginLeft : '30px'}}>
                    <CardSlideRSuite />
                </Grid>
                <Grid item xs={3}>
                    <CardSlideRSuite />
                </Grid>
                <Grid item xs={5} style={{ backgroundColor: 'red' }}>
                    <h1>Hello World</h1>
                </Grid>
            </Grid>
        </div>
    )
}

export default SearchPage