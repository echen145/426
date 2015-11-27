import { GET_DIRECTION } from '../actions/map'

const initialState = {
  startLat: 41.8507300,
  startLong: -87.6512600,
  destLat: 41.8525800,
  destLong: -87.6514100
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