import HeaderHome from '../components/Header/HeaderHome'
import AllCards from '../components/allCards/allCards'
import Phrase from '../components/Phrase/Phrases';
import AllPhrases from '../components/AllPhrases/AllPhrases'
import Head from 'next/head'

export default function Home() {
   return (
      <div>
         <HeaderHome />
         <AllCards/>
         <AllPhrases/>
         
      </div>
   );
}