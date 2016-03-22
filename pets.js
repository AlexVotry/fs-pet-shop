'use strict';


(function subCommand() {
  const fs = require('fs');
  const path = require('path');
  const petsPath = path.join(__dirname, 'pets.json');
  const node = path.basename(process.argv[0]);
  const file = path.basename(process.argv[1]);
  const cmd = process.argv[2];

  if (cmd === 'read') {
    fs.readFile(petsPath, 'utf8', function(err, data) {
      if (err) {
        throw err;
      }
      let pets = JSON.parse(data);
      const indPet = process.argv[3];
      let foundPet = false;
      if (!indPet) {
        console.log(pets);
      }
      else
      {
        for (let i = 0; i < pets.length; i++) {
          if (pets[i] === pets[indPet]) {
            foundPet = true;
          }
        }
        if (foundPet === true) {
            console.log(pets[indPet]);
        }
        else {
            console.error(`Usage: ${node} ${file} read INDEX`);
        }
      }
    });
  }
  else if (cmd === 'create') {
    fs.readFile(petsPath, 'utf8', function (readErr, data) {
      if (readErr) {
        throw readErr;
      }
      let pets = JSON.parse(data);
      const i = pets.length;
      const age = Number(process.argv[3]);
      const kind = process.argv[4];
      const name = process.argv[5];

      if (!age && !kind && !name) {
        console.error(`Usage: ${node} ${file} create AGE KIND NAME`);
        process.exit(1);
      }

      pets.push({ age, kind, name });

      var petsJSON = JSON.stringify(pets);

      fs.writeFile(petsPath, petsJSON, function(writeErr) {
        if (writeErr) {
          throw writeErr;
        }

        console.log(pets[i]);
      });
    });
  }
  else if (cmd === 'update') {
    fs.readFile(petsPath, 'utf8', function(readErr, data) {
      if (readErr) {
        throw readErr;
      }
      let pets = JSON.parse(data);
      const i = pets.length;
      const index = Number(process.argv[3]);
      const age = Number(process.argv[4]);
      const kind = process.argv[5];
      const name = process.argv[6];

      if (!index && !age && !kind && !name) {
        console.error(`Usage: ${node} ${file} update INDEX AGE KIND NAME`);
        process.exit(1);
      }
      let pet = {age, kind, name};

      pets.splice(index, 1);
      pets.splice(index, 0, pet);

      var petsJSON = JSON.stringify(pets);

      fs.writeFile(petsPath, petsJSON, function(updateErr) {
        if (updateErr) {
          throw updateErr;
        }
        console.log(pet);
      });
    });
  }
  else if (cmd === 'destroy') {
    fs.readFile(petsPath, 'utf8', function(destroyErr, data) {
      if (destroyErr) {
        throw destroyErr;
      }
      let pets = JSON.parse(data);
      const index = Number(process.argv[3]);


      if (!index) {
        console.error(`Usage: ${node} ${file} destroy INDEX`);
        process.exit(1);
      }
      else {
        pets.splice(index, 1);
        let petsJSON = JSON.stringify(pets);

        fs.writeFile(petsPath, petsJSON, function(updateErr) {
          if (updateErr) {
            throw updateErr;
          }
          console.log('gone');
        });
      }
    });
  }
  else {
    console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
    process.exit(1);
  }


})();
