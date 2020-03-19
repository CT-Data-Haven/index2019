import React from 'react';
import { LegendThreshold, LegendOrdinal } from '@vx/legend';
import { fmt } from './utils.js';

import '../styles/Legend.css';

const legendTypes = {
  threshold: LegendThreshold,
  ordinal: LegendOrdinal
};

const Legend = (props) => {
  const LegendByType = legendTypes[props.type];
  const format = props.labelFormat || ((label) => label ? fmt(props.format)(label) : '');
  return (
    <div className='Legend' style={ props.style }>
      <LegendByType
        labelFormat={ format }
        scale={ props.scale }
      />
    </div>
  );
};



export default Legend;
