import { combineReducers } from 'redux'
import map from './map'
import funds from './funds'
import login from './login'
import settings from './settings'
import {routeReducer} from 'redux-simple-router'

const rootReducer = combineReducers({
  map,
  funds,
  login,
  settings,
  routing: routeReducer
})

export default rootReducer