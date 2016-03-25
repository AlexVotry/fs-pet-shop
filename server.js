
const fs = require('fs');
const path = require('path');
const express = require('express');
const petsPath = path.join(__dirname, 'pets.json');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.disable('x-powered-by');
app.set('port', process.env.PORT || 5000);
app.use(morgan('short'));
app.use(bodyParser.json());

const readIt = (callback) => {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    const pets = JSON.parse(data);
    callback(pets);
  });
};

app.get('/pets', (req, res) => {
  readIt((pets) => {
    const allPets = JSON.stringify(pets);
    res.send(allPets);
  });
});

app.get('/pets/:index', (req, res) => {
  readIt((pets) => {
    const index = Number.parseInt(req.params.index);
    const pet = pets[index];
    if (!pet) {
      res.sendStatus(404); // not found
    }
    res.send(pet);
  });
});

app.post('/pets/', (req, res) => {
  readIt((pets) => {
    const newPet = req.body;
    const age = Number(newPet.age);
    const kind = newPet.kind;
    const name = newPet.name;
    if (!newPet.age || !newPet.kind || !newPet.name) {
      res.sendStatus(400);
    }
    pets.push({ age, kind, name });
    const allPets = JSON.stringify(pets);
    res.send(allPets);
    fs.writeFile(petsPath, allPets, (writeFile) => {
      if (writeFile) throw writeFile;
    });
  });
});

app.post('/pets/:age/:kind/:name', (req, res) => {
  readIt((pets) => {
    const age = Number(req.params.age);
    const kind = req.params.kind;
    const name = req.params.name;
    if (!age || !kind || !name) {
      res.sendStatus(400);
    }
    pets.push({ age, kind, name });
    const allPets = JSON.stringify(pets);
    res.send(allPets);
    fs.writeFile(petsPath, allPets, (writeErr) => {
      if (writeErr) {
        throw writeErr;
      }
    });
  });
});

app.put('/pets/:index/:age/:kind/:name', (req, res) => {
  readIt((pets) => {
    const index = Number.parseInt(req.params.index);
    const age = Number(req.params.age);
    const kind = req.params.kind;
    const name = req.params.name;
    if (!index || !age || !kind || !name) {
      res.sendStatus(400);
    } else {
      const pet = { age, kind, name };
      pets.splice(index, 1);
      pets.splice(index, 0, pet);
      const allPets = JSON.stringify(pets);
      fs.writeFile(petsPath, allPets, (deleteErr) => {
        if (deleteErr) throw deleteErr;
      });
      res.send(pet);
    }
  });
});

app.delete('/pets/:index', (req, res) => {
  readIt((pets) => {
    const index = Number.parseInt(req.params.index);
    const pet = pets[index];
    if (!pet) {
      res.sendStatus(404);
    } else {
      const gone = pets.splice(index, 1)[0];
      const allPets = JSON.stringify(pets);
      fs.writeFile(petsPath, allPets, (deleteErr) => {
        if (deleteErr) throw deleteErr;
      });
      res.send(gone);
    }
  });
});

app.listen(app.get('port'), () => {
  console.log('working so far...');
});
