'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
const petRegExp = /^\/pets\/(.*)$/;

function handleRequest (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json'});
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    let pets = JSON.parse(data);
    let petsJSON = JSON.stringify(pets);
    let route = req.url;
    if (req.url === '/pets') {
    res.end(petsJSON);
    }
    else if (route.match(petRegExp)){
      petRegExp.test(route);
      let index = RegExp['$+'];
      res.end(pets[index]);
    }
    else {
    res.end("404")
    }
  });
}

var server = http.createServer(handleRequest);

server.listen(5000, function() {
  console.log("Listening...")
});

// let indPet = pets.length;
// for (let i = 0; i < pets.length; i++) {
//   if (pets[i] === pets[indPet]) {
//     foundPet = true;
//   }
// }
// if (foundPet === true) {
//     console.log(pets[indPet]);
// let isPet
