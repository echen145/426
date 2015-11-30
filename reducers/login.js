import { LOG_IN, LOG_OUT } from '../actions/login'

const initialState = {
  loggedIn: false,
  idToken: null
}

export default function login(state=initialState, action) {
  switch (action.type) {
    case LOG_IN:
      return (Object.assign({}, {
        loggedIn: true,
        idToken: action.idToken
      }))
    case LOG_OUT:
      return (Object.assign({}, {
        loggedIn: false,
        idToken: null
      }))
    default:
      return state
  }
}