const router = require('express').Router();

// import the methods from pizza-controller
const { getAllPizza, getPizzaById, createPizza, updatePizza, deletePizza } = require('../../controllers/pizza-controller');

// now here we'll set up the API routes to connect with controller methods
// group the routes by URL

// ===== GET all pizzas and POST pizza share the same URL path at /api/pizzas
router
    .route('/')
    .get(getAllPizza)
    .post(createPizza);


// ===== DELETE, UPDATE and GET ONE pizza share the same URL path at /api/pizzas/:id
router
    .route('/:id')
    .get(getPizzaById)
    .put(updatePizza) 
    .delete(deletePizza);


module.exports = router;