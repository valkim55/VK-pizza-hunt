const router = require('express').Router();
const pizzaRoutes = require('./pizza-routes');

// adding a '/pizzas' prefix to the router from pizza-routes.js
router.use('/pizzas', pizzaRoutes);

module.exports = router;