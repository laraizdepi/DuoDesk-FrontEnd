import HeaderHome from '../components/Header/HeaderHome'
import HomeCards from '../components/HomeCards/HomeCards'
import Phrase from '../components/Phrases/BasePhrases';
import HomePhrases from '../components/Phrases/HomePhrases'
import Head from 'next/head'
import AllCardsSecond from '../components/AllCardsSecond/AllCardsSecond'
import ListWithSvg from '../components/ListOfSteps/ListWithSvg';
import OpinionSlider from '../components/OpinionsHome/OpinionSlider';
import NavBar from '../components/NavBar/Navbar';
import SearchImputTest from '../components/SearchInput/SearchInput';
export default function Home() {
   return (
      <div className="w-full">
         <NavBar/>
         <HeaderHome />
         <HomeCards/>
         <HomePhrases/>
         <OpinionSlider/>
         <SearchImputTest/>
      </div>
   );
}