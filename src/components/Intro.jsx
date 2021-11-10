import React from 'react';
import { Alert } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { NoteContext } from '../utils/NoteContext.js';

import '../styles/Intro.css';

const Intro = (props) => (
  <NoteContext.Consumer>
    {
      ({ noteOpen, handleClose }) => (
        <div className='Intro'>
          { /* intro text block */ }
          { props.text && <Alert variant='light' className='border border-color-dark'>
            <ReactMarkdown source={ props.text } />
            <p>For more information, see the other pages in the menu above, or visit DataHaven's <a href="http://www.ctdatahaven.org/communities">Communities</a> page or <a href="http://www.ctdatahaven.org">main website</a>.</p>
          </Alert> }
        </div>
      )}
  </NoteContext.Consumer>
);

export default Intro;
