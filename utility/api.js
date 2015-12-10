import {FIREBASE} from '../constants/api'

export function getFunds(dispatch, token) {
  const url = `${FIREBASE}${token}/funds.json`
  $.ajax({
    url: url,
    type: "GET"
  })
    .done(function(msg) {
      // console.log(msg)
      if (msg === null) {
        dispatch.initializeFunds({})
      } else {
        dispatch.initializeFunds(msg)
      }
    })
}

export function postFund(dispatch, resource, token) {
  const url = `${FIREBASE}${token}/funds.json`
  $.ajax({
    accept: "application/json",
    type: 'POST',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(resource),
    url: url
  })
    .done(function(msg) {
      // console.log(msg)
      dispatch(msg.name, resource)
    })
}

export function postDonation(dispatch, token, fundId, donation, amount) {
  const url = `${FIREBASE}${token}/funds/${fundId}/donations.json`
  const fundUrl = `${FIREBASE}${token}/funds/${fundId}.json`
  $.ajax({
    accept: "application/json",
    type: 'POST',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(donation),
    url: url
  })
    .done(function(msg) {
      dispatch(msg.name, fundId, donation)
    })

  $.ajax({
    accept: "application/json",
    type: 'PATCH',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(amount),
    url: fundUrl
  })
    .done(function(msg) {
      console.log(msg)
    })
}

export function deleteFund(dispatch, token, fundId) {
  console.log(dispatch)
  const url = `${FIREBASE}${token}/funds/${fundId}.json`
  $.ajax({
    accept: "application/json",
    type: 'DELETE',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    url: url
  })
    .done(function(msg) {
      console.log(msg)
      dispatch(fundId)
    })
}

export function deleteDonation(dispatch, token, fundId, donationId, fundAmount) {
  const url = `${FIREBASE}${token}/funds/${fundId}/donations/${donationId}.json`
  const fundUrl = `${FIREBASE}${token}/funds/${fundId}.json`
  const amount = {
    fundRaised: fundAmount
  }
  console.log(url)
  $.ajax({
    accept: "application/json",
    type: 'DELETE',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    url: url
  })
    .done(function(msg) {
      console.log(msg)
      dispatch(donationId, fundId, fundAmount)
    })

  $.ajax({
    accept: "application/json",
    type: 'PATCH',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(amount),
    url: fundUrl
  })
    .done(function(msg) {
      console.log(msg)
    })
}