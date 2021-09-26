import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import SignInComplete from '../SignInComplete/SignInComplete'
import SignUpComplete from '../SignUpComplete/SignUpComplete'
import RegisterOffice from '../RegisterOffice/RegisterButton';

const NavbarBoot = () => {
   return (
      <Navbar collapseOnSelect expand="lg" variant="light"  style = {{backgroundColor:'rgba(0,0,0,0)'}}>
         <Container>
            <Navbar.Brand href="http://localhost:3000">DuoDesk</Navbar.Brand >
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
               <Nav className="me-auto">
               </Nav>
               <Nav className="justify-content-end" style = {{marginRight: '50px'}}>
                  <RegisterOffice/>
                  <SignUpComplete color = 'teal' text = 'Sign Up' />
                  <SignInComplete color = 'teal' text = 'Sign In' variant = "outline"  />
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
}

export default NavbarBoot;
