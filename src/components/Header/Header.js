import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#books/">See All Books</Nav.Link>
    <Nav.Link href="#wishlist/">See Wishlist</Nav.Link>
    <Nav.Link href="#readbooks/">See Read Books</Nav.Link>
    <Nav.Link href="#change-password/">Change Password</Nav.Link>
    <Nav.Link href="#sign-out/">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up/">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in/">Sign In</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg="primary" variant="dark" expand="md">
    <Navbar.Brand href="#books/">
      <img src="https://user-images.githubusercontent.com/53062479/89750722-2c863380-da9b-11ea-9da6-89b6cd205fa3.gif" alt="Logo" className='logo'/>
      The BookWorm Spot
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}

        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
