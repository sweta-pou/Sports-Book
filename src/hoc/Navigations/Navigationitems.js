import React,{useContext} from 'react'; 
import {Navbar,Nav,NavDropdown} from 'react-bootstrap';
import {  Link, useHistory } from 'react-router-dom';
import UserContext  from '../context';

function Navitems (){
  const {user,setUser,setLog,loggedIn} = useContext(UserContext);
  console.log(loggedIn);
  const history = useHistory();
  function logout(){
   setUser(null);
   setLog();
   history.push('/api/login');

  }
return(
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#home">Spots&Fitness</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link  as={Link} to="/api/sports">Venue</Nav.Link>
      <Nav.Link  as={Link} to="/api/add">Add Venue</Nav.Link>

    </Nav>

    <Nav>
     {loggedIn==='true'?null:<Nav.Link as={Link}  to="/api/login">Login</Nav.Link>}
     {loggedIn==='true'?null: <Nav.Link  as={Link}  to="/api/signup">
        Signup
      </Nav.Link>}
      {loggedIn==='true'?<Nav.Link  onClick={logout}>
        Logout
      </Nav.Link>:null}
    </Nav>
  </Navbar.Collapse>
</Navbar>)
};

export default Navitems;