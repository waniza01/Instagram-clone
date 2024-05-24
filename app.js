

const express = require('express');
const app = express()
const PORT = 5000;
const mongo = require('mongoose');
const {mongoURL} = require('./keys.js');
const cors = require('cors');
require('./models/model.js');
require('./models/post.js');

app.use(cors()) // allows different domain's requests 



mongo.connect(mongoURL)

mongo.connection.on('connected',()=>{
    console.log("successfully connected to mongoDB");
})

mongo.connection.on('error',()=>{
    console.log("something went wrong");
})


app.use(express.json()) // convert data into Json format // as data comes in any format it converts into json 
                        // here expresss json used as middleware
app.use(require('./Routers/Route.js'));
app.use(require("./Routers/CreatePost.js"))
app.use(require("./Routers/user.js"))


app.listen(PORT , ()=>{
    console.log("server is running on port "+PORT);
})
