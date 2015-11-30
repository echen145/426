import { GET_DIRECTION } from '../actions/map'

const initialState = {
  startLat: 35.912875,
  startLong: -79.053198,
  destLat: 35.779094,
  destLong: -78.643692
}

export default function map(state = initialState, action) {
  switch (action.type) {
    case GET_DIRECTION:
      console.log(action)
      return (Object.assign({}, {
        startLat: action.direction.startLat,
        startLong: action.direction.startLong,
        destLat: action.direction.destLat,
        destLong: action.direction.destLong
      })) 

    default:
      return state
  }
}