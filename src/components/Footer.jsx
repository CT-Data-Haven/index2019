import React from 'react';
import { Row, Col, Container, Alert } from 'react-bootstrap';
import '../styles/Footer.css';

const Footer = (props) => {
  let footerTxt;
  if (props.urls === undefined) {
    footerTxt = null;
  } else {
    const dl = `https://query.data.world/s/${ props.urls.slug }`;
    footerTxt = (
      <p>
        {`Download ${ props.display.toLowerCase() } data`} <a href={ dl }>here</a>, filter and analyze data online on <a href={ props.dw }>data.world</a> (requires free sign-up), or download/clone from <a href={ props.urls.github }>GitHub</a> (advanced users).
      </p>
    );
  }
  return (
    <div className='Footer'>
      <Container>
        <hr />
        <Row>
          <Col>
            <Alert variant='light' className='border'>
              <Alert.Heading >Download this data</Alert.Heading>
              { footerTxt }

              <p>For source and methodology information, see the <a href='https://ctdatahaven.org/reports'>2019 DataHaven Community Index reports.</a></p>
            </Alert>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
