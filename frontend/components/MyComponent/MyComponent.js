import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  ButtonToolbar,
  ButtonGroup
} from 'react-bootstrap';

import {
  getRoutePath
} from 'CommonUtil/CommonUtil.js';

import MyCustomSortTable from 'MyCustomSortTable/MyCustomSortTable.js';
import MyModal from 'MyModal/MyModal.js';

export class MyComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  showMyModal() {
    console.log('showMyModal called');
    this.props.showMyModal();
  }

  render() {
    return (
      <div>
        <h2>My Custom Sortable Table:</h2>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12">
              <MyCustomSortTable />
            </div>
          </div>
        </div>
        <MyModal />
      </div>
    );
  }
}

// latest way to dispatch
MyComponent.contextTypes = {
    // @see https://github.com/grommet/grommet/issues/441
  router: React.PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return({
    showMyModal: function() {
      return dispatch({
        type: 'EVT_SHOW_MY_MODAL',
        showMyModal: true
      });
    }
  });
}

export default connect(
  function (storeState) {
    // store state to props
    return {
    };
  },
  mapDispatchToProps
)(MyComponent);