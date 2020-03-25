import React from 'react';
import { Alert, Button, Collapse } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { NoteContext } from './NoteContext.js';

import '../styles/Intro.css';

const Intro = (props) => (
  <NoteContext.Consumer>
    {
      ({ noteOpen, handleClose }) => (
        <div className='Intro'>
          <Alert variant='warning' className='border border-color-warning'>
            <Alert.Heading>
              A note from DataHaven
              <Button variant='link'
                className='close text-uppercase'
                data-dismiss='alert'
                aria-label='Close note'
                aria-controls='collapse-note'
                aria-expanded={ noteOpen }
                onClick={ handleClose }
              >
                { noteOpen ? 'hide' : 'show' }
              </Button>
            </Alert.Heading>
            <Collapse in={ noteOpen }>
              <ReactMarkdown source={ props.note } escapeHtml={ false } id='collapse-note' />
            </Collapse>
          </Alert>

          <Alert variant='light' className='border border-color-dark'>
            <ReactMarkdown source={ props.text } />
            <p>For more information, see the other pages in the menu above, or visit DataHaven's <a href="http://www.ctdatahaven.org/communities">Communities</a> page or <a href="http://www.ctdatahaven.org">main website</a>.</p>
          </Alert>
        </div>
      )}
  </NoteContext.Consumer>
);

export default Intro;
