import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const Header =()=> {
    const {user, logOut, admin} = useAuth();
  return (
    <>
    <Navbar bg="dark" variant="dark" sticky="top" collapseOnSelect expand="lg">
    <Container>
    <Navbar.Brand as={Link} to="/home">My Shop</Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
    <Nav.Link as={Link} to="/home">Home</Nav.Link>
    <Nav.Link as={Link} to="/all_products">All Products</Nav.Link>
    {user? admin?<Nav.Link as={Link} to="/addproducts">Add Products</Nav.Link> : <Nav.Link as={Link} to="/addreview">Add Review</Nav.Link> :''}
    {user? admin?<Nav.Link as={Link} to="/addadmin">Add Admin</Nav.Link> : <Nav.Link as={Link} to="/mylists">My Orders</Nav.Link> :''}
    {user?admin? <Nav.Link as={Link} to="/allorders">All Orders</Nav.Link>:<Nav.Link as={Link} to="/payment">Payment</Nav.Link> :''}
      {user ? admin?
         <Navbar>
            <Navbar.Text>
            Signed in as : {user}
          </Navbar.Text>
          <button className="btn btn-danger ms-2" onClick={logOut}>Logout</button>
         </Navbar>
         :
         <Navbar>
            <Navbar.Text>
                Signed in as : {user}
            </Navbar.Text>
              <button className="btn btn-danger ms-2" onClick={logOut}>Logout</button>
          </Navbar>
         :
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
      }    


    </Navbar.Collapse>
    </Container>
    </Navbar>

    </>
  );
}

export default Header;
