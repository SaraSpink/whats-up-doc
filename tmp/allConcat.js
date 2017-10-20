let apiKey = require('./../.env').apiKey;

$(document).ready(function() {
  $('#complaintButton').click(function() {
    let complaint = $('#complaint').val();
    $('#complaint').val("");

      let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${complaint}&location=45.4814320%2C-122.8016600%2C20&sort=last-name-asc&skip=0&limit=10&user_key=${apiKey}`;
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
      debugger;
        $('.showDoctors').text(`Here are some doctors that treat ${complaint}.`);
        // $('.showTemp').text(`The temperature in Fahrenheit is ${body.main.temp} degrees.`);
      }, function(error) {
        $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
