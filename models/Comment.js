const {Schema, model, Types}  = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// create ReplySchema to add as a child array to CommentSchema
const ReplySchema = new Schema(
    {
        // imported Types to use ObjectId() value to generate if for a reply
        // adding custom field
        replyId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
        replyBody: { type: String, required: true, trim: true },
        writtenBy: { type: String, required: true, trim: true },
        createdAt: { type: Date, default: Date.now, get: createdAtVal => dateFormat(createdAtVal) }
    },
    {
        toJSON: { getters: true}
    }
);


const CommentSchema = new Schema(
    {
        writtenBy: {type: String, required: true, trim: true },
        commentBody: {type: String, required: true, trim: true },
        createdAt: { type: Date, default: Date.now, get: createdAtVal => dateFormat(createdAtVal) },
        replies: [ReplySchema]
    },
    {
        // we'll use virtuals to keep count on replies as well to display more info on a single pizza
        toJSON: { virtuals: true, getters: true},
        id: false
    }
);

CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;