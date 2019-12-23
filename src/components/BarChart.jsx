import React from 'react';
import { ResponsiveOrdinalFrame } from 'semiotic';
import { Vivid } from 'cartocolor';
import * as _ from 'lodash';

import DataContext from './DataContext';
import Tip from './Tip';
import '../styles/Chart.css';

import { cleanIdxLabels, cleanHdrLabels, createScales, wrapTspan } from './utils.js';

const BarChart = (props) => {
  const data = React.useContext(DataContext);
  const { colorscale, sizescale } = createScales(data, Vivid, props.colorVar, props.colorVar === 'category');
  const fmt = props.numFmt || ((d) => d);

  const labels = data.map((d) => ({
    label: fmt(d[props.rAccess]),
    [props.oAccess]: d[props.oAccess],
    [props.rAccess]: d[props.rAccess],
    type: 'bar-label'
  }));



  return (
    <div className='Chart'>
      <ResponsiveOrdinalFrame
        data={ data }
        margin={ { top: 10, right: 10, bottom: 10, left: 120 } }
        oAccessor={ props.oAccess }
        rAccessor={ props.rAccess }
        type='bar'
        oPadding={ 8 }
        oLabel={ true }
        projection='horizontal'
        style={ (d) => ({
          fill: colorscale(d[props.colorVar]),
          stroke: 'white',
          strokeWidth: '1px',
          opacity: 0.8
        }) }

        annotations={ labels }
        svgAnnotationRules={ (d) => lblRules(d, props.oAccess, props.rAccess, fmt) }
        responsiveWidth={ true }
        pieceHoverAnnotation={ [{
          // type: 'desaturation-layer'
        }, {
          type: 'highlight',
          style: (d) => ({
            opacity: 1.0,
            stroke: '#444'
          })
        }] }

      />
    </div>
  );
};


const IdxBarChart = (props) => {
  const rAccess = props.vs[0];
  const oAccess = rAccess === 'community' ? 'name': 'group';
  const colorVar = rAccess === 'community' ? 'level' : 'category';

  return (
    <BarChart
      oAccess={ oAccess }
      rAccess={ rAccess }
      colorVar={ colorVar }
    />
  );
};

const QBarChart = (props) => {
  return (
    <BarChart
      oAccess={ 'group' }
      rAccess={ props.vs[0] }
      colorVar={ 'category' }
      numFmt={ props.numFmt }
    />
  );
};

////////// labels

////// check width of bar; if under some amount, positive dx and dark label
const lblRules = ({ screenCoordinates, d }, oAccess, rAccess, fmt) => {
  if (d.type === 'bar-label') {
    const missing = isNaN(screenCoordinates[0]);
    const coords = missing ? [0, screenCoordinates[1]] : screenCoordinates;
    const small = coords[0] < 30;
    return (
      <g
        className={ `direct-label ${ small ? 'dark' : 'light' }` }
        key={ `lbl-${ d[oAccess] }` }
        transform={ `translate(${ coords })` }
      >
        <text x={ 0 } y={ 0 } dx={ small ? '1.4em' : '-0.3em' } dy={ 3 }>{ fmt(d[rAccess]) }</text>
      </g>
    )
  } else {
    return null;
  }
};

export { IdxBarChart, QBarChart };
