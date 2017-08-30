import React  from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import ApiItem from '../api-item/api-item';


function ApiList({removeApi, apis, updateApi}) {
  let apiItems = apis.map((api, index) => {
    return (
      <ApiItem
        key={index}
        api={api}
        removeApi={removeApi}
        updateApi={updateApi}
      />
    );
  });

  return (
    <div className="api-list">
      {apiItems}
    </div>
  );
}

ApiList.propTypes = {
  removeApi: PropTypes.func.isRequired,
  apis: PropTypes.instanceOf(List).isRequired,
  updateApi: PropTypes.func.isRequired
};

export default ApiList;
