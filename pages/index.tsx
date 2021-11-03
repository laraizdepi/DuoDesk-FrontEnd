import React from 'react'
import { Image, Text } from '@mantine/core'

import HeaderHome from '../components/LandingComponents/Header/HeaderHome'
import HomeCards from '../components/LandingComponents/HomeCards/HomeCards'
import NavBar from '../components/NavBar/Navbar';
import Features from '../components/LandingComponents/Features/Features';
import Roles from '../components/LandingComponents/Roles/Roles'
import MadeForAll from '../components/LandingComponents/MadeForAll/MadeForAll';

const Home = () => {
   return (
      <div className="w-full">
         <NavBar>
            <HeaderHome />
            <Features />
            <HomeCards />
            <Roles/>
            <MadeForAll/>
         </NavBar>
      </div>
   )
}

export default Home