import React from 'react';
import { Alert } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { NoteContext } from './NoteContext.js';

import '../styles/Intro.css';

const Intro = (props) => (
  <NoteContext.Consumer>
    {
      ({ noteOpen, handleClose }) => (
        <div className='Intro'>
          {noteOpen && <Alert variant='info' dismissible onClose={ handleClose } className='border border-color-info'>
            <Alert.Heading>A note from DataHaven</Alert.Heading>
            <ReactMarkdown source={ props.intro['covid'] } escapeHtml={ false } />
          </Alert>}

          <Alert variant='light' className='border border-color-dark'>
            <ReactMarkdown source={ props.intro[props.page] } />
            <p>For more information, visit DataHaven's <a href="http://www.ctdatahaven.org/communities">Communities</a> page or <a href="http://www.ctdatahaven.org">main website</a>.</p>
          </Alert>
        </div>
      )}
  </NoteContext.Consumer>
);

export default Intro;
