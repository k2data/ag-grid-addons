import React from 'react'
import PaginationInput from '../lib/PaginationInput.js'
import PageNumChange from '../lib/PageNumChange.js'
import tagCellRender from '../lib/tagCellRender.js'
import Transfer from '../lib/Transfer.js'
// import TopChangePage from '../lib/TopPageChange.js'
// import AgTable from '../lib/AgTable.js'
// import ColDefs from '../lib/ColDefs.js'
import {AgGridReact} from 'ag-grid-react'
export default class App extends React.Component {
  constructor () {
    super()
    this.state = {
      rowdata: [],
      pages: 0,
      currentPage: 1,
      total: 0,
      pageSize: 20
    }
    this.gridOptions = {
      rowSelection: 'single',
      overlayLoadingTemplate: '<span class="ag-overlay-loading-center">LOADING</span>'
    }
    this.getData = this.getData.bind(this)
    this.pageChange = this.pageChange.bind(this)
    this.pageSizeChange = this.pageSizeChange.bind(this)
  }
  componentDidMount () {
    this.getData(20, 1)
  }
  pageChange (value) {
    this.getData(this.state.pageSize, value)
  }
  pageSizeChange (pageSize) {
    this.setState({ pageSize })
    this.getData(pageSize, 1)
  }

  getData (pageSize, page) {
    this.gridOptions.api.showLoadingOverlay()
    const url = 'http://192.168.130.121:8081/data-service/v2/field-groups?select=*&order=desc-createdAt'
    fetch(`${url}&pageSize=${pageSize}&page=${page}`)
    .then((res) => res.json())
    .then((json) => {
      this.setState({
        rowdata: json.fieldGroups,
        total: json.pageInfo.total,
        pages: json.pageInfo.pages,
        currentPage: page
      })
    })
  }
  render () {
    const { pages, rowdata, currentPage, pageSize, total } = this.state
    const colDefs = [{
      headerName: '序号', width: 40, cellRenderer: function (params) {
        return Number(params.node.id) + 1 + pageSize * (currentPage - 1)
      }},
      {
        headerName: 'ID', field: 'id',
        cellRender: function (params) {
          return `<a href='#'>${params.id}</a>`
        }
      },
      {
        headerName: '名称', field: 'name', enableCellChangeFlash: true
      },
      {
        headerName: '描述', field: 'description'
      },
      {
        headerName: '创建时间', field: 'createdAt'
      },
      {
        headerName: '更新时间', field: 'updateAt'
      },
      {
        headerName: '标签', field: 'tags', cellRender: (params) => { tagCellRender(params) }
      }
    ]

    const columnDefs = [
      {headerName: '序号'},
      {headerName: '列1', field: 'id'},
      {headerName: '列2', field: 'aid'},
      {headerName: '列3', field: 'bid'},
      {headerName: '列4', field: 'cid'},
      {headerName: '列5', field: 'did'},
      {headerName: '列6', field: 'eid'}
    ]

    const icons = {
      // pre: 'pre',
      // next: 'next',
      // first: 'first',
      // last: 'last'
    }

    const data = (() => {
      let arr = []
      for (let i = 0; i < 100000; i++) {
        arr.push({
          id: `id${i}`,
          aid: `aid${i}`,
          bid: `bid${i}`,
          cid: `cid${i}`,
          did: `did${i}`,
          eid: `eid${i}`
        })
      }
      return arr
    })()

    return (
      <div>
        <div style={{ height: '600px', width: '800px' }} className='ag-fresh'>
          <AgGridReact
            gridOptions={this.gridOptions}
            rowData={rowdata}
            columnDefs={colDefs}
             />
          {
            //  <div style={{ float: 'left', width: '100%' }}>
            //    <div style={{ float: 'right' }}>
            //      <PaginationInput
            //        onChange={this.pageChange}
            //        icons={icons}
            //        pages={pages} />
            //    </div>
            //    <div style={{ float: 'left' }}>
            //      <PageNumChange
            //        pagesize={[20, 10, 50]}
            //        total={total}
            //        onChange={this.pageSizeChange}
            //        />
            //    </div>
            //  </div>
           }
        </div>
        <div style={{ height: '200px' }}>
          <Transfer
            columnDefs={columnDefs}
            dataSource={data}
            />
        </div>
      </div>
    )
  }
}
// <AgTable
//   gridOptions={gridOptions}
//   columnDefs={colDefs}
//   rowData={rowdata}
//   enableColResize='true'
//   enableSorting='true'
//   rowHeight='34'
//   headerHeight='28'
//   rowBuffer='50'
//   debug='false'
//   />
