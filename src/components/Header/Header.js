import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

const authenticatedOptions = (
  // <Fragment>
  //   <Nav.Link href="#books/">See My Books</Nav.Link>
  //   <Nav.Link href="#wishlist/">See Wishlist</Nav.Link>
  //   <Nav.Link href="#readbooks/">See Read Books</Nav.Link>
  //   <Nav.Link href="#change-password/">Change Password</Nav.Link>
  //   <Nav.Link href="#sign-out/">Sign Out</Nav.Link>
  // </Fragment>
  <DropdownButton
    alignRight
    title="My Account"
    id="dropdown-menu-align-right"
    className="drop-down"
    variant="secondary"
  >
    <Dropdown.Item href="#books/">My Books</Dropdown.Item>
    <Dropdown.Item href="#wishlist/">Wishlist</Dropdown.Item>
    <Dropdown.Item href="#readbooks/">Read Books</Dropdown.Item>
    <Dropdown.Item href="#change-pw/">Change Password</Dropdown.Item>
    <Dropdown.Item href="#sign-out/">Sign Out</Dropdown.Item>
  </DropdownButton>
)

const unauthenticatedOptions = (
  <Fragment>
    {/* <Nav.Link href="#sign-up/">Sign Up</Nav.Link> */}
    <Nav.Link href="#sign-in/">Sign In</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar variant="dark" expand="md" className="navBar">
    <Navbar.Brand href="#/">
      <div className="logo-and-name">
        <div>
          <img src="https://user-images.githubusercontent.com/53062479/89816393-824af200-db14-11ea-83cc-42714d271694.gif" alt="Logo" className='logo'/>
        </div>
        <div>
          <p className="app-name">The <br/> BookWorm <br/>Spot</p>
        </div>
      </div>
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
