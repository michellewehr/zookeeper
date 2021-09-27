// after installing "npm init -y and npm i express" in terminal
const express = require('express');
const { animals } = require('./data/animals.json');
// telling heroku server host port 
const PORT = process.env.PORT || 3001;
//setting up the server takes 2 steps: 1 to instantiate the server 
// we assign express() to app variable to later chain on methods to the express.js server. 
const app = express();

//to add the route 
// get() mthod requires 2 arguments- first= string that describes rout the client will have to fetch from and second= callback funciton that will execute everytime that route is accessed with a GET request
// app.get('/api/animals', (req, res) => {
//     let results = animals;
//     console.log(req.query);
//     res.json(results);
//   });

// funciton will take in req.query as argument and filter through the animals accordingly- returning the new filtered array 
function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    //note that we save the anaimlasArr as filtered results here
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        //save personality traits as a dedicated array
        //if personalityTraits is a string place it into a new array and save
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        //loop through each trait in the personalityTraints array: 
        personalityTraitsArray.forEach(trait => {
           // Check the trait against each animal in the filteredResults array.
      // Remember, it is initially a copy of the animalsArray,
      // but here we're updating it for each trait in the .forEach() loop.
      // For each trait being targeted by the filter, the filteredResults
      // array will then contain only the entries that contain the trait,
      // so at the end we'll have an array of animals that have every one 
      // of the traits when the .forEach() loop is finished.
      filteredResults = filteredResults.filter(
        animal => animal.personalityTraits.indexOf(trait) !== -1
      );
        })
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}

// call filter by query function in the app.get() callback
app.get('/api/animals', (req, res) => {
    let results = animals;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
})

//going to chain listen() method to our server
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });





