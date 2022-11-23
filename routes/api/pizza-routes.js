const router = require('express').Router();

// now here we'll set up the API routes to connect with controller methods
// group the routes by URL

// ===== GET all pizzas and POST pizza share the same URL path at /api/pizzas
router
    .route('/')
    .get()
    .post();


// ===== DELETE, UPDATE and GET ONE pizza share the same URL path at /api/pizzas/:id
router
    .route('/')
    .get()
    .put() 
    .delete();


module.exports = router;