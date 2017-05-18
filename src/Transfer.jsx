import React from 'react'
import Clusterize from 'clusterize.js/clusterize.js'
import 'clusterize.js/clusterize.css'
import R from 'ramda'
type Props = {
  columnDefs: Array,
  dataSource: Array
}
export default class Transfer extends React.Component {
  props: Props
  constructor (props) {
    super(props)
    this.initTransfer = this.initTransfer.bind(this)
  }
  componentDidMount () {
    this.initTransfer(this.props)
  }
  componentWillReceiveProps (nextProps) {
    if (!R.equals(nextProps, this.props)) {
      console.info(nextProps)
      this.initTransfer(nextProps)
    }
  }
  initTransfer (props) {
    // const data = ['<div>1</div>', '<div>2</div>', '<div>3</div>', '<div>4</div>']
    let itemData = (item) =>
      props.columnDefs.map((col, index) => {
        return `<li style='width: ${col.width || '200px'}' key='col${index}'>${item[col.field] || ''}</li>`
      })

    let data = props.dataSource.map((item, index) => {
      return `<div class='item'>
        <ul>
          ${
            itemData(item).join('')
          }
        </ul>
      </div>`
    })
    // for (let i = 0; i < 10000; i++) {
    //   // data.push(`<div>test${i}</div>`)
    //   data.push(`<div class='item'>
    //     <ul>
    //       <li>name${i}</li>
    //       <li>attrs${i}</li>
    //       <li>description${i}</li>
    //     </ul>
    //   </div>`)
    // }
    Clusterize({
      rows: data,
      scrollId: 'scrollArea',
      contentId: 'contentArea'
    })
  }
  render () {
    const { columnDefs = [] } = this.props
    return (
      <div style={{ height: '100%' }} className='transfer'>
        <div className='transfer-header'>
          <ul>
            {
              columnDefs.map((col, index) => {
                return <li key={col.headerName || index}
                  style={{width: col.width || '200px'}}
                  >
                  {col.headerName || ''}
                </li>
              })
            }
          </ul>
        </div>
        <div id='scrollArea' className='clusterize-scroll'>
          <div id='contentArea' className='clusterize-content'>
            <div className='clusterize-no-data'>Loading data…</div>
          </div>
        </div>
      </div>
    )
  }
}
