import { combineReducers } from 'redux'
import map from './map'
import {routeReducer} from 'redux-simple-router';

const rootReducer = combineReducers({
  map,
  routing: routeReducer
})

export default rootReducer