import React from 'react';
import { Table, Card, ListGroup } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';

import DataContext from './DataContext';
import { cleanHdrLabels, fmt } from './utils.js';

import '../styles/Profile.css';

const Profile = (props) => {
  const data = React.useContext(DataContext);

  const columns = [{
    dataField: 'display',
    text: 'Survey question',
    sort: false,
    headerStyle: () => ({ width: '80%' })
  }, {
    dataField: 'value',
    text: 'Value',
    sort: false,
    align: 'right',
    formatter: fmt('0.0%'),
    classes: 'text-right',
    headerStyle: () => ({ width: '20%' })
  }];

  // console.log(data);

  return (
    <div className='Profile DataTable' id='profile'>
      <BootstrapTable
        bootstrap4
        classes='table-responsive-sm'
        headerClasses='thead-light'
        bordered={ true }
        keyField={ 'display' }
        data={ data }
        columns={ columns }
      />
    </div>
  )
};

export default Profile;
