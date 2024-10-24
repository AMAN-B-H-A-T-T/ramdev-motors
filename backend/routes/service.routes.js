const express = require('express')
const { auth } = require('../config/auth-middleware')
const { get_all_services_controller, add_services_controller, delete_service_controller } = require('../controller/services.controller')
const { service_validation } = require('../config/validations')
const { validate, ValidationError } = require('express-validation')
const route  = express.Router()

route.get("/get_all_services",auth,get_all_services_controller)
route.post("/add_service",auth,validate(service_validation,{},{}),add_services_controller)
route.delete("/delete_service",auth,delete_service_controller)

route.use((err,req,res,next)=>{
    if(err instanceof ValidationError){
        return res.status(err.statusCode).json(err.details.body[0].message)
    }
    return res.status(500).json({ message: err.message || 'Internal Server Error' });
})

module.exports = route

