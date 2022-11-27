const router = require('express').Router();

// import the methods and models
const { addComment, removeComment, addReply, removeReply } = require('../../controllers/comment-controller');

//since the callback function of a route() method has req and res as parameters, you don't need to pass these arguments to controller methods
router
    .route('/:pizzaId')
    .post(addComment);

router
    .route('/:pizzaId/:commentId')
    .put(addReply)
    .delete(removeComment);

router
    .route('/:pizzaId/:commentId/:replyId')
    .delete(removeReply);


module.exports = router;