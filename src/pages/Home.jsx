import React from 'react';

import { Row } from 'react-bootstrap';
import Tile from '../components/Tile';

import '../styles/Home.css';

const Home = ({ data, hdrs, onClick }) => {
  const cards = data.map((d, i) => {
    return (
      <Tile key={ `tile-${ i }` } hdr={ hdrs[d.page] } onClick={ onClick } { ...d } />
    )
  });
  return (
    <div className='Home'>
      <Row xs={ 1 } sm={ 2 } md={ 3 } className='d-flex flex-row align-items-stretch'>
        { cards }
      </Row>
    </div>
  );
};



export default Home;
