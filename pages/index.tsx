import HeaderHome from '../components/Header/HeaderHome'
import AllCards from '../components/allCards/allCards'
import SignInComplete from '../components/SignIn/SignInComplete'
import Cards from '../components/Cards/Cards'
import { Container } from 'react-bootstrap';

import Link from 'next/link'

export default function Home() {
   return (
      <div>
         <HeaderHome />
         <AllCards/>
         <SignInComplete/>
      </div>
   );
}