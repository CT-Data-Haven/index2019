import React from 'react';
import { Container } from 'react-bootstrap';
import Intro from './Intro';
import Footer from './Footer';

import '../styles/Dash.css';

const Dash = (props) => (
  <div className='Dash'>
    <Container>
      <header>
        <h1>Connecticut Wellbeing and Equity Data App</h1>
        <h2>{ props.intro ? props.intro.headline : ''  }</h2>
      </header>
      <Intro note={ props.note } { ...props.intro } />

      { props.children }

      {/* { props.download.location ? <Footer { ...props.download } /> : null } */}
      { props.source && <Footer { ...props } /> }
    </Container>
  </div>
);

export default Dash;
