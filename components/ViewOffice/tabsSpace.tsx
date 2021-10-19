import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardSearchBaseTest from './CardSearchBaseTest'
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 4 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface Offices {
    id: string,
    name: string,
    description: string,
    host: any,
    isActive: boolean,
    generalAmenities: string[]
    spaces: {
        nameSpace: string,
        typeSpace: string,
        capacitySpace: number,
        availableSpace: number,
        hourPrice: number,
        dayPrice: number,
        weekPrice: number,
        monthPrice: number,
        nameAmenities: string[],
        imagesUrls: string[],
        booking?: any
    }[],
    address: any,
    scores?: {
        averageScore: number,
        reviews: any
    },
    days: [{
        day: string,
        isAvailable: boolean,
        startHour?: string,
        endHour?: string
    }],
    notifications: string[],
    official: string[],
    openDate: string
}

const TabsSpace: React.FC<{ office: Offices }> = (props) => {
    const office = props.office
    const findTypeSpaces = (spaces: any[], typeSpace: string) => {
        const allSpaces: any[] = []
        for (const space of spaces) {
            // console.log(space);
            if (space.typeSpace == typeSpace) {
                console.log('yes');
                allSpaces.push(space)
                console.log('allSpaces', allSpaces);
            } else {
                console.log('not');
            }
            console.log(allSpaces);

        }
        return allSpaces
    }
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style = {{width: '100%'}}>
                    <Tab label="Escritorio personal" {...a11yProps(0)} />
                    <Tab label="Oficina privada" {...a11yProps(1)} />
                    <Tab label="Sala de conferencias" {...a11yProps(2)} />
                    <Tab label="Espacio abierto" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <CardSearchBaseTest spaces={findTypeSpaces(office.spaces, 'Escritorio personal')} />

            </TabPanel>
            <TabPanel value={value} index={1}>
                <CardSearchBaseTest spaces={findTypeSpaces(office.spaces, 'Oficina privada')} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <CardSearchBaseTest spaces={findTypeSpaces(office.spaces, 'Sala de conferencias')} />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <CardSearchBaseTest spaces={findTypeSpaces(office.spaces, 'Test')} />
            </TabPanel>
        </Box>
    );
}


export default TabsSpace