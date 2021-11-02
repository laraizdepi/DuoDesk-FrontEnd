import React from 'react'
import { Image, Text } from '@mantine/core'

import HeaderHome from '../components/Header/HeaderHome'
import HomeCards from '../components/HomeCards/HomeCards'
import NavBar from '../components/NavBar/Navbar';

const Home = () => {
   return (
      <div className="w-full">
         <NavBar/>
         <HeaderHome />
         <HomeCards/>
         <div className='flex flex-row'>
            <div className='m-auto'>
               <Image
                  src='https://landkit.goodthemes.co/assets/img/photos/photo-2.jpg'
                  width='60%'
               />
            </div>
            <div>
               <Text>
                  La solución perfecta y pensada para
                  <span>personas creativas e intuitivas</span>
               </Text>
            </div>
         </div>
      </div>
   )
}

export default Home