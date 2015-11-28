import { ADD_FUND } from '../actions/fund'

export default function fund(state = [], action) {
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