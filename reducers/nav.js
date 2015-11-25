import { TOGGLE_NAV } from '../actions/nav'

export default function nav(state = false, action) {
  switch (action.type) {
    case TOGGLE_NAV:
      return !state
    default:
      return state
  }
}