import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import '../styles/Header.css';

const Header = (props) => (
  <div className='Header'>
    <Navbar expand='lg' variant='light'  fixed='top'>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav variant='pills' onSelect={ props.onClick }>
          { props.hdrs.map((h) => (
            <LinkContainer to={ '/' + h.location } key={ `page-${ h.location }` }>
              <Nav.Link
                eventKey={ h.location }
                active={ h.location === props.activePage }
              >{ h.title }</Nav.Link>
            </LinkContainer>
          )) }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>
);

export default Header;
