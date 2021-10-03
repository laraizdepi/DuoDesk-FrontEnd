import HeaderHome from '../components/Header/HeaderHome'
import AllCards from '../components/allCards/allCards'
import Phrase from '../components/Phrase/Phrases';
import AllPhrases from '../components/AllPhrases/AllPhrases'
import Head from 'next/head'
import AllCardsSecond from '../components/AllCardsSecond/AllCardsSecond'
import ListWithSvg from '../components/ListOfSteps/ListWithSvg';
// // import 'rsuite/styles/index.less';

export default function Home() {
   return (
      <div>
         <HeaderHome />
         <AllCards/>
         <AllPhrases/>
         <AllCardsSecond/>
         <ListWithSvg/>
      </div>
   );
}