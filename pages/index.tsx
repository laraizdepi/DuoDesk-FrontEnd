import HeaderHome from '../components/Header/HeaderHome'
import AllCards from '../components/allCards/allCards'
import SignIn from '../components/SignIn/SignIn'
import Cards from '../components/Cards/Cards'
import { Container } from 'react-bootstrap';


export default function Home() {
   return (
      <div>
         <HeaderHome />
         <AllCards/>
         <SignIn/>
      </div>
   );
}