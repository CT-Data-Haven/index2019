import React from 'react';
import { titleLabel } from './utils.js';

import '../styles/Legend.css';

const Legend = ({ scale, margin }) => {
  // const domain = scale.domain();
  return (
    <g id='legend' transform={ `translate(${ margin.left + 10 },${ margin.top + 10 })` }>
      { scale.domain().map((d, i) => (
        // <text key={ `legend-${ i }` } x={ 0 } dy={ '8em' }>{ d }</text>
        <g key={ `legendline-${ i }` } transform={ `translate(0,${ i * 15 })` }>
          <circle fill={ scale(d) } cx='0' cy='0' r='4' />
          <text key={ `legendtxt-${ i }` } dx='0.6em' dy='0.25em'>
            { titleLabel(d) }
          </text>
        </g>
      )) }
    </g>
  );
};

export default Legend;

// <tspan backgroundColor={ scale(d) } className='legendDot'>•</tspan> { titleLabel(d) }
