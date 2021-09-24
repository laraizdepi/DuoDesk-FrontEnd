import HeaderHome from '../components/Header/HeaderHome'
import AllCards from '../components/allCards/allCards'
import Phrase from '../components/Phrase/Phrases';
import AllPhrases from '../components/AllPhrases/AllPhrases'

export default function Home() {
   return (
      <div>
         <HeaderHome />
         <AllCards/>
         <AllPhrases/>
         
      </div>
   );
}