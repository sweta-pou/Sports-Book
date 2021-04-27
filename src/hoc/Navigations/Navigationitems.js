import React from 'react'; 
import {Navbar,Nav,NavDropdown} from 'react-bootstrap';

const navitems =()=>(

<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#home">Spots&Fitness</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/api/sports">Venue</Nav.Link>
      
    </Nav>
    <Nav>
      <Nav.Link href="#deets">Login</Nav.Link>
      <Nav.Link eventKey={2} href="#memes">
        Signup
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
);

export default navitems;