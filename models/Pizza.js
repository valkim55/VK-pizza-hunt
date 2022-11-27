const {Schema, model} = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const PizzaSchema = new Schema(
    {
        pizzaName: { type: String },
        createdBy: { type: String },
        createdAt: { type: Date, default: Date.now, get: (createdAtVal) => dateFormat(createdAtVal) },
        size: { type: String, default: 'Large '},
        toppings: [],
        comments: [
            { 
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    {
        // include this property to tell schema that it can now use the virtuals
        toJSON: {
            virtuals: true,
            getters: true
        },
        // because this is a built-in virtual returned by mongoose we don't need this id in response
        id: false
    }
);

// using virtuals to keep a count on comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;






