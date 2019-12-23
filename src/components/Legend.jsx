import React from 'react';
import { titleLabel } from './utils.js';

import '../styles/Legend.css';

const Legend = ({ color, size, margin }) => {
  return (
    <g className='Legend' id='legend' transform={ `translate(${ margin.left + 10 },${ margin.top + 10 })` }>
      { color.domain().map((d, i) => (
        <g key={ `legendline-${ i }` } transform={ `translate(0,${ i * 15 })` }>
          <circle fill={ color(d) } cx='0' cy='0' r={ size(d) - 1 } />
          <text key={ `legendtxt-${ i }` } dx='0.6em' dy='0.28em'>
            { titleLabel(d) }
          </text>
        </g>
      )) }
    </g>
  );
};

export default Legend;
