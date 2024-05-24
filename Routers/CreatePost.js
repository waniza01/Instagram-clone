const express = require('express');
const mongo = require('mongoose');
const Route = express.Router();
const loginRequired = require("../loginRequired");
const POST = mongo.model("POST");
const USER = mongo.model('USER');


//getting all posts

Route.get('/allposts', loginRequired, (req, res) => {
    POST.find()
        .sort({_id:-1})
        .populate("postedBy", "_id name Photo")
        .populate("comments.postedBy", "_id name ")
        .then((post) => { res.json(post) })
        .catch((err) => { console.log(err) });
})

//handling CreatePost request
Route.post('/CreatePost', loginRequired, (req, res) => {
    const { pic, body } = req.body;

    if (!pic || !body) {
        return res.status(422).json({ "error": "information is missing" });
    }


    const post = new POST({
        body,
        photo: pic,
        postedBy: req.user
    });



    post.save()
        .then(result => {

            res.json({ post: result })
        })
        .catch(err => { console.log(err) });
})

// post by particular
Route.get('/myposts', loginRequired, (req, res) => {
    POST.find({ postedBy: req.user._id })
        .populate('postedBy', '_id name')
        .populate('comments.postedBy', '_id name')
        .then(posts => res.json(posts))
        .catch(err => { console.log(err) });
})

//update likes

Route.put("/like", loginRequired, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true
    }).populate("postedBy", "_id name Photo")
        .then(posts => res.json(posts))
        .catch(err => { console.log("ERROR: " + err) })
});

//update dislikes
Route.put('/unlike', loginRequired, (req, res) => {
    POST.findByIdAndUpdate(req.body.postID, { $pull: { likes: req.user._id } },
        { new: true }).populate("postedBy", "_id name Photo")
        .then(posts => res.json(posts))
        .catch(err => { console.log("ERROR: " + err) })

})

//comments

Route.put("/comment", loginRequired, (req, res) => {
    const comment = { comment: req.body.comment, postedBy: req.user._id }
    POST.findByIdAndUpdate(req.body.postID, {
        $push: { comments: comment }
    }, {
        new: true
    }).populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name Photo")
        .then(posts => res.json(posts))
        .catch(err => { console.log("ERROR: " + err) })
});

//delete post

Route.delete('/deletePost/:postId', loginRequired, (req, res) => {
    POST.findByIdAndDelete({ _id: req.params.postId })
        .then(() => res.status(200).json({ message: "sucessfully deleted" }))
        .catch((err) => { res.status(422).json({ error: err }); })


})

//Follow

Route.put('/follow', loginRequired, (req, res) => {
    USER.findByIdAndUpdate({ _id: req.body.id }, {
        $push: { followers: req.user._id }
    }, { new: true }).then(() => {
        USER.findByIdAndUpdate({ _id: req.user._id }, {
            $push: { following: req.body.id }
        }, { new: true }).then((result) => {
            res.json(result);
        }).catch((err) => { res.status(422).json({ error: err }); })
    }).catch((err) => { res.status(422).json({ error: err }); })
})

//unFollow

Route.put('/unfollow', loginRequired, (req, res) => {
    USER.findByIdAndUpdate({ _id: req.body.id }, {
        $pull: { followers: req.user._id }
    }, { new: true }).then(() => {
        USER.findByIdAndUpdate({ _id: req.user._id }, {
            $pull: { following: req.body.id }
        }, { new: true }).then((result) => {
            res.json(result);
        }).catch((err) => { res.status(422).json({ error: err }); })
    }).catch((err) => { res.status(422).json({ error: err }); })
})

//My Following Post
Route.get('/myfollowingpost',loginRequired,(req, res) => {
    POST.find({postedBy : {$in : req.user.following}})
    .populate("postedBy","_id name Photo")
    .populate("comments.postedBy","_id name ")
    .then((result)=> res.json(result))
    .catch((err) => { console.log(err)})
})




module.exports = Route;