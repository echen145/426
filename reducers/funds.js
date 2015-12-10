import { ADD_FUND, ADD_TO_FUND, INITIALIZE_FUNDS, DELETE_FUND } from '../actions/funds'

export default function funds(state = [], action) {
  // console.log(state)
  switch (action.type) {
    case ADD_FUND: 
      return  Object.assign({}, state, {
        [action.index]: action.fund
      })
    // case ADD_FUND: 
    //   return [
    //     ...state,
    //     action.fund
    //   ]
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
      // console.log(nextState)
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

    case DELETE_FUND:
      const index = action.index
      const copy =  Object.assign({}, state)
      delete copy[index]
      return copy
      
    default:
      return state
  }
}
