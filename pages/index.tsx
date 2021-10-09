import HeaderHome from '../components/Header/HeaderHome'
import HomeCards from '../components/HomeCards/HomeCards'
import Phrase from '../components/Phrases/BasePhrases';
import HomePhrases from '../components/Phrases/HomePhrases'
import Head from 'next/head'
import AllCardsSecond from '../components/AllCardsSecond/AllCardsSecond'
import ListWithSvg from '../components/ListOfSteps/ListWithSvg';
import NavbarNew from '../components/NavBar/NavbarNew3';
export default function Home() {
   return (
      <div>
         <NavbarNew/>
         <HeaderHome />
         <HomeCards/>
         <HomePhrases/>
      </div>
   );
}