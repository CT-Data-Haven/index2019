import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import '../styles/Header.css';

const Header = (props) => (
  <div className='Header'>
    <Navbar expand='md' >
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav variant='pills'>
          <LinkContainer to='/scores'>
            <Nav.Link>{ props.hdrs.scores }</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/survey'>
            <Nav.Link>{ props.hdrs.survey }</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>
);

export default Header;
