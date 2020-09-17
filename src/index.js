import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './components/app'
import { DataProvider } from './components/data-service-context'
import DataService from './services/data-service'

const dataService = new DataService()

ReactDOM.render(
  <DataProvider value={dataService}>
    <Router>
      <App />
    </Router>
  </DataProvider>

  , document.querySelector('#root')
)
