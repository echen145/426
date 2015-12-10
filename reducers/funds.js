import { ADD_FUND, ADD_TO_FUND, INITIALIZE_FUNDS, DELETE_FUND, DELETE_DONATION } from '../actions/funds'

export default function funds(state = [], action) {
  let copy = null
  switch (action.type) {
    case ADD_FUND: 
      return  Object.assign({}, state, {
        [action.index]: action.fund
      })

    case ADD_TO_FUND:
      const fundIndex = action.fundIndex
      const newDonation = parseInt(action.donation.amount, 10)
      const nextState = Object.assign({}, state, {
        [fundIndex]: Object.assign({}, state[fundIndex], {
          fundRaised: state[fundIndex].fundRaised + newDonation,
          donations: Object.assign({}, state[fundIndex].donations, {
            [action.index]: action.donation
          })              
        }) 
      })
      return nextState

    case INITIALIZE_FUNDS:
      return action.funds

    case DELETE_FUND:
      const index = action.index
      copy =  Object.assign({}, state)
      delete copy[index]
      return copy
      
    case DELETE_DONATION:
      copy = Object.assign({}, state, {
        [action.fundIndex]: Object.assign({}, state[action.fundIndex], {
          fundRaised: action.amount
        })
      })
      delete copy[action.fundIndex]['donations'][action.index]
      return copy

    default:
      return state
  }
}
