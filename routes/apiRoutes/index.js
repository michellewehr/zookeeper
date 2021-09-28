// const router = require('express').Router();
// const animalRoutes = require('../apiRoutes/animalRoutes');
// const zookeeperRoutes = require('../apiRoutes/zookeeperRoutes');

// router.use(animalRoutes);
// router.use(zookeeperRoutes);

// module.exports = router;

// //Here we're employing Router as before, but this time we're having it use the module exported from animalRoutes.js. (Note that the .js extension is implied when supplying file names in require()).
// // Doing it this way, we're using apiRoutes/index.js as a central hub for all routing functions we may want to add to the application. It may seem like overkill with just one exported module, but as your application evolves, it will become a very efficient mechanism for managing your routing code and keeping it modularized.
// // One last thing here: Notice our careful use of relative paths in the require() statement. Always double check these when your files become nested.

// router.use(require('./zookeeperRoutes'));

const router = require('express').Router();
const animalRoutes = require('../apiRoutes/animalRoutes');
const zookeeperRoutes = require('../apiRoutes/zookeeperRoutes');

router.use(animalRoutes);
router.use(zookeeperRoutes);

module.exports = router;
