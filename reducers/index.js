import { combineReducers } from 'redux'
import map from './map'
import fund from './fund'
import login from './login'

import {routeReducer} from 'redux-simple-router'

const rootReducer = combineReducers({
  map,
  fund,
  login,
  routing: routeReducer
})

export default rootReducer