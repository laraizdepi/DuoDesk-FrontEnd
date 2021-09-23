import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Button } from '@mantine/core';

const NavbarBoot = () => {
   return (
      <Navbar collapseOnSelect expand="lg" variant="light"  style = {{backgroundColor:'rgba(0,0,0,0)'}}>
         <Container>
            <Navbar.Brand href="#home">DuoDesk</Navbar.Brand >
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
               <Nav className="me-auto">
               </Nav>
               <Nav className="justify-content-end" style = {{marginRight: '50px'}}>
                  <Button color='teal' radius='lg' size ='md' style = {{marginRight: '10px'}}>Sign Up</Button>
                  <Button color="teal" variant='outline' radius='lg' size = "md" style = {{marginRight: '10px'}}>Sign In</Button>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
}

export default NavbarBoot;
