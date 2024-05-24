const mongo = require('mongoose');
const { ObjectId } = mongo.Schema.Types;

// tell that which type of data we sent or recieve that why we make blue print(Schema)

const UserSchema = new mongo.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Photo : {type : String},
    followers: [{ type: ObjectId, ref: "USER" }],
    following: [{ type: ObjectId, ref: "USER" }]
});

mongo.model("USER", UserSchema);

