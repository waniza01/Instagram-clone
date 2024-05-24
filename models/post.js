const mongo = require('mongoose');
const { ObjectId } = mongo.Schema.Types;

// tell that which type of data we sent or recieve that why we make blue print(Schema)

const postSchema = new mongo.Schema({
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    likes: [{
        type: ObjectId,
        ref: "USER"
    }],
    comments: [{
        comment: { type: String },
        postedBy: { type: ObjectId, ref: "USER" }
    }],

    postedBy: {
        type: ObjectId,
        ref: "USER"
    }
});

mongo.model("POST", postSchema);