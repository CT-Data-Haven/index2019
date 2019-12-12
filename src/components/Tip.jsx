import React from 'react';
import { cleanIdxLabels } from './utils.js';

import '../styles/Tooltip.css';

const Tip = ({ data, type, v1, v2, hdr }) => {
  const v1Lbl = cleanIdxLabels(v1).match(/[A-Z]/g).join('');
  const v2Lbl = cleanIdxLabels(v2).match(/[A-Z]/g).join('');
  let content;
  if (type === 'bar') {
    content = (<p><span>{`${ v1Lbl }:`}</span> { data[v1] }</p>);
  } else {
    content = (
      <>
        <p><span>{`${ v1Lbl }:`}</span> { data[v1] }</p>
        <p><span>{`${ v2Lbl }:`}</span> { data[v2] }</p>
      </>
    );
  }
  const tooltip = (
    <>
      <h5>{ data[hdr] }</h5>
      { content }
    </>
  );

  return (<div className='Tooltip'>{ tooltip }</div>);
};

export default Tip;
