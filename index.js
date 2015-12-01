import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router } from 'react-router'
import getRoutes from './components/root'
import {syncReduxAndRouter} from 'redux-simple-router'


const store = configureStore()
const history = createBrowserHistory()

syncReduxAndRouter(history, store)

render(
  <Provider store={store}>
    <Router history={history}>
      {getRoutes()}
   	</Router>
  </Provider>,
  document.getElementById('main')
)
