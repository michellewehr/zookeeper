// after installing "npm init -y and npm i express" in terminal
const express = require('express');
const { animals } = require('./data/animals.json');
const fs = require('fs');
const path = require('path');
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

//FRONT END
//we can set up some more Express.js middleware that instructs the server to make certain files readily available and to not gate it behind a server endpoint bc all of the files needed for index.js to be styled is in the public folder
app.use(express.static('public'));


//parse incoming string or array data for post requests
//"In order for our server to accept incoming data the way we need it to, we need to tell our Express.js app to intercept our POST request before it gets to the callback function. At that point, the data will be run through a couple of functions to take the raw data transferred over HTTP and convert it to a JSON object."
app.use(express.urlencoded({ extended: true }));
//parse incoming json data
app.use(express.json());
//^^ First, we used the app.use() method. This is a method executed by our Express.js server that mounts a function to the server that our requests will pass through before getting to the intended endpoint. The functions we can mount to our server are referred to as middleware.
//Middleware functions can serve many different purposes. Ultimately they allow us to keep our route endpoint callback functions more readable while letting us reuse functionality across routes to keep our code DRY.
//The express.urlencoded({extended: true}) method is a method built into Express.js. It takes incoming POST data and converts it to key/value pairings that can be accessed in the req.body object. The extended: true option set inside the method call informs our server that there may be sub-array data nested in it as well, so it needs to look as deep into the POST data as possible to parse all of the data correctly.
// The express.json() method we used takes incoming POST data in the form of JSON and parses it into the req.body JavaScript object. Both of the above middleware functions need to be set up every time you create a server that's looking to accept POST data.


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

function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
  }
  
//Here, we just created a function that accepts the POST route's req.body value and the array we want to add the data to. In this case, that array will be the animalsArray, because the function is for adding a new animal to the catalog.
// We are going to execute this function from within the app.post() route's callback function and when we do, it'll take the new animal data and add it to the animalsArray we passed in, and then write the new array data to animals.json. After saving it, we'll send the data back to the route's callback function so it can finally respond to the request
function createNewAnimal(body, animalsArray) {
    const animal = body;
    animalsArray.push(animal);
    fs.writeFileSync(
      path.join(__dirname, './data/animals.json'),
      JSON.stringify({ animals: animalsArray }, null, 2)
    );
    return animal;
  }
    // The null argument means we don't want to edit any of our existing data; if we did, we could pass something in there. The 2 indicates we want to create white space between our values to make it more readable

    //validate animal
    function validateAnimal(animal) {
        if (!animal.name || typeof animal.name !== 'string') {
            return false;
        }
        if (!animal.species || typeof animal.species !== 'string'){
            return false;
        }
        if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
            return false;
        }
        return true;
    }



// call filter by query function in the app.get() callback
app.get('/api/animals', (req, res) => {
    let results = animals;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
})

app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
  });

//set up a route on our server that accepts data to be stored/used server-side
app.post('/api/animals', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = animals.length.toString();
    
    // if any data in req.body is incorrect, send 404 error back
      // the line res.status().send(); is a response method to relay a message to the client making the request.
    if (!validateAnimal(req.body)) {
        res.status(404).send('The animal is not properly formatted');
    } else {
    // add animal to json file and animals array in this function
    const animal = createNewAnimal(req.body, animals);
  
    res.json(animal);
    }
  });

//FRONT END PART 
//We'll start with getting index.html to be served from our Express.js server. 
// '/' brings us to the root of the server
// this get request has 1 job- to respond with an html play to display in the browser so instead of res.json() we use res.sendFile()
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

  //front end for animals.html
app.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, './public/animals.html'));
  });

  //front end for zookeepers.html
  app.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepers.html'));
  });

  //front end- wildcard- if user was to try and go to /about for ex.
  //The * will act as a wildcard, meaning any route that wasn't previously defined will fall under this request and will receive the homepage as the response
  //The order of your routes matters! The * route should always come last. Otherwise, it will take precedence over named routes, and you won't see what you expect to see on routes like /zookeeper 
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
//going to chain listen() method to our server
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
