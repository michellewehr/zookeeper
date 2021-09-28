const fs = require("fs");
const path = require("path");

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
      path.join(__dirname, '../data/animals.json'),
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


module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
};