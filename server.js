'use strict';

let http = require('http');
const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

function handleRequest (req, res) {
  if (req.url === '/pets') {
    res.writeHead(200, { 'Content-Type': 'application/json'});
    fs.readFile(petsPath, 'utf8', function(err, data) {
      if (err) {
        throw err;
      }
      let pets = JSON.parse(data);
      var petsJSON = JSON.stringify(pets);
      res.end(petsJSON);
    });
  }
  else {
  res.end("404")
  }

  var server = http.createServer(handleRequest);

  server.listen(5000, function() {
    console.log("Listening...")
  });
}
