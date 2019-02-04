import React from 'react';
import * as Table from 'reactabular-table';
import { connect } from 'react-redux';
import 'MyCustomSortTable/MyCustomSortTable.css';

let rows = [
  {id: 100, name: 'John', tools: {hammer: true}, country: 'fi'},
  {id: 101, name: 'Jack', tools: {hammer: false}, country: 'dk'},
  {id: 102, name: 'Jack', tools: {hammer: false}, country: 'dk'},
  {id: 103, name: 'Jack', tools: {hammer: false}, country: 'dk'},
  {id: 104, name: 'Jack', tools: {hammer: false}, country: 'dk'},
  {id: 105, name: 'Jack', tools: {hammer: false}, country: 'dk'}
];
const countries = {
  fi: 'Finland',
  dk: 'Denmark'
};

const columns = [
  {
    property: 'id',
    header: {
      label: 'ID'
    }
  },
  {
    property: 'name',
    header: {
      label: 'Name'
    }
  },
  {
    property: 'tools',
    header: {
      label: 'Active'
    },
    cell: {
      formatters: [
        tools => tools.hammer ? 'Hammertime' : 'nope'
      ]
    }
  },
  {
    property: 'country',
    header: {
      label: 'Country'
    },
    cell: {
      formatters: [
        country => countries[country]
      ]
    }
  }
];



export class MyCustomSortTable extends React.Component {
  componentDidMount() {
  }

  shouldComponentUpdate(nextProps) {
    return true;
  }

  sortByKey(array, key) {
    return array.sort(this.getSortedRows(key));
  }

  //Comparer Function  
  getSortedRows(prop) {  
    return function(a, b) {  
        if (a[prop] > b[prop]) {  
            return 1;  
        } else if (a[prop] < b[prop]) {  
            return -1;  
        }  
        return 0;  
    }  
  }  

  constructor(props) {
    super(props);
    this.state = {
     rows: this.props.sortedRows
    }
  }

  modifyState(key) {
    this.setState({rows : this.sortByKey(rows, key)});
  }

  render() {
    const BodyWrapper = props => <tbody {...props} />;
    const RowWrapper = props => <tr {...props} />;
    return (
      <Table.Provider
         className="table table-striped table-bordered"
         columns={columns}
         renderers={{
          body: {
            wrapper: BodyWrapper,
            row: RowWrapper
          }
        }}
         
         >
        <Table.Header onClick={(i) => {
          const cellText = i.target.innerHTML.toLowerCase();
          (cellText === 'active') ? this.modifyState('tools') : 
            this.modifyState(cellText);
        }}/>
        <Table.Body rows={this.state.rows} rowKey="id" />
      </Table.Provider>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return dispatch({
      type: 'EVT_SORT_TABLE',
      sortedRows: rows
    });
}

export default connect(
    function (storeState) {
      // store state to props
      return {
        sortedRows: rows
      };
    },
    mapDispatchToProps
)(MyCustomSortTable);