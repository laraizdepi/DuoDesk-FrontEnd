import { useWindowScroll } from '@mantine/hooks';
import { Button, Text, Group } from '@mantine/core';
// import { Tabs, Tab } from '@mantine/core';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#12B886',

            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            light: '#0066ff',
            main: '#848484',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
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
        <div style={{ marginTop: '20px' }} className="sticky top-0">
            <ThemeProvider theme={theme}>
                <Box sx={{ width: '100%' }}>
                    <div>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            // textColor="secondary"
                            indicatorColor="primary"
                            aria-label="secondary tabs example"
                        // color = '#12B886'
                        >
                            <Tab value="one" label="Imagenes" onClick={() => scrollTo({ y: 0 })} />
                            <Tab value="two" label="Description" onClick={() => scrollTo({ y: 656 })} />
                            <Tab value="three" label="Ubicacion" onClick={() => scrollTo({ y: 845 })} />
                            <Tab value="four" label="Amenidades" onClick={() => scrollTo({ y: 1594 })} />
                            <Tab value="five" label="Espacios" onClick={() => scrollTo({ y: 2024 })} />
                        </Tabs>
                    </div>
                </Box>
            </ThemeProvider>


            {/* <Tabs color="teal">
                {console.log(`position x: ${scroll.x}, y: ${scroll.y}`)}
                <Tab label="Imagenes" onClick={() => scrollTo({ y: 84 })} >Imagenes</Tab>
                <Tab label="Description" onClick={() => scrollTo({ y: 730 })} >Description</Tab>
                <Tab label="Ubicacion" onClick={() => scrollTo({ y: 932 })} >Ubicacion</Tab>
                <Tab label="Amenidades" onClick={() => scrollTo({ y: 1684 })}>Amenidades</Tab>
                <Tab label="Espacios" onClick={() => scrollTo({ y: 2104 })} color="pink">Espacios</Tab>
            </Tabs> */}

        </div>
    )
}

export default NavbarSectionMateria