import { TOGGLE_THEME } from '../actions/settings'

const initialState = {
  isLight: true
}

export default function settings (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_THEME:
      return (Object.assign({}, {
        isLight: !action.isLight       
      }))
    default:
      return state
  }
}