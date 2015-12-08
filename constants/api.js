export const API_URL = "http://wwwp.cs.unc.edu/Courses/comp426-f15/users/jtbaldwi/Codiad/workspace/cs426/finalProject/login.php"


export function getResource(dispatch, token) {
  const url = `https://426.firebaseio.com/users/${token}/funds.json`
  $.ajax({
    url: url,
    type: "GET"
  })
    .done(function(msg) {
      console.log(msg)
      if (msg === null) {
        dispatch.initializeFunds({})
      } else {
        dispatch.initializeFunds(msg)
      }
    })
}

export function postResource(dispatch, resource, token) {
  const url = `https://426.firebaseio.com/users/${token}/funds.json`
  $.ajax({
    accept: "application/json",
    type: 'POST',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(resource),
    url: url
  })
    .done(function(msg) {
      console.log(msg)
      dispatch(msg.name, resource)
    })
}

export function postDonation(dispatch, token, fundId, resource) {
  const url = `https://426.firebaseio.com/users/${token}/funds/${fundId}/donations.json`
  $.ajax({
    accept: "application/json",
    type: 'POST',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(resource),
    url: url
  })
    .done(function(msg) {
      dispatch(msg.name, fundId, resource)
    })
}