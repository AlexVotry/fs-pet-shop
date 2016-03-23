
const http = require('http');
const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
const petRegExp = /^\/pets\/(.*)$/;

function handleRequest(req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  fs.readFile(petsPath, 'utf8', function petpath(err, data) {
    if (err) {
      throw err;
    }
    const pets = JSON.parse(data);
    const petsJSON = JSON.stringify(pets);
    const route = req.url;

    if (req.url === '/pets') {
      res.end(petsJSON);
    } else if (petRegExp.test(route)) {
      const temp = route.match(petRegExp);
      const index = Number(temp[1]);
      const pet = JSON.stringify(pets[index]);
      if (pet === undefined) {
        res.end('Not Found');
      } else {
        res.end(pet);
      }
    } else res.end('404');
  });
}
const port = process.env.PORT || 5000;

const server = http.createServer(handleRequest);

server.listen(port, () => {
  console.log('Listening...');
});


// let pathArray = location.pathname.split( '/' );
// let index= pathArray[1];
// if (index)
// else if (route.match(petRegExp)){
//   petRegExp.test(route);
//   let index = RegExp['$+'];
//   res.end(pets[index]);
// }
