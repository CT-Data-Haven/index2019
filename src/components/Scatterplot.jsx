import React from 'react';
import { ResponsiveXYFrame } from 'semiotic';
import { Vivid } from 'cartocolor';
import * as _ from 'lodash';

import Legend from './Legend';
import Tip from './Tip';
import '../styles/Chart.css';

import { cleanIdxLabels, createScales, titleLabel } from './utils.js';

const Scatterplot = (props) => {
  const [xAccess, yAccess] = props.vs;
  const { colorscale, sizescale } = createScales(props.data, Vivid, 'level', false);

  const xRange = [_.min(_.map(props.data, xAccess)), _.max(_.map(props.data, xAccess))];
  const yRange = [_.min(_.map(props.data, yAccess)), _.max(_.map(props.data, yAccess))];
  const pad = 0.05;
  const margin = { top: 10, right: 10, bottom: 60, left: 80 };
  const fmt = props.numFmt || ((d) => d);

  return (
    <div className='Chart Scatterplot'>
      <ResponsiveXYFrame
        points={ props.data }
        margin={ margin }
        size={ [600, 500] }
        xAccessor={ xAccess }
        yAccessor={ yAccess }
        pointStyle={ (d) => ({
          fill: colorscale(d.level),
          stroke: colorscale(d.level),
          r: sizescale(d.level),
          opacity: 0.8
        }) }
        xExtent={ [xRange[0] * (1 - pad), xRange[1] * (1 + pad)] }
        yExtent={ [yRange[0] * (1 - pad), yRange[1] * (1 + pad)] }
        axes={[
          { orient: 'left', label: cleanIdxLabels(yAccess), baseline: 'under', tickFormat: fmt },
          { orient: 'bottom', label: cleanIdxLabels(xAccess), baseline: 'under', tickFormat: fmt }
        ]}
        responsiveWidth={ true }
        // foregroundGraphics={ <Legend color={ colorscale } size={ sizescale } margin={ margin } /> }
        hoverAnnotation={ [(d) => ({
          type: 'frame-hover',
          color: colorscale(d.level)
        })] }
        svgAnnotationRules={ ({ screenCoordinates, d }) => (d && d.type === 'frame-hover') ? hover(d, screenCoordinates[0], screenCoordinates[1], colorscale) : null }
        tooltipContent={ (d) => (
          <Tip data={ d.data } type='scatter'
            vs={ props.vs }
            hdr='name'
            tipLblr={ (d) => cleanIdxLabels(d).match(/[A-Z]/g).join('') }
            numFmt={ fmt }
          />
        ) }
      />
      <Legend
        type='ordinal'
        scale={ colorscale }
        labelFormat={ (d) => titleLabel(d) }
        style={{
          right: '4px',
          bottom: '45px'
        }}
      />
    </div>
  )
};


const hover = (d, x, y, color) => (
  <g key={ `${ hover }-tip` } className='hover-circle'>
    <circle
      cx={ x }
      cy={ y }
      r={ 12 }
      fillOpacity={ 1.0 }
      strokeOpacity={ 1.0 }
      stroke={ color(d.level) }
      fill={ color(d.level) }
    ></circle>
  </g>
);

export default Scatterplot;
