import { ADD_FUND, ADD_TO_FUND } from '../actions/funds'

export default function funds(state = [], action) {
  switch (action.type) {
    case ADD_FUND: 
      return [
        ...state,
        action.fund
      ]
    case ADD_TO_FUND:
      const fund = state[action.index]
      const donations = fund['donations']
      return [
        ...state.slice(0, action.index),
        Object.assign({}, fund, {
          fundRaised: fund['fundRaised'] + parseInt(action.donation.amount, 10),
          donations: [
            ...donations,
            action.donation
          ]
        }),
        ...state.slice(action.index + 1)
      ]
    default:
      return state
  }
}