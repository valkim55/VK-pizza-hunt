const router = require('express').Router();

// import the methods and models
const { addComment, removeComment } = require('../../controllers/comment-controller');

router.route('/:pizzaId').post(addComment);

router.route('/:pizzaId/:commentId').delete(removeComment);

module.exports = router;