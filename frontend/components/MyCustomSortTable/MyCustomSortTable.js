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
      label: 'ID',
      transforms: [
        // label => ({
        //   onClick: () => sortByKey(rows, 'id')// console.log(`clicked ${label}`)
        // })
      ]
    }
  },
  {
    property: 'name',
    header: {
      label: 'Name',
      transforms: [
        // label => ({
        //   onClick: () => sortByKey(rows, 'name')
        // })
      ]
    }
  },
  {
    property: 'tools',
    header: {
      label: 'Active',
      transforms: [
        // label => ({
        //     onClick: () => sortByKey(rows, 'tools') // console.log(`clicked ${label}`)
        // })
      ]
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
      label: 'Country',
      transforms: [
        // label => ({
        //     onClick: () => sortByKey(rows, 'country')
        // })
      ]
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

  render() {
    return (
      <Table.Provider
         className="table table-striped table-bordered"
         columns={columns} >
        <Table.Header onClick={(i) => {
          const cellText = i.target.innerHTML.toLowerCase();
          (cellText === 'active') ? this.setState({rows : this.sortByKey(rows, 'tools')}) : 
            this.setState({rows : this.sortByKey(rows, cellText)})

            console.log(this.state.rows, 'ROWS');
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