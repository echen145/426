import { ADD_FUND } from '../actions/funds'

export default function funds(state = [], action) {
  switch (action.type) {
    case ADD_FUND: 
      return [
        ...state,
        action.fund
      ]
    default:
      return state
  }
}