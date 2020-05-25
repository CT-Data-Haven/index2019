import React from 'react';

import { Carousel, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

const Tile = (props) => {
  const tiles = props.df.map((d, i) => (
    <Carousel.Item>
      <Card.Body className=''>
        <div className='location'>{ d.name }</div>
        <div className='mx-3'>
          <div className='datapoint text-info'>{ d.value }</div>
          <div className='datalbl'>{ props.label }</div>
        </div>
      </Card.Body>
    </Carousel.Item>
  ));

  return (
   <Col className='mt-3 mb-5'>
     <div className='h-100'>
       <Carousel
         as={ LightCard }
         controls={ true }
         interval={ null }
         prevIcon={ <LeftIcon /> }
         nextIcon={ <RightIcon /> }
       >
         { tiles }
       </Carousel>
     </div>
     <Card.Footer className='front-card-footer mt-auto'>
       View <Link to={ '/' + props.page } onClick={ props.onClick }>{ props.hdr }</Link>
     </Card.Footer>
   </Col>
  );
};

const LightCard = (props) => (
  <Card className='front-card bg-light h-100'>
    { props.children }
  </Card>
);

const LeftIcon = () => (
  <IconContext.Provider value={{ color: '#707f8f', size: '1.5em', ariaHidden: 'true' }}>
    <FaAngleLeft />
  </IconContext.Provider>
);
const RightIcon = () => (
  <IconContext.Provider value={{ color: '#707f8f', size: '1.5em', ariaHidden: 'true' }}>
    <FaAngleRight />
  </IconContext.Provider>
);

export default Tile;
