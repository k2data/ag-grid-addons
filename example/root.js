/* eslint-env browser */
/* eslint no-unused-vars: 0 */

import DOM from 'react-dom'
import React from 'react'
import App from './App'
import 'ag-grid/dist/styles/ag-grid.css'
import 'ag-grid/dist/styles/theme-dark.css'
import '../lib/ag-grid-addons.css'
import 'font-awesome/css/font-awesome.css'
DOM.render(
  <App />,
  document.getElementById('root')
)
