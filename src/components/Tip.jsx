import React from 'react';

import '../styles/Tooltip.css';

const Tip = (props) => {
  const lbls = props.tipLblr ? props.vs.map(props.tipLblr) : props.vs;
  const content = props.vs.map((d, i) => (
    <div key={ `tip-div${ i }` }>
      <p key={ `tip-p${ i }` }><span key={ `tip${ i }` }>{ lbls[i].length ? `${ lbls[i] }: ` : '' } </span>{ props.numFmt(props.data[d]) }</p>
    </div>
));

  return (
    <div className='Tooltip'>
      <h5>{ props.data[props.hdr] }</h5>
      { content }
    </div>
  );
};

export default Tip;
