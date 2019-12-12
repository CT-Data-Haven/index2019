import React from 'react';
import { ResponsiveOrdinalFrame } from 'semiotic';
import { Vivid } from 'cartocolor';
import * as _ from 'lodash';

import DataContext from './DataContext';
import Tip from './Tip';
import '../styles/Chart.css';

import { cleanIdxLabels, createScales, wrapTspan } from './utils.js';

const BarChart = (props) => {
  const data = React.useContext(DataContext);

  const { v1, v2 } = props;
  const colorVar = v1 === 'community' ? 'level' : 'category';
  const { colorscale, sizescale } = createScales(data, Vivid, colorVar, colorVar === 'category');

  return (
    <div className='Chart'>
      <ResponsiveOrdinalFrame
        data={ data }
        margin={ { top: 10, right: 10, bottom: 60, left: 100 } }
        oAccessor={ v1 === 'community'? 'name' : 'group' }
        rAccessor={ v1 }
        type='bar'
        oPadding={ 9 }
        oLabel={ true }
        projection='horizontal'
        style={ (d) => ({
          fill: colorscale(d[colorVar]),
          stroke: 'white',
          strokeWidth: '1px',
          opacity: 0.8
        }) }
        axes={[
          { orient: 'bottom', label: cleanIdxLabels(v1), baseline: 'under' }
        ]}
        responsiveWidth={ true }
        hoverAnnotation={ true }
        tooltipContent={ (d) => (
          <Tip data={ d.pieces[0] } type='bar' v1={ v1 } v2={ v2 }
            hdr={ v1 === 'community' ? 'name' : 'group' }
          />
        ) }
      />
    </div>
  );
};

export default BarChart;
