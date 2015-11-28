import React from 'react'
import {Route} from 'react-router'
import Home from '../components/Home' 
import Setting from '../components/Setting'
import App from '../containers/App'
import NotFound from '../components/NotFound'


export default function getRoutes() {
  return (
    <Route path="/" component={App}>
      <Route path="home" component={Home} />
      <Route path="setting" component={Setting} />
      <Route path="*" component={NotFound} status={404} />
    </Route>
  )
}