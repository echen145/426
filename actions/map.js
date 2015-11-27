export const GET_DIRECTION = 'GET_DIRECTION'

export function getDirection(direction) {
  return {
    type: GET_DIRECTION, 
    direction
  }
}