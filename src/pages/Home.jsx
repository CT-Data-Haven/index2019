import React from 'react';

import { Row, Col, Card } from 'react-bootstrap';

import '../styles/Home.css';

const Home = ({ data, hdrs }) => {
  const cards = data.map((d, i) => {
    console.log(hdrs[d.page]);
    return (
      <Col key={ `card-${ i }` } className='my-2'>
        <div className='h-100'>
          <Card className='front-card bg-light h-100'>
            <Card.Body>
              <div className='location'>{ d.name }</div>
              <div className='datapoint text-info'>{ d.value }</div>
              <div className='datalbl'>{ d.label }</div>
            </Card.Body>
            <Card.Footer className='front-card-footer'>View <a href={ d.page }>{ hdrs[d.page] }</a></Card.Footer>
          </Card>
        </div>
      </Col>
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

export default Home;
