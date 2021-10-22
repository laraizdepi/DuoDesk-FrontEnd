import { useWindowScroll } from '@mantine/hooks';
import { Button, Text, Group } from '@mantine/core';
// import { Tabs, Tab } from '@mantine/core';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const NavbarSectionMateria = () => {
    const [value, setValue] = React.useState('one');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const [scroll, scrollTo] = useWindowScroll();
    return (
        <div >
            <Box sx={{ width: '100%' }}>
                {/* {console.log(`position x: ${scroll.x}, y: ${scroll.y}`)} */}

                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                >
                    <Tab value="one" label="Imagenes" onClick={() => scrollTo({ y: 0 })} />
                    <Tab value="two" label="Description" onClick={() => scrollTo({ y: 656 })} />
                    <Tab value="three" label="Ubicacion" onClick={() => scrollTo({ y: 845 })} />
                    <Tab value="four" label="Amenidades" onClick={() => scrollTo({ y: 1594 })} />
                    <Tab value="five" label="Espacios" onClick={() => scrollTo({ y: 2024 })} />
                </Tabs>
            </Box>

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