import { combineReducers } from 'redux'
import map from './map'
import fund from './fund'
import {routeReducer} from 'redux-simple-router'

const rootReducer = combineReducers({
  map,
  fund,
  routing: routeReducer
})

export default rootReducer