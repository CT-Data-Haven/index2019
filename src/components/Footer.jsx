import React from 'react';
import { Row, Col, Container, Alert } from 'react-bootstrap';
import '../styles/Footer.css';

const Footer = (props) => {
  const dwBase = 'https://fakedataworld/';
  const ghBase = 'https://fakegithub/';
  return (
    <div className='Footer'>
      <Container>
        <hr />
        <Row>
          <Col>
            <Alert variant='light' className='border'>
              <Alert.Heading className='text-primary'>Download this data</Alert.Heading>
              <p>View, filter, and download { props.display.toLowerCase() } data on <a href={ dwBase + props.url }>data.world</a> (all users), or download from <a href={ ghBase + props.url }>GitHub</a> (advanced users).</p>

              <p>For source and methodology information, see the <a href='https://ctdatahaven.org/reports'>2019 DataHaven Community Index reports.</a></p>
            </Alert>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
