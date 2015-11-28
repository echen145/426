export const ADD_FUND = 'ADD_FUND'

export function addFund(fund) {
  return {
    type: 'ADD_FUND',
    fund
  }
}