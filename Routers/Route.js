const express = require('express');
const mongo = require('mongoose');
const bcrypt = require('bcrypt'); // used to encypt password using hash function

const Route = express.Router();

const jwt = require("jsonwebtoken"); // jwt give user unique to for more security

const {jwt_secret} = require("../keys"); // use this combination with mongoDB id to make unique id for authorize user

const loginRequired = require("../loginRequired");

const USER = mongo.model('USER');

Route.get('/', (req, res) => {
    res.send("hello")
})


// handling SignUp request

Route.post('/SignUp', (req, res) => {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
        return res.status(422).json({ "error": "some information is missing" });// 422 means server understands your 
        //data but cant proceeds bcz there is more info required
    }


    USER.findOne({ email:email }).then(savedUser => { //check user exists or not
        if (savedUser) {
            return res.status(422).json({ "error": "user already exists" });
        }
        bcrypt.hash(password, 12).then((hashedPassword) => {

            const user = new USER({
                name,
                username,
                email,
                password: hashedPassword
            });


            user.save()
                .then(user => { res.json({ message: "Registered successfully" }) })
                .catch(err => { console.log(err) });
        })

    })

})

// handling SignIn request

Route.post('/SignIn',(req,res)=>{
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ "error": "information is missing" });
    }

    USER.findOne({email : email}).then((savedUser)=>{
        if(savedUser){
            bcrypt.compare(password, savedUser.password).then((match)=>{
                if(match){
                    
                    const token = jwt.sign({_id:savedUser.id},jwt_secret);
                    const { _id, name, email, username ,Photo } = savedUser
                   
                
                    return res.json({ "message": "Sign In Successfully" ,token: token , user: { _id, name, email, username ,Photo} })
                }else{
                    return res.status(422).json({ "error": "Invalid Password" });
                }
            }).catch((err)=>{console.log(err)});
        }else{
            return res.status(422).json({ "error": "email doesn't exists" }); 
        }
    })
})



module.exports = Route;