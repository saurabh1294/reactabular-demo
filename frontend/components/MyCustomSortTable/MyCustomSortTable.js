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

  sortByKey(array, key, sortOrder) {
    return array.sort(this.getSortedRows(key, sortOrder));
  }

  //comparer Function  
  getSortedRows(prop, sortOrder) {  
    return function(a, b) {
      const hammerA = (a[prop].hasOwnProperty('hammer')) ? a[prop].hammer : '';
      const hammerB = (b[prop].hasOwnProperty('hammer')) ? b[prop].hammer : '';
      if (hammerA !== '' && hammerB !== '') {
        if (hammerA < hammerB) {  
          return (sortOrder === 'ASC') ? 1 : -1;  
        } else if (hammerA > hammerB) {  
          return (sortOrder === 'DESC') ? -1 : 1;   
        }
      }

      else {
        if (a[prop] > b[prop]) {  
          return (sortOrder === 'ASC') ? 1 : -1;   
        } else if (a[prop] < b[prop]) {  
          return (sortOrder === 'DESC') ? -1 : 1;   
        } 
      }
      return 0;  
    }  
  }  

  constructor(props) {
    super(props);
    this.state = {
      rows: this.props.sortedRows,
      sortOrder: 'UNSORTED'
    }
  }

  modifyState(key) {
    if (this.state.sortOrder === 'UNSORTED') {
      this.setState({sortOrder: 'ASC'});
    } else if (this.state.sortOrder === 'DESC') {
      this.setState({sortOrder: 'ASC'});
    }
    else{
      this.setState({sortOrder: 'DESC'});
    }
    this.setState({rows : this.sortByKey(rows, key, this.state.sortOrder)});
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