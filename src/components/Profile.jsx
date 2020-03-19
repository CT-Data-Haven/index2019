import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

import '../styles/Profile.css';

const Profile = (props) => {
  const cols = props.cols || ['Indicator', 'Value'];
  const columns = [{
    dataField: 'indicator',
    text: cols[0],
    sort: false,
    headerStyle: () => ({ width: '80%' })
  }, {
    dataField: 'value',
    text: cols[1],
    sort: false,
    align: 'right',
    // formatter: fmt('0.0%'),
    classes: 'text-right',
    headerStyle: () => ({ width: '20%' })
  }];

  return (
    <div className='Profile DataTable' id='profile'>
      <BootstrapTable
        bootstrap4
        classes='table-responsive-sm'
        headerClasses='thead-light'
        bordered={ true }
        keyField={ 'indicator' }
        data={ props.data }
        columns={ columns }
      />
    </div>
  )
};

export default Profile;
