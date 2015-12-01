import { combineReducers } from 'redux'
import map from './map'
import fund from './fund'
import login from './login'
import settings from './settings'
import {routeReducer} from 'redux-simple-router'

const rootReducer = combineReducers({
  map,
  fund,
  login,
  settings,
  routing: routeReducer
})

export default rootReducer