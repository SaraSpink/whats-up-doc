import { Doctor } from './../js/doctor.js'
let apiKey = require('./../.env').apiKey;

$(document).ready(function() {
  $('#complaintButton').click(function() {
    let complaint = $('#complaint').val();
    $('#complaint').val("");
    let searchName = $('#searchName').val();
    $('#searchName').val("");
    let doctor = new Doctor;
    doctor.apiRequest(searchName, complaint, apiKey)
  });
});
