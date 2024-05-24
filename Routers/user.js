const express = require('express');
const mongo = require('mongoose');
const Route = express.Router();
const POST = mongo.model("POST");
const USER = mongo.model('USER');
const loginRequired = require("../loginRequired");

// getting user

Route.get("/user/:id", (req, res) => {
    USER.findOne({ _id : req.params.id })
        .select("-password")
        .then((user) => { 
            POST.find({postedBy : req.params.id })
            .populate("postedBy",'_id name Photo')
            .populate("comments.postedBy","_id name Photo")
            .then(posts =>{
                return res.status(200).json({ user, posts })
            })
            .catch(err => {
                return res.status(422).json({ error: err })
            });
        })
        .catch((err) => {
            return res.status(422).json({ error: err })
        });

})

// uploading profile file
Route.put('/uploadProfilePic',loginRequired,(req, res) => {
    USER.findByIdAndUpdate({_id : req.user._id},{$set : {Photo : req.body.pic}},{new : true})
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name Photo")
    .then((result)=> res.json(result))
    .catch( (err)=> {res.status(422).json({ error: err })});
})


module.exports = Route;