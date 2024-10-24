const express = require('express')
const { auth } = require('../config/auth-middleware')
const { validate , ValidationError } = require('express-validation')
const { vehicle_validation } = require('../config/validations')
const { add_vehicle_controller, get_vehicle_customer_controller, get_vehicle_by_no_controller, add_customer_vehicle_controller } = require('../controller/vehicle.controller')
const route = express.Router()

route.post('/add_vehicle',auth,validate(vehicle_validation,{},{}),add_vehicle_controller)
route.get("/get_vehicles_by_customer",auth,get_vehicle_customer_controller)
route.get("/get_vehicl_by_no",auth,get_vehicle_by_no_controller)
route.post("/add_customer_vehicle",auth,add_customer_vehicle_controller)

route.use((err,req,res,next)=>{
    if(err instanceof ValidationError){
        return res.status(err.statusCode).json(err.details.body[0].message)
    }
    return res.status(500).json({ message: err.message || 'Internal Server Error' });
})

module.exports = route