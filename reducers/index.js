import { combineReducers } from 'redux'
import counter from './counter'
import {routeReducer} from 'redux-simple-router';

const rootReducer = combineReducers({
  routing: routeReducer
})

export default rootReducer
