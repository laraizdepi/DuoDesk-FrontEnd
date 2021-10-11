import HeaderHome from '../components/Header/HeaderHome'
import HomeCards from '../components/HomeCards/HomeCards'
import Phrase from '../components/Phrases/BasePhrases';
import HomePhrases from '../components/Phrases/HomePhrases'
import Head from 'next/head'
import AllCardsSecond from '../components/AllCardsSecond/AllCardsSecond'
import ListWithSvg from '../components/ListOfSteps/ListWithSvg';
import NavbarBoot from '../components/NavBar/Navbar';
import OpinionSlider from '../components/OpinionsHome/OpinionSlider';
import NavbarNew3 from '../components/NavBar/NavbarNew3';
export default function Home() {
   return (
      <div>
         {/* <NavbarNew3/> */}
         <HeaderHome />
         <HomeCards/>
         <HomePhrases/>
         <OpinionSlider/>
      </div>
   );
}