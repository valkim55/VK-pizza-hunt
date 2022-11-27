const {Pizza} = require('../models');

// all CRUD operations will go inside this controller object and then you'll create routes and hook these methods up to the routes
const pizzaController = {
    // the methods will go here. These methods will be used as the callback functions for the Express routes, so each will take two parameters: req and res
    // ===== GET ALL pizzas - will serve as a callback function for GET /api/pizzas route
    getAllPizza(req, res) {
        Pizza.find({})
            .populate( 
                {
                    path: 'comments',
                    select: '-__v'
                })
            .select('-__v')
            .sort( { __id: -1 } )
            .then(dbPizzaData  => res.json(dbPizzaData))
            .catch(err => {
                res.status(400).json(err);
                console.log(err);
            });
    },

    // ===== GET ONE pizza by id - will server as a callback function for GET /api/pizzas/:id
    getPizzaById({params}, res) { // instead of accessing the entire req, you destructured and pulled params out of it because that's all you need for this request
        Pizza.findOne({ _id: params.id })
            .populate( {
                path: 'comments',
                select: '-__v'
            } )
            .select('-__v')
            .then(dbPizzaData => {
                if(!dbPizzaData) {
                    res.status(400).json({message: 'no pizza found with this id'});
                    return;
                }
                res.json(dbPizzaData);
            }).catch(err => {
                res.status(400).json(err);
                console.log(err);
            });
    },

    // ===== CREATE a new pizza - will serve as a callback function for POST /api/pizzas route
    createPizza({body}, res) { // destructured body out of req object so you don't need no interface any other unnecessary data
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err));
    },

    // ===== UPDATE a pizza - callback function for PUT /api/pizzas/:id
    updatePizza({params, body}, res) {
        // three parameters below have to be exactly in this order! that's how it is with mongoose
        Pizza.findOneAndUpdate({ _id: params.id }, body, {new: true}) // set the third parameter new:true so Mongoose will return an updated document in the response
                .then(dbPizzaData => {
                    if (!dbPizzaData) {
                        res.status(404).json({message: 'no pizza found with this id'});
                        return;
                    }
                    res.json(dbPizzaData);
                }).catch(err => res.status(400).json(err));
    },

    // ===== DELETE pizza by id - callback function for DELETE route /api/pizzas/:id
    deletePizza({params}, res) {
        Pizza.findOneAndDelete({ _id: params.id})
            .then(dbPizzaData => {
                if(!dbPizzaData) {
                    res.status(404).json({message: 'no pizza found with this id'});
                    return;
                }
                res.json(dbPizzaData);
                console.log(`pizza successfully deleted!`);
            }).catch(err => res.status(400).json(err));
    }
};

module.exports = pizzaController;