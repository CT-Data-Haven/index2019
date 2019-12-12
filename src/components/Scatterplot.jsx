import React from 'react';
import { ResponsiveXYFrame, FacetController } from 'semiotic';
import { Vivid } from 'cartocolor';
import * as _ from 'lodash';

import DataContext from './DataContext';
import Legend from './Legend';
import Tip from './Tip';
import '../styles/Chart.css';

import { cleanIdxLabels, createScales } from './utils.js';

const Scatterplot = (props) => {
  const data = React.useContext(DataContext);

  const { v1, v2 } = props;
  const { colorscale, sizescale } = createScales(data, Vivid, 'level', false);

  const xRange = [_.min(_.map(data, v1)), _.max(_.map(data, v1))];
  const yRange = [_.min(_.map(data, v2)), _.max(_.map(data, v2))];
  const pad = 0.05;
  const margin = { top: 10, right: 10, bottom: 60, left: 80 };
  // console.log(v1, v2);

  return (
    <div className='Chart'>
      <ResponsiveXYFrame
        points={ data }
        margin={ margin }
        size={ [600, 500] }
        xAccessor={ v1 }
        yAccessor={ v2 }
        pointStyle={ (d) => ({
          fill: colorscale(d.level),
          r: sizescale(d.level),
          opacity: 0.8
        }) }
        xExtent={ [xRange[0] * (1 - pad), xRange[1] * (1 + pad)] }
        yExtent={ [yRange[0] * (1 - pad), yRange[1] * (1 + pad)] }
        axes={[
          { orient: 'left', label: cleanIdxLabels(v2), baseline: 'under' },
          { orient: 'bottom', label: cleanIdxLabels(v1), baseline: 'under' }
        ]}
        responsiveWidth={ true }
        // responsiveHeight={ true }
        foregroundGraphics={ <Legend scale={ colorscale } margin={ margin } /> }
        hoverAnnotation={ true }
        tooltipContent={ (d) => (
          <Tip data={ d.data } type='scatter' v1={ v1 } v2={ v2 } hdr='name' />
        ) }
      />
    </div>
  )
};

export default Scatterplot;
