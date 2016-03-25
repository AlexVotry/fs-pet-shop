const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
const express = require('express');
const app = express();

var readIt = function (callback) {
  fs.readFile(petsPath, 'utf8', function (err, data) {
    if (err) {
      throw err;
    }
    const pets = JSON.parse(data);
    callback(pets);
  });
}

app.get('/pets', function (req, res) {
  readIt(function(pets) {
    const petsJSON = JSON.stringify(pets);
    res.end(petsJSON);
  });
});

app.get('/pets/:index', function (req, res) {
  readIt(function(pets) {
    var index = Number(req.params.index);
    const pet = JSON.stringify(pets[index]);
    if (pet === undefined) {
      res.end('Not Found');
    } else {
        res.end(pet);
      }
    });
  });

app.get('/*', function (req, res) {
  res.end('no dice');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Listening...');
});
