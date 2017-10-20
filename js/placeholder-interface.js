let apiKey = require('./../.env').apiKey;

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let city = $('#location').val();
    $('#location').val("");

      let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=Imperial&appid=${apiKey}`;
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
        $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
        $('.showTemp').text(`The temperature in Fahrenheit is ${body.main.temp} degrees.`);
      }, function(error) {
        $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
