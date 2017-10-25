// let apiKey = require('./../.env').apiKey;
//
// $(document).ready(function() {
//   $('#complaintButton').click(function() {
//     let complaint = $('#complaint').val();
//     $('#complaint').val("");
//
//       let promise = new Promise(function(resolve, reject) {
//       let request = new XMLHttpRequest();
//       let url =
//       `https://api.betterdoctor.com/2016-03-01/doctors?query=${complaint}&location=45.4814320%2C-122.8016600%2C50&sort=rating-asc&skip=0&limit=40&user_key=${apiKey}`;
//       request.onload = function() {
//         if (this.status === 200) {
//           resolve(request.response);
//         } else {
//           reject(Error(request.statusText));
//         }
//       };
//       request.open("GET", url, true);
//       request.send();
//     });
//
//     promise.then(function(response) {
//       let body = JSON.parse(response);
//       let docArray = []
//
//       body.data.forEach(function(doc) {
//       let name = `${doc.profile.first_name} ${doc.profile.last_name}, ${doc.profile.title}`
//       let address = doc.practices[0].visit_address
//       let formattedAddress =  `${address.street} <br> ${address.city} <br> ${address.state}, ${address.zip}`
//       let phone = `${doc.practices[0].phones.find(function(phone) {return phone.type === "landline"}).number}`
//
//
//         docArray.push({
//           name: name,
//           address: formattedAddress,
//           phone: phone,
//           })
//         })
//
//
//       console.log(docArray)
//       $('#showDoctorNames').text("")
//       if(body.data.length != 0) {
//         $('.showDoctors').text(`Here are some doctors that treat ${complaint}.`);
//
//         docArray.forEach(function(doctor) {
//           $('#showDoctorNames').append(`<li> <b>${doctor.name}</b> <br> ${doctor.address} <br> ${doctor.phone} </li>`)
//           })
//
//         } else {
//           $(".showDoctors").text(`There are no doctors that treat ${complaint}, please modify your search terms`);
//         }
//
//       }, function(error) {
//         $('.showErrors').text(`There was an error processing your request: ${error.message}`);
//     });
//   });
// });
