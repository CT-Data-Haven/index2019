import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Intro from './Intro';
import Footer from './Footer';

import '../styles/Dash.css';

const Dash = (props) => (
  <div className='Dash'>
    <Container>
      <header>
        <h1>Connecticut Wellbeing and Equity Data App</h1>
        <h2>{ props.intro.headline }</h2>
      </header>
      <Intro note={ props.note.text } { ...props.intro } />

      { props.children }

      { props.download.location ? <Footer { ...props.download } /> : null }
    </Container>
  </div>
);

export default Dash;
