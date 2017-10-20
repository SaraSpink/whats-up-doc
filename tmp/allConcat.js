let apiKey = require('./../.env').apiKey;

$(document).ready(function() {
  $('#complaintButton').click(function() {
    let complaint = $('#complaint').val();
    $('#complaint').val("");

      let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url =
      `https://api.betterdoctor.com/2016-03-01/doctors?query=${complaint}&location=45.4814320%2C-122.8016600%2C50&sort=rating-asc&skip=0&limit=40&user_key=${apiKey}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      let body = JSON.parse(response);
      let docArray = []
      let docNames = []
      body.data.forEach(function(docs) {
        docArray.push(docs.profile)
        })
      docArray.forEach(function(names) {
        docNames.push(names.first_name, names.last_name)
        })
        $('.showDoctors').text(`Here are some doctors that treat ${complaint}.`);


        docArray.forEach(function(names) {
        $('#showDoctorNames').append(`<li> ${names.first_name, names.last_name} </li>`)
          })
        // $('.showTemp').text(`The temperature in Fahrenheit is ${body.main.temp} degrees.`);
      }, function(error) {
        $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
