import * as React from 'react';
import { useWindowScroll } from '@mantine/hooks';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import style from './VIew.module.sass'

import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({
    palette: {
        primary: {
            main: '#12B886',
        },
        secondary: {
            light: '#0066ff',
            main: '#848484',
            contrastText: '#ffcc00',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
});


const NavbarSectionMateria = () => {
    const [value, setValue] = React.useState('one');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const [scroll, scrollTo] = useWindowScroll();
    return (
        <div className={style.TabsNavigation} >
            <ThemeProvider theme={theme}>
                <Box sx={{ width: '100%' }}>
                    <div>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            // textColor="secondary"
                            indicatorColor="primary"
                            aria-label="secondary tabs example"
                            variant="scrollable"
                            scrollButtons="auto"
                        >
                            <Tab value="one" label="Imagenes" onClick={() => scrollTo({ y: 0 })} />
                            <Tab value="two" label="Información General" onClick={() => window.location.href = '#titleOffice'} />
                            <Tab value="four" label="Amenidades" onClick={() => window.location.href = '#amenidades'} />
                            <Tab value="five" label="Espacios" onClick={() => window.location.href = '#spaces'} />
                            <Tab value="three" label="Ubicación" onClick={() => window.location.href = '#BigMap'} />
                        </Tabs>
                    </div>
                </Box>
            </ThemeProvider>
        </div>
    )
}

export default NavbarSectionMateria