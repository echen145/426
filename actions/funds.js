export const ADD_FUND = 'ADD_FUND'
export const ADD_TO_FUND = 'ADD_TO_FUND'

export function addFund(fund) {
  return {
    type: 'ADD_FUND',
    fund
  }
}

export function addToFund(index, donation) {
  return {
    type: 'ADD_TO_FUND',
    index,
    donation
  }
}