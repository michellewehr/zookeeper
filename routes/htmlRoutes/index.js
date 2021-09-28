// const path = require('path');
// const router = require('express').Router();

// //FRONT END PART 
// //We'll start with getting index.html to be served from our Express.js server. 
// // '/' brings us to the root of the server
// // this get request has 1 job- to respond with an html play to display in the browser so instead of res.json() we use res.sendFile()
// router.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../public/index.html'));
//   });

//   //front end for animals.html
// router.get('/animals', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../public/animals.html'));
//   });

//   //front end for zookeepers.html
//   router.get('/zookeepers', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
//   });

//   //front end- wildcard- if user was to try and go to /about for ex.
//   //The * will act as a wildcard, meaning any route that wasn't previously defined will fall under this request and will receive the homepage as the response
//   //The order of your routes matters! The * route should always come last. Otherwise, it will take precedence over named routes, and you won't see what you expect to see on routes like /zookeeper 
//   router.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../public/index.html'));
//   });

//   module.exports = router;

const path = require('path');
const router = require('express').Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get('/animals', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/animals.html'));
});

router.get('/zookeepers', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});

router.get('/aquarium', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/aquarium.html'));
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;
