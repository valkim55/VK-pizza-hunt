const router = require('express').Router();
const pizzaRoutes = require('./pizza-routes');
const commentRoutes = require('./comment-routes');

// adding a '/pizzas' prefix to the router from pizza-routes.js
router.use('/pizzas', pizzaRoutes);

// add a /comments prefix to all comment routes
router.use('/comments', commentRoutes);

module.exports = router;