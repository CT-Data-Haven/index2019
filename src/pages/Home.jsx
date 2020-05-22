import React from 'react';

import { Row, Col, Card, Carousel } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
// TODO: need click handler to push location to router history

import '../styles/Home.css';

const Home = ({ data, hdrs, onClick }) => {
  const cards = data.map((d, i) => {
    return (
      <TileHolder key={ `tile-${ i }` } hdr={ hdrs[d.page] } onClick={ onClick } { ...d } />
    )
  });
  return (
    <div className='Home'>
      <Row xs={ 1 } sm={ 2 } md={ 3 }>
        { cards }
      </Row>
    </div>
  );
};

const TileHolder = ({ label, page, hdr, onClick, df }) => {
  const tiles = df.map((d, i) => (
      <Carousel.Item><Card className='front-card bg-light d-block'>
        <Card.Body>
          <div className='location'>{ d.name }</div>
          <div className='datapoint text-info'>{ d.value }</div>
          <div className='datalbl'>{ label }</div>
        </Card.Body>
        <Card.Footer className='front-card-footer'>
          View <Link to={ '/' + page } onClick={ onClick }>{ hdr }</Link>
        </Card.Footer>
      </Card></Carousel.Item>

  ));
  return (
    <Col className='my-2'>
      <div className=''>
        <Carousel controls={ true } interval={ null }>{ tiles }</Carousel>
      </div>
    </Col>
  );
};

const Tile = ({ name, value, label, page, hdr, onClick }) => (
  <Col className='my-2'>
    <div className='h-100'>
      <Card className='front-card bg-light h-100'>
        <Card.Body>
          <div className='location'>{ name }</div>
          <div className='datapoint text-info'>{ value }</div>
          <div className='datalbl'>{ label }</div>
        </Card.Body>
        <Card.Footer className='front-card-footer'>
          View <Link to={ '/' + page } onClick={ onClick }>{ hdr }</Link>
        </Card.Footer>
      </Card>
    </div>
  </Col>
);

export default Home;
