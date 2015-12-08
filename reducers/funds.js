import { ADD_FUND, ADD_TO_FUND, INITIALIZE_FUNDS } from '../actions/funds'

export default function funds(state = [], action) {
  console.log(state)
  switch (action.type) {
    case ADD_FUND: 
      return [
        ...state,
        action.fund
      ]
    case ADD_TO_FUND:
      const fundIndex = action.fundIndex
      const nextState = Object.assign({}, state, {
        [fundIndex]: Object.assign({}, state[fundIndex], {
          fundRaised: state[fundIndex].fundRaised + parseInt(action.donation.amount, 10),
          donations: Object.assign({}, state[fundIndex].donations, {
            [action.index]: action.donation
          })              
        }) 
      })
      console.log(nextState)
      return nextState

      // [
      //   ...state.slice(0, action.index),
      //   Object.assign({}, fund, {
      //     fundRaised: fund['fundRaised'] + parseInt(action.donation.amount, 10),
      //     donations: [
      //       ...donations,
      //       action.donation
      //     ]
      //   }),
      //   ...state.slice(action.index + 1)
      // ]
    case INITIALIZE_FUNDS:
      return action.funds
    default:
      return state
  }
}