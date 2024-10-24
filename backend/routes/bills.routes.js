const express = require('express')
const {auth} = require('../config/auth-middleware')
const { validate, ValidationError } = require('express-validation')
const { bill_validation } = require('../config/validations')
const { save_bill_controller, get_bills_of_customer_controller } = require('../controller/bills.controller')
const route = express.Router()

route.post("/save_bill",auth,validate(bill_validation,{},{}),save_bill_controller)
route.get('/get_bills_of_customer',auth,get_bills_of_customer_controller)
route.use((err,req,res,next)=>{
    if(err instanceof ValidationError){
        return res.status(err.statusCode).json(err.details.body[0].message)
    }
    return res.status(500).json({ message: err.message || 'Internal Server Error' });
})
module.exports = route