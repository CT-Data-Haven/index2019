import React from 'react';
import { Table } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';

import DataContext from './DataContext';
import { cleanHdrLabels, tblColumns, fmt, getMaxes } from './utils.js';

import '../styles/DataTable.css';

const DataTable = ({ v1, meta, spark, sort }) => {
  const data = React.useContext(DataContext);
  const isCommunity = v1 === 'community';
  const mightOmit = isCommunity ? ['group'] : ['name'];
  const omit = ['level', 'category', 'region', ...mightOmit];

  // colnames of what will be displayed
  const colNames = tblColumns(data[0], omit);
  const maxes = getMaxes(data);

  const cols = colNames.map((col, i) => {
    let formatter;
    const isNumber = meta[col] !== undefined;
    if (isNumber) {
      if (spark) {
        formatter = makeSpark(meta[col], col, maxes);
      } else {
        formatter = fmt(meta[col]);
      }
    } else {
      formatter = null;
    }
    return {
      dataField: col,
      text: cleanHdrLabels(col),
      sort: sort,
      type: (isNumber ? 'number' : 'string'),
      classes: (!isNumber ? 'position-sticky' : null),
      headerClasses: (!isNumber ? 'position-sticky' : null),
      formatter: formatter,
      formatExtraData: spark,
      align: (spark || !isNumber ? 'left' : 'right')
    };
  });

  return (
    <div className='DataTable' id='datatable'>
      <BootstrapTable
        bootstrap4
        hover
        condensed
        classes='table-responsive-xl'
        headerClasses='thead-light'
        bordered={ true }
        keyField={ isCommunity ? 'name' : 'group' }
        data={ data }
        columns={ cols }
      />
    </div>
  )
};


const makeSpark = (format, col, maxes) => (cell, row, rowIndex, extraData) => {
  const max = maxes[col];
  const scaled = (cell / max) * 100;
  const w = cell ? (scaled + '%') : 0;
  return (
    <div className='spark' style={{ width: w }}>
      <span className='sparktext'>{ fmt(format)(cell) }</span>
    </div>
  )
};

export default DataTable;
