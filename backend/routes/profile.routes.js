const express = require('express');
const {validate,ValidationError} = require('express-validation')
const { create_user_controller, login_controller } = require('../controller/profile.controller');
const { profile_validation, login_validation } = require('../config/validations');
const route = express.Router();



route.post("/create_profile",validate(profile_validation,{},{}),create_user_controller)
route.post("/login",validate(login_validation,{},{}),login_controller)

route.use((err,req,res,next)=>{
    if(err instanceof ValidationError){
        return res.status(err.statusCode).json(err.details.body[0].message)
    }
    return res.status(500).json(err,message)
})

module.exports = route