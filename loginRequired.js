const mongo = require('mongoose');

const jwt = require("jsonwebtoken");
const {jwt_secret} = require("./keys");
const USER = mongo.model("USER");


module.exports = (req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error : "Please Login"}) //401 error means Unauthorize person
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token,jwt_secret,(err,payload)=>{
        if(err){
            return res.status(401).json({error : "Please Login"});
        }
        const {_id} = payload;
        USER.findById(_id).then((data)=>{
            req.user = data;
            next();
        })
    })
}