import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './main/routes/router'

import './public/styles/global.scss'
import './public/styles/grid.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router />
)
