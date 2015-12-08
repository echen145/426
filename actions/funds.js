export const ADD_FUND = 'ADD_FUND'
export const ADD_TO_FUND = 'ADD_TO_FUND'
export const INITIALIZE_FUNDS = "INITIALIZE_FUNDS"

export function addFund(index, fund) {
  return {
    type: 'ADD_FUND',
    index,
    fund
  }
}

export function addToFund(index, fundIndex, donation) {
  return {
    type: 'ADD_TO_FUND',
    index,
    fundIndex,
    donation
  }
}

export function initializeFunds(funds) {
  return {
    type: 'INITIALIZE_FUNDS',
    funds
  }
}
