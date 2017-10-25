(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "bb6d824019641768d2341bd792eef6ae";

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Doctor = exports.Doctor = function () {
  function Doctor() {
    _classCallCheck(this, Doctor);
  }

  _createClass(Doctor, [{
    key: "apiRequest",
    value: function apiRequest(complaint, apiKey) {
      var promise = new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        var url = "https://api.betterdoctor.com/2016-03-01/doctors?query=" + complaint + "&location=45.4814320%2C-122.8016600%2C50&sort=rating-asc&skip=0&limit=40&user_key=" + apiKey;
        request.onload = function () {
          if (this.status === 200) {
            resolve(request.response);
          } else {
            reject(Error(request.statusText));
          }
        };
        request.open("GET", url, true);
        request.send();
      });

      promise.then(function (response) {
        var body = JSON.parse(response);
        var docArray = [];

        body.data.forEach(function (doc) {
          var name = doc.profile.first_name + " " + doc.profile.last_name + ", " + doc.profile.title;
          var address = doc.practices[0].visit_address;
          var formattedAddress = address.street + " <br> " + address.city + " <br> " + address.state + ", " + address.zip;
          var phone = "" + doc.practices[0].phones.find(function (phone) {
            return phone.type === "landline";
          }).number;

          docArray.push({
            name: name,
            address: formattedAddress,
            phone: phone
          });
        });

        console.log(docArray);
        $('#showDoctorNames').text("");
        if (body.data.length != 0) {
          $('.showDoctors').text("Here are some doctors that treat " + complaint + ".");

          docArray.forEach(function (doctor) {
            $('#showDoctorNames').append("<li> <b>" + doctor.name + "</b> <br> " + doctor.address + " <br> " + doctor.phone + " </li>");
          });
        } else {
          $(".showDoctors").text("There are no doctors that treat " + complaint + ", please modify your search terms");
        }
      }, function (error) {
        $('.showErrors').text("There was an error processing your request: " + error.message);
      });
    }
  }]);

  return Doctor;
}();

},{}],3:[function(require,module,exports){
'use strict';

var _doctor = require('./../js/doctor.js');

var apiKey = require('./../.env').apiKey;

$(document).ready(function () {
  $('#complaintButton').click(function () {
    var complaint = $('#complaint').val();
    $('#complaint').val("");
    var doctor = new _doctor.Doctor();
    doctor.apiRequest(complaint, apiKey);
  });
});

},{"./../.env":1,"./../js/doctor.js":2}]},{},[3]);
