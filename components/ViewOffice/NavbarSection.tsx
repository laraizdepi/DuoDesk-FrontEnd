import { useWindowScroll } from '@mantine/hooks';
import { Button, Text, Group } from '@mantine/core';
import { Tabs, Tab } from '@mantine/core';

const NavbarSection = () => {
    const [scroll, scrollTo] = useWindowScroll();
    return (
        <div>
            <Tabs color="teal">
            {console.log(`position x: ${scroll.x}, y: ${scroll.y}`) }
                <Tab label="Imagenes" onClick = {() => scrollTo({ y: 84 })} >Imagenes</Tab>
                <Tab label="Description" onClick = {() => scrollTo({ y: 730 })} >Description</Tab>
                <Tab label="Ubicacion" onClick = {() => scrollTo({ y: 932 })} >Ubicacion</Tab>
                <Tab label="Amenidades" onClick = {() => scrollTo({ y: 1684 })}>Amenidades</Tab>
                <Tab label="Espacios" onClick = {() => scrollTo({ y: 2104 })}  color="pink">Espacios</Tab>
            </Tabs>

        </div>
    )
}

export default NavbarSection