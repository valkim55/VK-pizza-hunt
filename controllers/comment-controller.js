const {Comment, Pizza} = require('../models');
const { db } = require('../models/Pizza');

const commentController = {
    
    // add a new comment to pizza
    // so first, you're creating a comment, and then you destructure its auto generated id and push it into the Pizza document my using findOneAndUpdate
    addComment( {params, body }, res) {
        console.log(body);
        Comment.create(body)
            .then(({_id}) => {
                return Pizza.findOneAndUpdate(
                    { _id: params.pizzaId},
                    { $addToSet: {comments: _id} },
                    { new: true, runValidators: true}
                );
            }).then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(400).json({message: 'no pizza found with this id'});
                    return;
                }
                res.json(dbPizzaData);
            }).catch(err => res.json(err));
    },

    // add a reply to an existing comment
    addReply( {params, body}, res ) {
        Comment.findOneAndUpdate(
            { _id: params.commentId },
            { $addToSet: { replies: body } },
            { new: true, runValidators: true }
        ).then(dbPizzaData => {
            if(!dbPizzaData) {
                res.status(404).json({message: 'No pizza found with this id'});
                return;
            }
            res.json(dbPizzaData);
        }).catch(err => console.log(err));
    },

    // delete an existing comment
    // here you passing only an id to comment's delete method, and then updating associated pizza by removing that comment's id
    removeComment({params}, res) {
        Comment.findOneAndDelete({_id: params.commentId}) 
            .then(deletedComment => {
                if(!deletedComment) {
                    res.status(404).json({message: 'comment with this id not found'});
                    return;
                }
                return Pizza.findOneAndUpdate(
                    { _id: params.pizzaId },
                    { $pull: {comments: params.commentId } },
                    { new: true}
                );
            }).then(dbPizzaData => {
                if(!dbPizzaData) {
                    res.status(404).json({message: 'no pizza found with this id'});
                    return;
                }
                res.jon(dbPizzaData);
            }).catch(err => res.json(err));
    },

    // enable the same functionality for replies as well
    removeReply({params}, res) {
        Comment.findOneAndUpdate(
            {_id: params.commentId},
            {$pull: {replies: {replyId: params.replyId} } },
            {new: true}
        ).then(dbPizzaData => res.json(dbPizzaData)
        ).catch(err => res.json(err));
    }
};

module.exports = commentController;