// //The require() statements will read the index.js files in each of the directories indicated. This mechanism works the same way as directory navigation does in a website: If we navigate to a directory that doesn't have an index.html file, then the contents are displayed in a directory listing. But if there's an index.html file, then it is read and its HTML is displayed instead. Similarly, with require(), the index.js file will be the default file read if no other file is provided, which is the coding method we're using here.
// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');

// // after installing "npm init -y and npm i express" in terminal
// const express = require('express');
// const path = require('path');
// // telling heroku server host port 
// const PORT = process.env.PORT || 3001;
// //setting up the server takes 2 steps: 1 to instantiate the server 
// // we assign express() to app variable to later chain on methods to the express.js server. 
// const app = express();

// //to add the route 
// // get() mthod requires 2 arguments- first= string that describes rout the client will have to fetch from and second= callback funciton that will execute everytime that route is accessed with a GET request
// // app.get('/api/animals', (req, res) => {
// //     let results = animals;
// //     console.log(req.query);
// //     res.json(results);
// //   });

// //FRONT END
// //we can set up some more Express.js middleware that instructs the server to make certain files readily available and to not gate it behind a server endpoint bc all of the files needed for index.js to be styled is in the public folder
// app.use(express.static('public'));


// //parse incoming string or array data for post requests
// //"In order for our server to accept incoming data the way we need it to, we need to tell our Express.js app to intercept our POST request before it gets to the callback function. At that point, the data will be run through a couple of functions to take the raw data transferred over HTTP and convert it to a JSON object."
// app.use(express.urlencoded({ extended: true }));
// //parse incoming json data
// app.use(express.json());
// //^^ First, we used the app.use() method. This is a method executed by our Express.js server that mounts a function to the server that our requests will pass through before getting to the intended endpoint. The functions we can mount to our server are referred to as middleware.
// //Middleware functions can serve many different purposes. Ultimately they allow us to keep our route endpoint callback functions more readable while letting us reuse functionality across routes to keep our code DRY.
// //The express.urlencoded({extended: true}) method is a method built into Express.js. It takes incoming POST data and converts it to key/value pairings that can be accessed in the req.body object. The extended: true option set inside the method call informs our server that there may be sub-array data nested in it as well, so it needs to look as deep into the POST data as possible to parse all of the data correctly.
// // The express.json() method we used takes incoming POST data in the form of JSON and parses it into the req.body JavaScript object. Both of the above middleware functions need to be set up every time you create a server that's looking to accept POST data.
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);
// //This is our way of telling the server that any time a client navigates to <ourhost>/api, the app will use the router we set up in apiRoutes. If / is the endpoint, then the router will serve back our HTML routes.





// //going to chain listen() method to our server
// app.listen(PORT, () => {
//     console.log(`API server now on port ${PORT}!`);
//   });
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Use apiRoutes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
