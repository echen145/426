import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Home from '../components/Home' 
import Setting from '../components/Setting'
import App from '../containers/App'
import NotFound from '../components/NotFound'
import MainScreen from '../containers/MainScreen'
import FundList from '../components/FundList'
import FundScreen from '../containers/FundScreen'

export default function getRoutes() {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={MainScreen} />
      <Route path="funds" component={FundList}> 
      </Route>
      <Route path="/fund/:fundId" component={FundScreen} />
      <Route path="settings" component={Setting} />
      <Route path="*" component={NotFound} status={404} />
    </Route>
  )
}