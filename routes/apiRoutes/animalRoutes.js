// const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
// const { animals } = require('../../data/animals');
// // we cannot use router any longer, because it's defined in the server.js file and cannot be accessed here. Instead, we'll use Router, which allows you to declare routes in any file as long as you use the proper middleware.
// // We'll start by adding the following code to the top of animalRoutes.js to start an instance of Router:
// const router = require('express').Router();


// // call filter by query function in the app.get() callback
// router.get("/animals", (req, res) => {
//     let results = animals;
//     if(req.query) {
//         results = filterByQuery(req.query, results);
//     }
//     res.json(results);
// })

// router.get("/animals/:id", (req, res) => {
//     const result = findById(req.params.id, animals);
//     if (result) {
//       res.json(result);
//     } else {
//       res.send(404);
//     }
//   });

// //set up a route on our server that accepts data to be stored/used server-side
// router.post("/animals", (req, res) => {
//     // set id based on what the next index of the array will be
//     req.body.id = animals.length.toString();
    
//     // if any data in req.body is incorrect, send 404 error back
//       // the line res.status().send(); is a response method to relay a message to the client making the request.
//     if (!validateAnimal(req.body)) {
//         res.status(404).send('The animal is not properly formatted');
//     } else {
//     // add animal to json file and animals array in this function
//     const animal = createNewAnimal(req.body, animals);
  
//     res.json(animal);
//     }
//   });

//   module.exports  = router;
const router = require('express').Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');

router.get('/animals', (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.get('/animals/:id', (req, res) => {
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.post('/animals', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = animals.length.toString();

  if (!validateAnimal(req.body)) {
    res.status(400).send('The animal is not properly formatted.');
  } else {
    const animal = createNewAnimal(req.body, animals);
    res.json(animal);
  }
});

module.exports = router;
