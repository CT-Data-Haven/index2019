import React from 'react';
import { Table } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';

import DataContext from './DataContext';
import { cleanHdrLabels, tblColumns } from './utils.js';

import '../styles/DataTable.css';

const DataTable = (props) => {
  const data = React.useContext(DataContext);
  const isCommunity = props.v1 === 'community';
  const mightOmit = isCommunity ? ['group'] : ['name'];
  const omit = ['level', 'category', 'region', ...mightOmit];

  const columns = tblColumns(data[0], omit, props.meta);
  // console.log(data);

  return (
    <div className='DataTable' id='datatable'>
      <BootstrapTable
        bootstrap4
        classes='table-responsive-md'
        headerClasses='thead-light'
        bordered={ true }
        keyField={ isCommunity ? 'name' : 'group' }
        data={ data }
        columns={ columns }
      />
    </div>
  )
};

export default DataTable;
