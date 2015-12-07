export const API_URL = "http://wwwp.cs.unc.edu/Courses/comp426-f15/users/jtbaldwi/Codiad/workspace/cs426/finalProject/login.php"

export function getResource() {
  $.ajax({
    url: API_URL,
    crossDomain: true,
    type: "GET",
  })
    .done(function(msg) {
      console.log(msg)
    })
}
