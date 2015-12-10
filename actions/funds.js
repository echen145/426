export const ADD_FUND = 'ADD_FUND'
export const ADD_TO_FUND = 'ADD_TO_FUND'
export const INITIALIZE_FUNDS = "INITIALIZE_FUNDS"
export const DELETE_FUND = 'DELETE_FUND'
export const DELETE_DONATION = 'DELETE_DONATION'

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

export function deleteFund(index) {
  return {
    type: 'DELETE_FUND',
    index
  }
}

export function deleteDonation(index, fundIndex) {
  return {
    type: 'DELETE_DONATION',
    index,
    fundIndex
  }
}