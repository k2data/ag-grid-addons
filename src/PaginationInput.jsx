import React from 'react'

type Props = {
  onChange: Function,
  pages: Number,
  icons: Object
}
let oldPage = 1
export default class PaginationInput extends React.Component {
  props: Props
  constructor (props) {
    super(props)
    this.state = {
      value: 1
    }
    this.changePage = this.changePage.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.pageJump = this.pageJump.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.pages !== this.props.pages) {
      this.setState({ value: 1 })
    }
  }
  changePage (e) {
    const reg = /^[0-9]*$/
    if (reg.test(e.target.value)) {
      this.setState({ value: e.target.value })
      if (e.target.value !== '') {
        oldPage = e.target.value
      }
      this.props.onChange && e.target.value !== '' && this.props.onChange(e.target.value)
    }
  }
  onBlur (e) {
    this.setState({ value: Number(e.target.value) === 0 ? oldPage : e.target.value })
  }
  pageJump (arg) {
    console.info(arg)
    const { pages } = this.props
    const { value } = this.state
    let currentNum
    switch (arg) {
      case 'first':
        currentNum = 1
        break
      case 'pre':
        currentNum = value - 1
        break
      case 'next':
        currentNum = value + 1
        break
      case 'last':
        currentNum = pages
        break
      default:
        return
    }
    this.setState({ value: currentNum })
    oldPage = currentNum
    this.props.onChange && this.props.onChange(currentNum)
  }
  render () {
    const { pages, icons = {} } = this.props
    const { value } = this.state
    const that = this
    return (
      <div className='pagination-input'>
        <button disabled={!pages || value === 1} onClick={function () { that.pageJump('first') }}>
          {
            icons.first || <i className="fa fa-angle-double-left" aria-hidden="true" />
          }
        </button>
        <button disabled={!pages || value === 1} onClick={function () { that.pageJump('pre') }}>
          {
            icons.pre || <i className="fa fa-angle-left" aria-hidden="true" />
          }
        </button>
        <span className='pagination-change'>
          <input value={value}
            onBlur={this.onBlur}
            onChange={this.changePage} /> / {pages || 0}
        </span>
        <button disabled={!pages || value === pages} onClick={function () { that.pageJump('next') }}>
          {
            icons.next || <i className="fa fa-angle-right" aria-hidden="true" />
          }
        </button>
        <button disabled={!pages || value === pages} onClick={function () { that.pageJump('last') }}>
          {
            icons.last || <i className="fa fa-angle-double-right" aria-hidden="true" />
          }
        </button>
      </div>
    )
  }
}
